package com.danbi.domain.comment.repository;

import com.danbi.domain.comment.entity.Comment;
import com.danbi.domain.guestbook.entity.GuestBook;
import com.danbi.domain.guestbook.repository.GuestBookRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static org.assertj.core.api.Assertions.*;

@SpringBootTest
@Transactional
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

        GuestBook savedGuestBook = guestBookRepository.save(guestBook);

        Comment comment1 = Comment.builder()
                .content("댓글1")
                .guestBook(savedGuestBook)
                .build();

        Comment comment2 = Comment.builder()
                .content("댓글2")
                .guestBook(savedGuestBook)
                .build();

        Comment comment3 = Comment.builder()
                .content("댓글3")
                .guestBook(savedGuestBook)
                .build();


        Comment savedComment1 = commentRepository.save(comment1);
        Comment savedComment2 = commentRepository.save(comment2);
        Comment savedComment3 = commentRepository.save(comment3);

        // when
        List<Comment> comments = commentRepository.findCommentsByGuestBook(savedGuestBook);

        // then
        assertThat(comments).hasSize(3)
                .extracting("id", "content")
                .containsExactlyInAnyOrder(
                        tuple(savedComment1.getId(), "댓글1"),
                        tuple(savedComment2.getId(), "댓글2"),
                        tuple(savedComment3.getId(), "댓글3")
                );

    }


}