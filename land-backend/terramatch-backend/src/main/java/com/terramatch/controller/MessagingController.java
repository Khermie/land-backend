package com.terramatch.controller;

import com.terramatch.dto.MessagingDTOs.*;
import com.terramatch.service.MessagingService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

/**
 * New controller — the frontend's Buy Now flow (land marketplace ->
 * message the owner) had nothing to connect to before this pass. Every
 * endpoint here requires a JWT (none are in SecurityConfig's permitAll
 * list); `auth.getName()` always resolves to the caller's own email, so
 * "which conversations can I see / post into" is enforced entirely by
 * MessagingService#requireParticipant, never by a client-supplied user
 * ID.
 */
@RestController
@RequestMapping("/api/conversations")
@RequiredArgsConstructor
public class MessagingController {
    private final MessagingService messagingService;

    /**
     * Buy Now lands here. Starts a new conversation about a listing (or
     * reopens the existing one for this buyer+land pair) and posts the
     * buyer's pre-filled message as the first message in one request.
     */
    @PostMapping
    public ResponseEntity<ConversationDetailResponse> startConversation(
            @Valid @RequestBody StartConversationRequest request, Authentication auth
    ) {
        return ResponseEntity.ok(messagingService.startOrGetConversation(auth.getName(), request));
    }

    @GetMapping
    public ResponseEntity<List<ConversationSummaryResponse>> listConversations(Authentication auth) {
        return ResponseEntity.ok(messagingService.listMyConversations(auth.getName()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ConversationDetailResponse> getConversation(
            @PathVariable String id, Authentication auth
    ) {
        return ResponseEntity.ok(messagingService.getConversation(auth.getName(), id));
    }

    @PostMapping("/{id}/messages")
    public ResponseEntity<MessageResponse> sendMessage(
            @PathVariable String id, @Valid @RequestBody SendMessageRequest request, Authentication auth
    ) {
        return ResponseEntity.ok(messagingService.sendMessage(auth.getName(), id, request));
    }

    /**
     * Backs the notification badge (MobileTabBar/Dashboard on the
     * frontend already render an unread count — this is what feeds it
     * with a real number instead of the frontend's previous hardcoded
     * "3").
     */
    @GetMapping("/unread-count")
    public ResponseEntity<Map<String, Long>> getUnreadCount(Authentication auth) {
        return ResponseEntity.ok(Map.of("unreadCount", messagingService.getUnreadCount(auth.getName())));
    }
}
