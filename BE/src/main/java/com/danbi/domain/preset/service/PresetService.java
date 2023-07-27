package com.danbi.domain.preset.service;

import com.danbi.domain.preset.entity.Preset;
import com.danbi.domain.preset.repository.PresetRepository;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

}
