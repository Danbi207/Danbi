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

    GuestBook guestBook;
    Comment comment1;
    Comment comment2;
    Comment comment3;

    @BeforeEach
    void setup() {
        guestBook = GuestBook.builder()
                .build();
        GuestBook savedGuestBook = guestBookRepository.save(guestBook);

        comment1 = Comment.builder()
                .guestBook(savedGuestBook)
                .content("댓글1")
                .build();

        comment2 = Comment.builder()
                .guestBook(savedGuestBook)
                .content("댓글2")
                .build();

        comment3 = Comment.builder()
                .guestBook(savedGuestBook)
                .content("댓글3")
                .build();

        commentRepository.save(comment1);
        commentRepository.save(comment2);
        commentRepository.save(comment3);
    }


    @DisplayName("방명록에 있는 모든 댓글 조회")
    @Test
    void findByGuestBook() {
        // given


        Pageable pageable = PageRequest.of(0, 10, Sort.Direction.DESC, "createTime");

        // when
        List<Comment> comments = commentService.findByGuestBook(guestBook, pageable);

        // then
        assertThat(comments).hasSize(3)
                .extracting("id", "content")
                .containsExactlyInAnyOrder(
                        tuple(comment1.getId(), "댓글1"),
                        tuple(comment2.getId(), "댓글2"),
                        tuple(comment3.getId(), "댓글3")
                );
    }

    @DisplayName("댓글 id로 댓글 조회")
    @Test
    void findById() {
        // given

        // when
        Comment result = commentService.findById(comment1.getId());

        // then
        assertThat(result.getId()).isEqualTo(comment1.getId());
        assertThat(result.getContent()).isEqualTo(comment1.getContent());
    }

    @Test
    void saveComment() {
        // given

        // when
        Comment savedComment = commentService.saveComment(comment1);
        // then
        assertThat(savedComment.getId()).isEqualTo(comment1.getId());
        assertThat(savedComment.getContent()).isEqualTo(comment1.getContent());
    }

    @Test
    void modifyContent() {
        // given
        String modifiedContent = "new content";
        // when
        Comment modifiedComment = commentService.modifyContent(comment1, modifiedContent);
        // then
        assertThat(modifiedComment.getId()).isEqualTo(comment1.getId());
        assertThat(modifiedComment.getContent()).isEqualTo(modifiedContent);
    }

    @Test
    void deleteComment() {
        // given
        // when
        commentService.deleteComment(comment1);
        // then
        List<Comment> comments = commentRepository.findAll();
        assertThat(comments).hasSize(2)
                .extracting("id", "content")
                .containsExactlyInAnyOrder(
                        tuple(comment2.getId(), "댓글2"),
                        tuple(comment3.getId(), "댓글3")
                );
    }
}