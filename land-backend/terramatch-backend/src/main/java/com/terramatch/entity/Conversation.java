package com.terramatch.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

/**
 * New entity — no messaging backend existed at all before this pass
 * (see README "Backend changes"). Models exactly what the frontend's
 * Buy Now flow needs: a thread between a buyer and a land owner, always
 * anchored to one specific land listing.
 *
 * The (land, buyer) pair is unique — see
 * ConversationRepository#findByLandAndBuyer and
 * MessagingService#startOrGetConversation — so clicking "Buy Now" on
 * the same listing twice reopens the existing thread instead of
 * creating a duplicate, matching the frontend's "auto-creates
 * deduplicated threads" requirement.
 *
 * `owner` is denormalized onto the conversation (rather than always
 * read via land.getOwner()) so a conversation's owner is stable even
 * if a listing's ownership were ever reassigned in the future — and so
 * every authorization check here compares against conversation.owner
 * directly instead of an extra join.
 */
@Entity
@Table(
    name = "conversations",
    uniqueConstraints = @UniqueConstraint(columnNames = {"land_id", "buyer_id"})
)
@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class Conversation {
    @Id @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @ManyToOne
    @JoinColumn(name = "land_id", nullable = false)
    private LandListing land;

    @ManyToOne
    @JoinColumn(name = "buyer_id", nullable = false)
    private User buyer;

    @ManyToOne
    @JoinColumn(name = "owner_id", nullable = false)
    private User owner;

    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();

    // Bumped every time a Message is added — lets the conversation list
    // endpoint sort "most recently active first" with a single indexed
    // column instead of a join + aggregate over messages on every list
    // request.
    private LocalDateTime lastMessageAt;
}
