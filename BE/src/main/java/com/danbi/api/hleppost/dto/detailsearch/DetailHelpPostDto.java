package com.danbi.api.hleppost.dto.detailsearch;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import java.time.LocalDateTime;

@Getter
@Builder
@AllArgsConstructor
public class DetailHelpPostDto {

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

    @Getter
    @Builder
    public static class Position {
        private String latitude;
        private String longitude;
    }
}
