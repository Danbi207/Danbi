package com.danbi.domain.helppost.dto;

import com.danbi.domain.helppost.constant.State;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class HelpPostByMonthDto {

    private Long helpPostId;

    private Long profileId;

    private String content;

    private LocalDateTime startTime;

    private LocalDateTime endTime;

    private State state;
}
