package com.danbi.api.hleppost.dto.mysearch;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
@AllArgsConstructor
public class HelpPostListDto {

    private Long helpPostId;
    private String content;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private int totalTime;
}
