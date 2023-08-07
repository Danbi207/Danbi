package com.danbi.api.guestbook.service;

import com.danbi.api.guestbook.dto.CommentDto;
import com.danbi.domain.comment.entity.Comment;
import com.danbi.domain.comment.repository.CommentRepository;
import com.danbi.domain.guestbook.entity.GuestBook;
import com.danbi.domain.guestbook.repository.GuestBookRepository;
import com.danbi.domain.member.constant.Gender;
import com.danbi.domain.member.constant.OauthType;
import com.danbi.domain.member.constant.Role;
import com.danbi.domain.member.entity.Member;
import com.danbi.domain.member.repository.MemberRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import javax.transaction.Transactional;

import java.util.List;

import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
class GuestBookCommentServiceTest {

    @Autowired
    private MemberRepository memberRepository;
    @Autowired
    private GuestBookRepository guestBookRepository;
    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private GuestBookCommentService guestBookCommentService;

    Member member;
    GuestBook guestBook;
    
    List<Comment> beforeComments;

    @BeforeEach
    void setup() {
        member = Member.builder()
                .name("member1")
                .nickname("nickname1")
                .email("asdf@adsf.com")
                .role(Role.ROLE_UNDEFINED)
                .gender(Gender.male)
                .oauthType(OauthType.KAKAO)
                .profileUrl("adsf")
                .build();

        Member savedMember = memberRepository.save(member);

        guestBook = GuestBook.builder()
                .member(member)
                .build();

        GuestBook savedGuestBook = guestBookRepository.save(guestBook);

        Comment comment1 = Comment.builder()
                .content("comment1")
                .build();
        Comment comment2 = Comment.builder()
                .content("comment2")
                .build();
        Comment comment3 = Comment.builder()
                .content("comment3")
                .build();

        beforeComments = commentRepository.saveAll(List.of(comment1, comment2, comment3));

    }

    @DisplayName("댓글 저장")
    @Test
    void saveComment() {
        // given
        Long memberId = member.getId();

        String modifiedContent = "new content";
        CommentDto.Reqeust reqeust = new CommentDto.Reqeust();
        reqeust.setContent(modifiedContent);

        // when
        CommentDto.Response response = guestBookCommentService.saveComment(guestBook.getId(), reqeust, member.getId());

        List<Comment> comments = commentRepository.findAll();
        // then
        assertThat(comments.size()).isEqualTo(beforeComments.size() + 1);
        
        assertThat(response.getContent()).isEqualTo(modifiedContent);
        assertThat(response.getName()).isEqualTo(member.getName());
    }

    @Test
    void modifyComment() {
    }

    @Test
    void deleteComment() {
    }
}