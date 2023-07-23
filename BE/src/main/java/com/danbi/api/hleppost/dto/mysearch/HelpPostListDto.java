package com.danbi.api.hleppost.dto.mysearch;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import javax.persistence.Lob;
import java.time.LocalDateTime;

@Getter
@Builder
@AllArgsConstructor
public class HelpPostListDto {

    private Long helpPostId;
    @Lob
    private String content;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private int totalTime;
}
