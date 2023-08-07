package com.danbi.api.hleppost.dto;

import com.danbi.domain.helppost.entity.HelpPost;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
@AllArgsConstructor
public class HelpPostResponseDto {

    private Long helpId;

    private Position position;

    @JsonProperty("face_flag")
    private boolean faceFlag;

    @JsonProperty("reservation_flag")
    private boolean reservationFlag;

    private String content;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm", timezone = "Asia/Seoul")
    private LocalDateTime startTime;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm", timezone = "Asia/Seoul")
    private LocalDateTime endTime;

    private int totalTime;


    @Getter
    @Builder
    @AllArgsConstructor
    public static class Position {
        private String latitude;
        private String longitude;
    }


    public static HelpPostResponseDto of(HelpPost helpPost) {
        Position position = Position.builder()
                .latitude(helpPost.getLatitude())
                .longitude(helpPost.getLongitude())
                .build();

        return HelpPostResponseDto.builder()
                .helpId(helpPost.getId())
                .position(position)
                .faceFlag(helpPost.isFaceFlag())
                .reservationFlag(helpPost.isReservationFlag())
                .content(helpPost.getContent())
                .startTime(helpPost.getStartTime())
                .endTime(helpPost.getEndTime())
                .totalTime(helpPost.getTotalTime())
                .build();
    }
}
