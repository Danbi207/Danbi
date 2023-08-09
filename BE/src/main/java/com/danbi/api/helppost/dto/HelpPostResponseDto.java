package com.danbi.api.helppost.dto;

import com.danbi.domain.helppost.constant.Category;
import com.danbi.domain.helppost.entity.HelpPost;
import com.danbi.domain.helppost.entity.Positions;
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

    private Long helpPostId;

    private Position position;

    private boolean faceFlag;

    private boolean emergencyFlag;

    private String content;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm", timezone = "Asia/Seoul")
    private LocalDateTime startTime;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm", timezone = "Asia/Seoul")
    private LocalDateTime endTime;


    private String caution;
    private Category category;


    @Getter
    @Builder
    @AllArgsConstructor
    public static class Position {
        private String latitude;
        private String longitude;

        private String addr;

        private String destLatitude;

        private String destLongitude;

        private String destAddr;

        private String meetLatitude;

        private String meetLongitude;

        private String meetAddr;
    }


    public static HelpPostResponseDto of(HelpPost helpPost, Positions positions) {
        Position position = Position.builder()
                .latitude(positions.getLatitude())
                .longitude(positions.getLongitude())
                .destLatitude(positions.getDestLatitude())
                .destLongitude(positions.getDestLongitude())
                .meetLatitude(positions.getMeetLatitude())
                .meetLongitude(positions.getMeetLongitude())
                .addr(positions.getAddr())
                .destAddr(positions.getDestAddr())
                .meetAddr(positions.getMeetAddr())
                .build();

        return HelpPostResponseDto.builder()
                .helpPostId(helpPost.getId())
                .position(position)
                .faceFlag(helpPost.isFaceFlag())
                .emergencyFlag(helpPost.isEmergencyFlag())
                .content(helpPost.getContent())
                .startTime(helpPost.getStartTime())
                .endTime(helpPost.getEndTime())
                .category(helpPost.getCategory())
                .caution(helpPost.getCaution())
                .build();
    }
}
