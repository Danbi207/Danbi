package com.danbi.domain.comment.service;

import com.danbi.DanbiApplication;
import com.danbi.domain.comment.entity.Comment;
import com.danbi.domain.comment.repository.CommentRepository;
import com.danbi.domain.guestbook.entity.GuestBook;
import com.danbi.domain.guestbook.repository.GuestBookRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.test.context.ActiveProfiles;

import javax.transaction.Transactional;
import java.util.List;

import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
class CommentServiceTest {

    @Autowired
    private CommentService commentService;
    @Autowired
    private CommentRepository commentRepository;
    @Autowired
    private GuestBookRepository guestBookRepository;


    @DisplayName("방명록에 있는 모든 댓글 조회")
    @Test
    void findByGuestBook() {
        // given
        GuestBook guestBook = GuestBook.builder()
                .build();
        GuestBook savedGuestBook = guestBookRepository.save(guestBook);

        Comment comment1 = Comment.builder()
                .guestBook(savedGuestBook)
                .content("댓글1")
                .build();

        Comment comment2 = Comment.builder()
                .guestBook(savedGuestBook)
                .content("댓글2")
                .build();

        Comment comment3 = Comment.builder()
                .guestBook(savedGuestBook)
                .content("댓글3")
                .build();

//        commentRepository.saveAll(List.of(comment1, comment2, comment3));
        Comment savedComment1 = commentRepository.save(comment1);
        Comment savedComment2 = commentRepository.save(comment2);
        Comment savedComment3 = commentRepository.save(comment3);

        Pageable pageable = PageRequest.of(0, 10, Sort.Direction.DESC, "createTime");

        // when
        List<Comment> comments = commentService.findByGuestBook(savedGuestBook, pageable);

        // then
        assertThat(comments).hasSize(3)
                .extracting("id", "content")
                .containsExactlyInAnyOrder(
                        tuple(savedComment1.getId(), "댓글1"),
                        tuple(savedComment2.getId(), "댓글2"),
                        tuple(savedComment3.getId(), "댓글3")
                );
    }

    @DisplayName("댓글 id로 댓글 조회")
    @Test
    void findById() {
        // given
        Comment comment = Comment.builder()
                .content("댓글1")
                .build();

        Comment savedComment = commentRepository.save(comment);

        // when
        Comment result = commentService.findById(savedComment.getId());

        // then
        assertThat(result.getId()).isEqualTo(savedComment.getId());
        assertThat(result.getContent()).isEqualTo(savedComment.getContent());
    }

    @Test
    void saveComment() {
    }

    @Test
    void modifyContent() {
    }

    @Test
    void deleteComment() {
    }
}