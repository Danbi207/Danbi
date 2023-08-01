package com.danbi.domain.comment.service;

import com.danbi.DanbiApplication;
import com.danbi.domain.comment.entity.Comment;
import com.danbi.domain.comment.repository.CommentRepository;
import com.danbi.domain.guestbook.entity.GuestBook;
import com.danbi.domain.guestbook.repository.GuestBookRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import java.util.List;

import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class CommentServiceTest {


//
//    @Autowired
//    private CommentService commentService;
//    @Autowired
//    private CommentRepository commentRepository;
//
//    @Autowired
//    private GuestBookRepository guestBookRepository;
//
//
//    @DisplayName("방명록에 있는 모든 댓글 조회")
//    @Test
//    void findByGuestBook() {
//        // given
//        GuestBook guestBook = GuestBook.builder()
//                .id(1L)
//                .build();
//
//        Comment comment = Comment.builder()
//                .id(1L)
//                .guestBook(guestBook)
//                .content("댓글1")
//                .build();
//
//        guestBookRepository.save(guestBook);
//        commentRepository.save(comment);
//
//        // when
//        List<Comment> comments = commentService.findByGuestBook(guestBook);
//
//        // then
//        assertThat(comments).hasSize(1);
//    }
//
//    @DisplayName("댓글 id로 댓글 조회")
//    @Test
//    void findById() {
//        // given
//        GuestBook guestBook = GuestBook.builder()
//                .id(1L)
//                .build();
//
//        Comment comment = Comment.builder()
//                .id(1L)
//                .guestBook(guestBook)
//                .content("댓글1")
//                .build();
//
//        guestBookRepository.save(guestBook);
//        Comment savedComment = commentRepository.save(comment);
//
//        // when
//        Comment result = commentService.findById(savedComment.getId());
//
//        // then
//        assertThat(result.getId()).isEqualTo(savedComment.getId());
//    }
//
//    @Test
//    void saveComment() {
//    }
//
//    @Test
//    void modifyContent() {
//    }
//
//    @Test
//    void deleteComment() {
//    }
}