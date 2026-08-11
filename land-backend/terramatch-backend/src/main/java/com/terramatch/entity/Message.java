package com.terramatch.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

/**
 * One message within a Conversation. `readAt` is nullable/null until
 * the recipient views it — used to compute unread counts for the
 * notification badge the frontend's MobileTabBar/Dashboard already
 * expect (see MessagingService#getUnreadCount), without needing a
 * separate read-receipts table.
 */
@Entity
@Table(name = "messages")
@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class Message {
    @Id @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @ManyToOne
    @JoinColumn(name = "conversation_id", nullable = false)
    private Conversation conversation;

    @ManyToOne
    @JoinColumn(name = "sender_id", nullable = false)
    private User sender;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String body;

    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();

    private LocalDateTime readAt;
}
