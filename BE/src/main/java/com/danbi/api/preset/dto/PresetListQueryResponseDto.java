package com.danbi.api.preset.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Builder
public class PresetListQueryResponseDto {

    List<PresetQueryResponseDto> presetList;
}
