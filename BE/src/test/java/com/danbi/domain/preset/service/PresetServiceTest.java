package com.danbi.domain.preset.service;

import com.danbi.domain.preset.dto.PresetDto;
import com.danbi.domain.preset.entity.Preset;
import com.danbi.domain.preset.repository.PresetRepository;
import org.assertj.core.api.Assertions;
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


    @DisplayName("프리셋 저장")
    @Test
    void savePreset() {
        // given
        Preset preset = Preset.builder()
                .title("제목1")
                .content("내용1")
                .sequence(0)
                .activeFlag(true)
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
        Preset preset = Preset.builder()
                .title("제목1")
                .content("내용1")
                .sequence(0)
                .activeFlag(true)
                .build();

        Preset savedPreset = presetRepository.save(preset);

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

    @Test
    void findById() {
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