package com.danbi.domain.preset.repository;

import com.danbi.domain.member.constant.Gender;
import com.danbi.domain.member.constant.OauthType;
import com.danbi.domain.member.constant.Role;
import com.danbi.domain.member.entity.Member;
import com.danbi.domain.member.repository.MemberRepository;
import com.danbi.domain.preset.entity.Preset;
import com.danbi.domain.profile.entity.Profile;
import com.danbi.domain.profile.repository.ProfileRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
class PresetRepositoryTest {

    @Autowired
    MemberRepository memberRepository;
    @Autowired
    ProfileRepository profileRepository;
    @Autowired
    PresetRepository presetRepository;

    @DisplayName("프로필로 프리셋 조회")
    @Test
    void findAllByProfile() {
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

        Profile profile = Profile.builder().build();
        Profile savedProfile = profileRepository.save(profile);

        Preset preset1 = Preset.builder()
                .profile(savedProfile)
                .content("content1")
                .title("title1")
                .sequence(0)
                .activeFlag(true)
                .build();
        Preset preset2 = Preset.builder()
                .profile(savedProfile)
                .content("content2")
                .title("title2")
                .sequence(1)
                .activeFlag(true)
                .build();
        Preset preset3 = Preset.builder()
                .profile(savedProfile)
                .content("content3")
                .title("title3")
                .sequence(2)
                .activeFlag(true)
                .build();
        Preset savedPreset1 = presetRepository.save(preset1);
        Preset savedPreset2 = presetRepository.save(preset2);
        Preset savedPreset3 = presetRepository.save(preset3);

        // when
        List<Preset> presets = presetRepository.findAllByProfile(profile);

        // then
        assertThat(presets).hasSize(3)
                .extracting("id", "title", "content", "sequence")
                .containsExactlyInAnyOrder(
                        tuple(savedPreset1.getId(), "title1", "content1", 0),
                        tuple(savedPreset2.getId(), "title2", "content2", 1),
                        tuple(savedPreset3.getId(), "title3", "content3", 2)
                );
    }
}