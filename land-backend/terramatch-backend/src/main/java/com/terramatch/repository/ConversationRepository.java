package com.terramatch.repository;

import com.terramatch.entity.Conversation;
import com.terramatch.entity.LandListing;
import com.terramatch.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;
import java.util.Optional;

public interface ConversationRepository extends JpaRepository<Conversation, String> {
    Optional<Conversation> findByLandAndBuyer(LandListing land, User buyer);

    // "Conversations I'm part of, either side" — a signed-in user views
    // their inbox regardless of whether they're the buyer or the owner
    // on any given thread, most-recently-active first.
    @Query("SELECT c FROM Conversation c WHERE c.buyer = :user OR c.owner = :user ORDER BY c.lastMessageAt DESC NULLS LAST")
    List<Conversation> findAllForUser(@Param("user") User user);
}
