package com.terramatch.service;

import com.terramatch.dto.MessagingDTOs.*;
import com.terramatch.entity.Conversation;
import com.terramatch.entity.LandListing;
import com.terramatch.entity.Message;
import com.terramatch.entity.User;
import com.terramatch.repository.ConversationRepository;
import com.terramatch.repository.LandListingRepository;
import com.terramatch.repository.MessageRepository;
import com.terramatch.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

/**
 * New service — no messaging backend existed before this pass (see
 * README "Backend changes" and the frontend's Buy Now requirement in
 * the integration brief). Covers:
 *   - starting/reopening a deduplicated conversation from "Buy Now"
 *   - sending messages within a conversation
 *   - listing a user's conversations with unread counts
 *   - reading one conversation's full history (and marking it read)
 *
 * Authorization model throughout: a conversation has exactly two
 * participants (buyer, owner). Every read/write here checks the
 * caller is one of those two — see requireParticipant() — so a user
 * can never see or post into someone else's conversation by guessing
 * or enumerating IDs, regardless of what the frontend sends.
 */
@Service
@RequiredArgsConstructor
public class MessagingService {
    private final ConversationRepository conversationRepo;
    private final MessageRepository messageRepo;
    private final LandListingRepository landRepo;
    private final UserRepository userRepo;

    @Transactional
    public ConversationDetailResponse startOrGetConversation(String buyerEmail, StartConversationRequest request) {
        User buyer = requireUser(buyerEmail);
        LandListing land = landRepo.findById(request.landId())
                .orElseThrow(() -> new RuntimeException("Land listing not found"));
        User owner = land.getOwner();

        if (owner == null) {
            throw new RuntimeException("This listing has no owner on record");
        }
        if (owner.getId().equals(buyer.getId())) {
            throw new RuntimeException("You cannot start a conversation about your own listing");
        }

        // Dedup: reopen the existing thread for this (land, buyer) pair
        // instead of creating a second one — matches the frontend's
        // "auto-creates deduplicated threads" requirement for Buy Now.
        Conversation conversation = conversationRepo.findByLandAndBuyer(land, buyer)
                .orElseGet(() -> conversationRepo.save(
                        Conversation.builder().land(land).buyer(buyer).owner(owner).build()
                ));

        appendMessage(conversation, buyer, request.initialMessage());
        return toDetail(conversation, buyer);
    }

    @Transactional
    public MessageResponse sendMessage(String senderEmail, String conversationId, SendMessageRequest request) {
        User sender = requireUser(senderEmail);
        Conversation conversation = requireConversation(conversationId);
        requireParticipant(conversation, sender);

        Message message = appendMessage(conversation, sender, request.body());
        return toMessageResponse(message, sender);
    }

    public List<ConversationSummaryResponse> listMyConversations(String email) {
        User user = requireUser(email);
        return conversationRepo.findAllForUser(user).stream()
                .map(c -> toSummary(c, user))
                .collect(Collectors.toList());
    }

    @Transactional
    public ConversationDetailResponse getConversation(String email, String conversationId) {
        User user = requireUser(email);
        Conversation conversation = requireConversation(conversationId);
        requireParticipant(conversation, user);

        // Opening a thread marks the other party's messages as read —
        // this is what clears the unread badge, mirroring how the
        // frontend's MessagesContext already expects "viewing a
        // conversation" to zero out its unread count.
        List<Message> messages = messageRepo.findByConversationOrderByCreatedAtAsc(conversation);
        LocalDateTime now = LocalDateTime.now();
        messages.stream()
                .filter(m -> m.getReadAt() == null && !m.getSender().getId().equals(user.getId()))
                .forEach(m -> {
                    m.setReadAt(now);
                    messageRepo.save(m);
                });

        return toDetail(conversation, user);
    }

    public long getUnreadCount(String email) {
        User user = requireUser(email);
        return conversationRepo.findAllForUser(user).stream()
                .mapToLong(c -> messageRepo.countByConversationAndSenderNotAndReadAtIsNull(c, user))
                .sum();
    }

    // ---- internal helpers ----

    private Message appendMessage(Conversation conversation, User sender, String body) {
        Message message = messageRepo.save(
                Message.builder().conversation(conversation).sender(sender).body(body).build()
        );
        conversation.setLastMessageAt(message.getCreatedAt());
        conversationRepo.save(conversation);
        return message;
    }

    private User requireUser(String email) {
        return userRepo.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
    }

    private Conversation requireConversation(String id) {
        return conversationRepo.findById(id).orElseThrow(() -> new RuntimeException("Conversation not found"));
    }

    /**
     * The entire authorization boundary for messaging. Thrown as the
     * same RuntimeException -> 400 shape as every other error in this
     * codebase (see GlobalExceptionHandler) rather than a distinct 403,
     * to match the existing error-handling convention here — the
     * frontend already treats every 400 body's `message` field as the
     * user-facing error text, so this fits without adding a new status
     * code to handle.
     */
    private void requireParticipant(Conversation conversation, User user) {
        boolean isParticipant = conversation.getBuyer().getId().equals(user.getId())
                || conversation.getOwner().getId().equals(user.getId());
        if (!isParticipant) {
            throw new RuntimeException("You do not have access to this conversation");
        }
    }

    private ConversationSummaryResponse toSummary(Conversation c, User viewer) {
        boolean viewerIsBuyer = c.getBuyer().getId().equals(viewer.getId());
        User otherParty = viewerIsBuyer ? c.getOwner() : c.getBuyer();
        long unread = messageRepo.countByConversationAndSenderNotAndReadAtIsNull(c, viewer);

        List<Message> messages = messageRepo.findByConversationOrderByCreatedAtAsc(c);
        String preview = messages.isEmpty() ? "" : messages.get(messages.size() - 1).getBody();

        return new ConversationSummaryResponse(
                c.getId(),
                c.getLand().getId(),
                c.getLand().getTitle(),
                otherParty.getId(),
                otherParty.getName(),
                preview,
                c.getLastMessageAt(),
                unread
        );
    }

    private ConversationDetailResponse toDetail(Conversation c, User viewer) {
        List<MessageResponse> messages = messageRepo.findByConversationOrderByCreatedAtAsc(c).stream()
                .map(m -> toMessageResponse(m, viewer))
                .collect(Collectors.toList());

        return new ConversationDetailResponse(
                c.getId(),
                c.getLand().getId(),
                c.getLand().getTitle(),
                c.getBuyer().getId(),
                c.getBuyer().getName(),
                c.getOwner().getId(),
                c.getOwner().getName(),
                messages
        );
    }

    private MessageResponse toMessageResponse(Message m, User viewer) {
        boolean readByMe = m.getSender().getId().equals(viewer.getId()) || m.getReadAt() != null;
        return new MessageResponse(
                m.getId(),
                m.getSender().getId(),
                m.getSender().getName(),
                m.getBody(),
                m.getCreatedAt(),
                readByMe
        );
    }
}
