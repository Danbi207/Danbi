package com.danbi.domain.preset.dto;

import com.danbi.domain.preset.entity.Preset;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class PresetSequenceDto {

    private Preset preset;
    private Integer sequence;

    @Builder
    public PresetSequenceDto(Preset preset, Integer sequence) {
        this.preset = preset;
        this.sequence = sequence;
    }
}
