package com.danbi.domain.comment.repository;

import com.danbi.domain.comment.entity.Comment;
import com.danbi.domain.guestbook.entity.GuestBook;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CommentRepository extends JpaRepository<Comment, Long> {

    List<Comment> findCommentsByGuestBook(GuestBook guestBook);
}
