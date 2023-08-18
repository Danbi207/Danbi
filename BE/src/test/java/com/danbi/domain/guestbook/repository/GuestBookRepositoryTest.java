package com.danbi.domain.guestbook.repository;

import com.danbi.domain.guestbook.entity.GuestBook;
import com.danbi.domain.member.constant.Gender;
import com.danbi.domain.member.constant.OauthType;
import com.danbi.domain.member.constant.Role;
import com.danbi.domain.member.entity.Member;
import com.danbi.domain.member.repository.MemberRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
class GuestBookRepositoryTest {

    @Autowired
    MemberRepository memberRepository;

    @Autowired
    GuestBookRepository guestBookRepository;

    @DisplayName("Member의 방명록 조회")
    @Test
    void getGuestBookByMember() {
        // given
        Member member = Member.builder()
                .name("member1")
                .nickname("nickname1")
                .email("asdf@adsf.com")
                .role(Role.ROLE_UNDEFINED)
                .gender(Gender.male)
                .oauthType(OauthType.KAKAO)
                .profileUrl("adsf")
                .build();
        Member savedMember = memberRepository.save(member);

        GuestBook guestBook = GuestBook.builder()
                .member(savedMember)
                .build();
        GuestBook savedGuestBook = guestBookRepository.save(guestBook);

        // when
        GuestBook resultGuestBook = guestBookRepository.findGuestBookByMember(savedMember).get();

        // then
        assertThat(resultGuestBook.getId()).isEqualTo(savedGuestBook.getId());
        assertThat(resultGuestBook.getMember().getId()).isEqualTo(savedGuestBook.getMember().getId());
    }
}