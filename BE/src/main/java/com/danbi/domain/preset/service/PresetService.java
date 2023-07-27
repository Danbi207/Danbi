package com.danbi.domain.preset.service;

import com.danbi.domain.preset.dto.PresetDto;
import com.danbi.domain.preset.entity.Preset;
import com.danbi.domain.preset.repository.PresetRepository;
import com.danbi.global.error.ErrorCode;
import com.danbi.global.error.exception.notfound.PresetNotFoundException;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

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
        preset.updateContent(preset.getContent());
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

}
