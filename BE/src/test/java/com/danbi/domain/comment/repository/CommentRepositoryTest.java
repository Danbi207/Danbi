package com.danbi.domain.comment.repository;

import com.danbi.domain.comment.entity.Comment;
import com.danbi.domain.guestbook.entity.GuestBook;
import com.danbi.domain.guestbook.repository.GuestBookRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.assertj.core.api.Assertions.*;

@SpringBootTest
class CommentRepositoryTest {

    @Autowired
    private CommentRepository commentRepository;
    @Autowired
    private GuestBookRepository guestBookRepository;

    @DisplayName("방명록에 있는 모든 댓글 조회")
    @Test
    void findCommentsByGuestBook() {

        // given
        GuestBook guestBook = GuestBook.builder()
                .id(1L)
                .build();

        Comment comment1 = Comment.builder()
                .id(1L)
                .content("댓글1")
                .guestBook(guestBook)
                .build();

        Comment comment2 = Comment.builder()
                .id(2L)
                .content("댓글2")
                .guestBook(guestBook)
                .build();

        Comment comment3 = Comment.builder()
                .id(3L)
                .content("댓글3")
                .guestBook(guestBook)
                .build();

        GuestBook savedGuestBook = guestBookRepository.save(guestBook);
        List<Comment> savedComments = commentRepository.saveAll(List.of(comment1, comment2, comment3));

        // when
        List<Comment> comments = commentRepository.findCommentsByGuestBook(savedGuestBook);

        // then
        assertThat(comments).hasSize(3)
                .extracting("id", "content")
                .containsExactlyInAnyOrder(
                        tuple(1L, "댓글1"),
                        tuple(2L, "댓글2"),
                        tuple(3L, "댓글3")
                );

    }


}