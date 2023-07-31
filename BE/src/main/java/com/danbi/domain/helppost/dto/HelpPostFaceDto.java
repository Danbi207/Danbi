package com.danbi.domain.helppost.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
@AllArgsConstructor
public class HelpPostFaceDto {

    private Long helpPostId;
    private Long ipId;
    private String name;
    private String profileUrl;
    private String caution;
    private String longitude;
    private String latitude;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private Long accumulateDewPoint;
}
