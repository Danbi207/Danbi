package com.danbi.domain.preset.service;

import com.danbi.domain.preset.dto.PresetDto;
import com.danbi.domain.preset.entity.Preset;
import com.danbi.domain.preset.repository.PresetRepository;
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

import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
class PresetServiceTest {

    @Autowired
    PresetService presetService;
    @Autowired
    PresetRepository presetRepository;

    private Preset preset1;
    private Preset preset2;
    private Preset preset3;

    @BeforeEach
    void setup() {
        preset1 = Preset.builder()
                .title("제목1")
                .content("내용1")
                .sequence(0)
                .activeFlag(true)
                .build();

        preset2 = Preset.builder()
                .title("제목2")
                .content("내용2")
                .sequence(1)
                .activeFlag(true)
                .build();

        preset3 = Preset.builder()
                .title("제목3")
                .content("내용3")
                .sequence(2)
                .activeFlag(true)
                .build();
    }


    @DisplayName("프리셋 저장")
    @Test
    void savePreset() {
        // given
        // when
        Preset savedPreset = presetService.savePreset(preset1);
        // then
        assertThat(savedPreset.getTitle()).isEqualTo(preset1.getTitle());
        assertThat(savedPreset.getContent()).isEqualTo(preset1.getContent());
        assertThat(savedPreset.getSequence()).isEqualTo(preset1.getSequence());
    }

    @DisplayName("프리셋 제목, 내용, 순서 수정")
    @Test
    void updateTitle() {
        // given
        Preset savedPreset = presetRepository.save(preset1);

        PresetDto presetDto = PresetDto.builder()
                .title("수정된 제목")
                .content("수정된 내용")
                .sequence(1)
                .build();
        // when
        Preset updatedPreset = presetService.update(presetDto, savedPreset);

        // then
        assertThat(updatedPreset.getId()).isEqualTo(savedPreset.getId());
        assertThat(updatedPreset.getTitle()).isEqualTo(presetDto.getTitle());
        assertThat(updatedPreset.getContent()).isEqualTo(presetDto.getContent());
        assertThat(updatedPreset.getSequence()).isEqualTo(presetDto.getSequence());
    }

    @DisplayName("id로 프리셋 조회")
    @Test
    void findById() {
        // given
        Preset savedPreset = presetRepository.save(preset1);
        // when
        Preset preset = presetService.findById(savedPreset.getId());
        // then
        assertThat(preset.getId()).isEqualTo(savedPreset.getId());
        assertThat(preset.getTitle()).isEqualTo(savedPreset.getTitle());
        assertThat(preset.getContent()).isEqualTo(savedPreset.getContent());
        assertThat(preset.getSequence()).isEqualTo(savedPreset.getSequence());
        assertThat(preset.getActiveFlag()).isEqualTo(savedPreset.getActiveFlag());
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

    @Test
    void findPresetsByProfile() {
    }

    @Test
    void updateSequence() {
    }

    @Test
    void delete() {
    }

    @Test
    void getPresetRepository() {
    }
}