package com.terramatch.repository;

import com.terramatch.entity.Conversation;
import com.terramatch.entity.Message;
import com.terramatch.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface MessageRepository extends JpaRepository<Message, String> {
    List<Message> findByConversationOrderByCreatedAtAsc(Conversation conversation);

    // Unread count for one conversation, from one viewer's perspective:
    // messages in this thread NOT sent by the viewer and not yet read.
    // Used both per-conversation (conversation list badges) and summed
    // across all of a user's conversations (the global nav badge).
    long countByConversationAndSenderNotAndReadAtIsNull(Conversation conversation, User viewer);
}
