package com.terramatch.dto;

import jakarta.validation.constraints.NotBlank;
import java.time.LocalDateTime;

public class MessagingDTOs {

    /**
     * Body for POST /api/conversations — this is what "Buy Now" calls.
     * `landId` identifies the listing (and therefore its owner, derived
     * server-side — never trust a frontend-supplied owner ID per the
     * master integration brief). `initialMessage` is the buyer's
     * pre-filled draft message from the frontend's Buy Now modal, sent
     * as the conversation's first message in the same request so the
     * owner has real content to respond to, not an empty thread.
     */
    public record StartConversationRequest(
            @NotBlank String landId,
            @NotBlank String initialMessage
    ) {}

    public record SendMessageRequest(@NotBlank String body) {}

    public record MessageResponse(
            String id,
            String senderId,
            String senderName,
            String body,
            LocalDateTime createdAt,
            boolean readByMe
    ) {}

    /**
     * Summary shape for the conversation list screen — the frontend's
     * Messages page shows a list of threads before you open one, and
     * needs "who's on the other end of this thread" + a preview,
     * without pulling every message in every conversation just to
     * render the list.
     */
    public record ConversationSummaryResponse(
            String id,
            String landId,
            String landTitle,
            String otherPartyId,
            String otherPartyName,
            String lastMessagePreview,
            LocalDateTime lastMessageAt,
            long unreadCount
    ) {}

    public record ConversationDetailResponse(
            String id,
            String landId,
            String landTitle,
            String buyerId,
            String buyerName,
            String ownerId,
            String ownerName,
            java.util.List<MessageResponse> messages
    ) {}
}
