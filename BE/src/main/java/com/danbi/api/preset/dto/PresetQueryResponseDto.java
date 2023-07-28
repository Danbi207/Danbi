package com.danbi.api.preset.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Schema(description = "프리셋 1개 상세 조회 응답 DTO")
@Setter
@Getter
@Builder
public class PresetQueryResponseDto {

    @Schema(description = "프리셋 id")
    private Long id;

    @Schema(description = "프리셋 제목")
    private String title;

    @Schema(description = "프리셋 내용")
    private String content;

    @Schema(description = "프리셋 순서")
    private Integer sequence;
}
