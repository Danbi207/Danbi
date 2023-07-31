package com.danbi.api.hleppost.dto.helpersearch.face;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@Builder
@AllArgsConstructor
public class HelperFaceHelpPostDto {

    private Long helpPostId;

    private Long ipId;

    private Position position;

    private String name;

    private String profileUrl;

    private String caution;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm", timezone = "Asia/Seoul")
    private LocalDateTime startTime;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm", timezone = "Asia/Seoul")
    private LocalDateTime endTime;

    private Long accumulateDewPoint;

    private boolean friendFlag;

    @Getter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Position {
        private String latitude;
        private String longitude;
    }
}
