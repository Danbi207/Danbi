package com.danbi.api.hleppost.dto.helpersearch;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
@Builder
public class HelperHelpPostListDto {

    private Long helpPostId;

    private Long ipId;

    private Position position;

    private boolean faceFlag;

    private boolean reservationFlag;

    private String content;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm", timezone = "Asia/Seoul")
    private LocalDateTime startTime;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm", timezone = "Asia/Seoul")
    private LocalDateTime endTime;

    private int totalTime;

    private boolean friendFlag;

//    private HelperHelpIpInfoDto ip;

    @Getter
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Position {
        private String latitude;
        private String longitude;
    }
}
