package com.danbi.domain.preset.service;

import com.danbi.domain.member.entity.Member;
import com.danbi.domain.preset.dto.PresetDto;
import com.danbi.domain.preset.dto.PresetSequenceDto;
import com.danbi.domain.preset.entity.Preset;
import com.danbi.domain.preset.repository.PresetRepository;
import com.danbi.domain.profile.entity.Profile;
import com.danbi.global.error.ErrorCode;
import com.danbi.global.error.exception.notfound.PresetNotFoundException;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
@Getter
@RequiredArgsConstructor
public class PresetService {

    private final PresetRepository presetRepository;

    @Transactional
    public Preset savePreset(Preset preset) {
        return presetRepository.save(preset);
    }

    @Transactional
    public Preset update(PresetDto presetDto, Preset preset) {
        preset.updateTitle(presetDto.getTitle());
        preset.updateContent(presetDto.getContent());
        preset.updateSequence(presetDto.getSequence());

        return preset;
    }

    public Preset findById(Long id) {
        Optional<Preset> op = presetRepository.findById(id);
        if(op.isEmpty()) {
            throw new PresetNotFoundException(ErrorCode.PRESET_NOT_EXISTS);
        }

        return op.get();
    }

    public List<Preset> findPresetsByProfile(Profile profile) {
        return presetRepository.findAllByProfileOrderBySequence(profile);
    }

    @Transactional
    public List<Preset> updateSequence(List<PresetSequenceDto> presetSequenceDtos) {
        return presetSequenceDtos.stream()
                .map(presetSequenceDto -> {
                    Preset preset = presetSequenceDto.getPreset();
                    Integer nSequence = presetSequenceDto.getSequence();
                    preset.updateSequence(nSequence);
                    return preset;
                })
                .collect(Collectors.toList());
    }

    @Transactional
    public void delete(Preset preset) {
        presetRepository.delete(preset);
    }

}
