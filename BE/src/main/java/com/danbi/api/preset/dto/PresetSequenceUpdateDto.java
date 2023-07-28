package com.danbi.api.preset.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

import java.util.List;

@Schema(description = "프리셋 순서 수정 DTO")
public class PresetSequenceUpdateDto {

    @Schema(description = "프리셋 순서 수정 요청 DTO")
    @Setter
    @Getter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Request {

        private List<PresetDto> presets;

        @Setter
        @Getter
        @Builder
        public static class PresetDto {

            private Long id;
            private Integer sequence;
        }

    }

    @Schema(description = "프리셋 순서 수정 응답 DTO")
    @Setter
    @Getter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Response {

        private List<PresetDto> presets;

        @Setter
        @Getter
        @Builder
        public static class PresetDto {

            private Long id;
            private String title;
            private String content;
            private Integer sequence;
        }

    }


}
