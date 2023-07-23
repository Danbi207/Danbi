package com.danbi.api.hleppost.dto.helpersearch;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import javax.persistence.Lob;
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
    @Lob
    private String content;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private int totalTime;
    private boolean friendFlag;


    @Builder
    public static class Position {
        private String latitude;
        private String longitude;
    }
}
