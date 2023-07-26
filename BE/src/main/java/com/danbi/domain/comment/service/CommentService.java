package com.danbi.domain.comment.service;

import com.danbi.domain.comment.entity.Comment;
import com.danbi.domain.comment.repository.CommentRepository;
import com.danbi.domain.guestbook.entity.GuestBook;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class CommentService {

    private final CommentRepository commentRepository;

    public List<Comment> getCommentsByGuestBook(GuestBook guestBook) {
        return commentRepository.findCommentsByGuestBook(guestBook);
    }

    @Transactional
    public Comment saveComment(Comment comment) {
        return commentRepository.save(comment);
    }

}
