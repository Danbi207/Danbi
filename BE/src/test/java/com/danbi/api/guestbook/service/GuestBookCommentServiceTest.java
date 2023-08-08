package com.danbi.api.guestbook.service;

import com.danbi.api.guestbook.dto.CommentDto;
import com.danbi.api.guestbook.dto.CommentModifyDto;
import com.danbi.domain.comment.entity.Comment;
import com.danbi.domain.comment.repository.CommentRepository;
import com.danbi.domain.guestbook.entity.GuestBook;
import com.danbi.domain.guestbook.repository.GuestBookRepository;
import com.danbi.domain.member.constant.Gender;
import com.danbi.domain.member.constant.OauthType;
import com.danbi.domain.member.constant.Role;
import com.danbi.domain.member.entity.Member;
import com.danbi.domain.member.repository.MemberRepository;
import com.danbi.global.error.exception.mismatch.CommentMisMatchMemberException;
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

    Member member1;
    Member member2;
    GuestBook guestBook;
    Comment comment1;
    
    List<Comment> beforeComments;

    @BeforeEach
    void setup() {
        member1 = Member.builder()
                .name("member1")
                .nickname("nickname1")
                .email("asdf@adsf.com")
                .role(Role.ROLE_UNDEFINED)
                .gender(Gender.male)
                .oauthType(OauthType.KAKAO)
                .profileUrl("adsf")
                .build();

        member2 = Member.builder()
                .name("member2")
                .nickname("nickname2")
                .email("asdf2@adsf.com")
                .role(Role.ROLE_UNDEFINED)
                .gender(Gender.male)
                .oauthType(OauthType.KAKAO)
                .profileUrl("adsf2")
                .build();

        Member savedMember1 = memberRepository.save(member1);
        Member savedMember2 = memberRepository.save(member2);

        guestBook = GuestBook.builder()
                .member(member1)
                .build();

        GuestBook savedGuestBook = guestBookRepository.save(guestBook);

        comment1 = Comment.builder()
                .member(member1)
                .content("comment1")
                .build();
        Comment comment2 = Comment.builder()
                .member(member1)
                .content("comment2")
                .build();
        Comment comment3 = Comment.builder()
                .member(member1)
                .content("comment3")
                .build();

        beforeComments = commentRepository.saveAll(List.of(comment1, comment2, comment3));

    }

    @DisplayName("댓글 저장")
    @Test
    void saveComment() {
        // given
        Long memberId = member1.getId();

        String modifiedContent = "new content";
        CommentDto.Request reqeust = new CommentDto.Request();
        reqeust.setContent(modifiedContent);

        // when
        CommentDto.Response response = guestBookCommentService.saveComment(guestBook.getId(), reqeust, member1.getId());

        List<Comment> comments = commentRepository.findAll();
        // then
        assertThat(comments.size()).isEqualTo(beforeComments.size() + 1);
        
        assertThat(response.getContent()).isEqualTo(modifiedContent);
        assertThat(response.getName()).isEqualTo(member1.getName());
    }

    @DisplayName("댓글 수정")
    @Test
    void modifyComment() {
        // given
        CommentModifyDto.Request request = CommentModifyDto.Request.builder()
                .content("new content")
                .build();

        // when
        CommentModifyDto.Response response = guestBookCommentService.modifyComment(member1.getId(), comment1.getId(), request);
        // then
        assertThat(response.getId()).isEqualTo(comment1.getId());
        assertThat(response.getContent()).isEqualTo(request.getContent());
        assertThat(response.getName()).isEqualTo(member1.getName());
    }

    @DisplayName("댓글 수정은 댓글을 작성한 사람이 수정가능하다.")
    @Test
    void modifyMyComment() {
        // given
        CommentModifyDto.Request request = CommentModifyDto.Request.builder()
                .content("new content")
                .build();

        // when
        // then
        assertThatThrownBy(() -> guestBookCommentService.modifyComment(member2.getId(), comment1.getId(), request))
                .isInstanceOf(CommentMisMatchMemberException.class);
    }

    @DisplayName("댓글 삭제")
    @Test
    void deleteComment() {
    }
}