package com.danbi.domain.point.repository;

import com.danbi.domain.member.constant.Gender;
import com.danbi.domain.member.constant.OauthType;
import com.danbi.domain.member.constant.Role;
import com.danbi.domain.member.entity.Member;
import com.danbi.domain.member.repository.MemberRepository;
import com.danbi.domain.point.entity.Point;
import com.danbi.domain.profile.entity.Profile;
import com.danbi.domain.profile.repository.ProfileRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
class PointRepositoryTest {

    @Autowired
    PointRepository pointRepository;

    @Autowired
    MemberRepository memberRepository;

    @Autowired
    ProfileRepository profileRepository;

//    @DisplayName("프로필로 포인트 조회")
//    @Test
//    void findByProfile() {
//
//        // given
//        Member member = Member.builder()
//                .name("member1")
//                .nickname("nickname1")
//                .email("asdf@adsf.com")
//                .role(Role.ROLE_UNDEFINED)
//                .gender(Gender.male)
//                .oauthType(OauthType.KAKAO)
//                .profileUrl("adsf")
//                .build();
//
//        Point point = Point.builder()
//                .dewPoint(100L)
//                .accumulateDewPoint(100L)
//                .build();
//        Point savedPoint = pointRepository.save(point);
//
//        Profile profile = Profile.builder()
//                .member(member)
//                .point(point)
//                .build();
//        member.makeProfile(profile);
//
//        Member savedMember = memberRepository.save(member);
//
//        // when
//        Point resultPoint = pointRepository.findByProfile(member.getProfile()).get();
//
//        // then
//        assertThat(resultPoint.getId()).isEqualTo(savedPoint.getId());
//        assertThat(resultPoint.getProfile().getId()).isEqualTo(savedMember.getProfile().getId());
//    }
}