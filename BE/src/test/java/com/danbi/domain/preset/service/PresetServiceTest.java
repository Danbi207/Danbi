package com.danbi.domain.preset.service;

import com.danbi.domain.preset.dto.PresetDto;
import com.danbi.domain.preset.dto.PresetSequenceDto;
import com.danbi.domain.preset.entity.Preset;
import com.danbi.domain.preset.repository.PresetRepository;
import com.danbi.domain.profile.entity.Profile;
import com.danbi.domain.profile.repository.ProfileRepository;
import com.danbi.global.error.exception.notfound.PresetNotFoundException;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import java.util.List;

import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
class PresetServiceTest {

    @Autowired
    PresetService presetService;
    @Autowired
    PresetRepository presetRepository;
    @Autowired
    ProfileRepository profileRepository;

    private Preset preset1;
    private Preset preset2;
    private Preset preset3;
    private Profile profile;

    @BeforeEach
    void setup() {
        profile = Profile.builder()
                .build();

        profileRepository.save(profile);

        preset1 = Preset.builder()
                .title("제목1")
                .content("내용1")
                .sequence(0)
                .activeFlag(true)
                .profile(profile)
                .build();

        preset2 = Preset.builder()
                .title("제목2")
                .content("내용2")
                .sequence(1)
                .activeFlag(true)
                .profile(profile)
                .build();

        preset3 = Preset.builder()
                .title("제목3")
                .content("내용3")
                .sequence(2)
                .activeFlag(true)
                .profile(profile)
                .build();

        presetRepository.saveAll(List.of(preset1, preset2, preset3));
    }


    @DisplayName("프리셋 저장")
    @Test
    void savePreset() {
        // given
        Preset preset = Preset.builder()
                .title("제목")
                .content("내용")
                .sequence(0)
                .activeFlag(true)
                .profile(profile)
                .build();
        // when
        Preset savedPreset = presetService.savePreset(preset);
        // then
        assertThat(savedPreset.getTitle()).isEqualTo(preset.getTitle());
        assertThat(savedPreset.getContent()).isEqualTo(preset.getContent());
        assertThat(savedPreset.getSequence()).isEqualTo(preset.getSequence());
    }

    @DisplayName("프리셋 제목, 내용, 순서 수정")
    @Test
    void updateTitle() {
        // given
        PresetDto presetDto = PresetDto.builder()
                .title("수정된 제목")
                .content("수정된 내용")
                .sequence(1)
                .build();
        // when
        Preset updatedPreset = presetService.update(presetDto, preset1);

        // then
        assertThat(updatedPreset.getId()).isEqualTo(preset1.getId());
        assertThat(updatedPreset.getTitle()).isEqualTo(presetDto.getTitle());
        assertThat(updatedPreset.getContent()).isEqualTo(presetDto.getContent());
        assertThat(updatedPreset.getSequence()).isEqualTo(presetDto.getSequence());
    }

    @DisplayName("id로 프리셋 조회")
    @Test
    void findById() {
        // given
        // when
        Preset preset = presetService.findById(preset1.getId());
        // then
        assertThat(preset.getId()).isEqualTo(preset1.getId());
        assertThat(preset.getTitle()).isEqualTo(preset1.getTitle());
        assertThat(preset.getContent()).isEqualTo(preset1.getContent());
        assertThat(preset.getSequence()).isEqualTo(preset1.getSequence());
        assertThat(preset.getActiveFlag()).isEqualTo(preset1.getActiveFlag());
    }

    @DisplayName("id로 프리셋 조회 예외 처리")
    @Test
    void findByIdException() {
        // given
        Preset savedPreset = presetRepository.save(preset1);
        // when then
        assertThatThrownBy(() -> presetService.findById(100L))
                .isInstanceOf(PresetNotFoundException.class);
    }

    @DisplayName("프로필로 프리셋 목록 조회")
    @Test
    void findPresetsByProfile() {
        // given
        // when
        List<Preset> presets = presetService.findPresetsByProfile(profile);
        // then
        assertThat(presets).hasSize(3)
                .extracting("id", "title", "content", "sequence", "activeFlag", "profile")
                .containsExactlyInAnyOrder(
                        tuple(preset1.getId(), preset1.getTitle(), preset1.getContent(), preset1.getSequence(), preset1.getActiveFlag(), profile),
                        tuple(preset2.getId(), preset2.getTitle(), preset2.getContent(), preset2.getSequence(), preset2.getActiveFlag(), profile),
                        tuple(preset3.getId(), preset3.getTitle(), preset3.getContent(), preset3.getSequence(), preset3.getActiveFlag(), profile)
                );
    }

    @DisplayName("프리셋 순서 변경")
    @Test
    void updateSequence() {
        // given
        PresetSequenceDto dto1 = PresetSequenceDto.builder()
                .preset(preset1)
                .sequence(1)
                .build();
        PresetSequenceDto dto2 = PresetSequenceDto.builder()
                .preset(preset2)
                .sequence(2)
                .build();
        PresetSequenceDto dto3 = PresetSequenceDto.builder()
                .preset(preset3)
                .sequence(0)
                .build();

        List<PresetSequenceDto> dtos = List.of(dto1, dto2, dto3);
        // when
        List<Preset> updatedPresets = presetService.updateSequence(dtos);
        // then
        assertThat(updatedPresets).hasSize(3)
                .extracting("id", "title", "content", "sequence")
                .containsExactlyInAnyOrder(
                        tuple(preset1.getId(), preset1.getTitle(), preset1.getContent(), dto1.getSequence()),
                        tuple(preset2.getId(), preset2.getTitle(), preset2.getContent(), dto2.getSequence()),
                        tuple(preset3.getId(), preset3.getTitle(), preset3.getContent(), dto3.getSequence())
                );
    }

    @DisplayName("프리셋 1개 삭제")
    @Test
    void delete() {
        // given
        Preset targetPreset = preset1;
        List<Preset> prePresets = presetRepository.findAll();
        // when
        presetService.delete(targetPreset);
        // then
        List<Preset> postPresets = presetRepository.findAll();
        assertThat(postPresets).hasSize(prePresets.size() - 1)
                .extracting("id", "title", "content", "sequence")
                .containsExactlyInAnyOrder(
                        tuple(preset2.getId(), preset2.getTitle(), preset2.getContent(), preset2.getSequence()),
                        tuple(preset3.getId(), preset3.getTitle(), preset3.getContent(), preset3.getSequence())
                );
    }

}