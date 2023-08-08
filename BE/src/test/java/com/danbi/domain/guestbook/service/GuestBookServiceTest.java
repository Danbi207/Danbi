package com.danbi.domain.guestbook.service;

import com.danbi.domain.guestbook.entity.GuestBook;
import com.danbi.domain.guestbook.repository.GuestBookRepository;
import com.danbi.domain.member.constant.Gender;
import com.danbi.domain.member.constant.OauthType;
import com.danbi.domain.member.constant.Role;
import com.danbi.domain.member.entity.Member;
import com.danbi.domain.member.repository.MemberRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import javax.transaction.Transactional;

import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
class GuestBookServiceTest {

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private GuestBookRepository guestBookRepository;

    @Autowired
    private GuestBookService guestBookService;

    Member member;
    GuestBook guestBook;

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

        memberRepository.save(member);

        guestBook = GuestBook.builder()
                .member(member)
                .build();
    }

    @Test
    void findById() {
        // given
        GuestBook savedGuestBook = guestBookRepository.save(guestBook);
        // when
        GuestBook resultGuestBook = guestBookService.findById(savedGuestBook.getId());
        // then
        assertThat(resultGuestBook.getId()).isEqualTo(savedGuestBook.getId());
        assertThat(resultGuestBook.getMember()).isEqualTo(member);
    }

    @Test
    void findByMember() {
        // given
        GuestBook savedGuestBook = guestBookRepository.save(guestBook);
        // when
        GuestBook resultGuestBook = guestBookService.findByMember(member);
        // then
        assertThat(resultGuestBook.getId()).isEqualTo(savedGuestBook.getId());
        assertThat(resultGuestBook.getMember()).isEqualTo(member);
    }
}