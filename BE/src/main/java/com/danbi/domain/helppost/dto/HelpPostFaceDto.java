package com.danbi.domain.helppost.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class HelpPostFaceDto {

    private Long helpPostId;
    private Long ipId;
    private String name;
    private String profileUrl;
    private String content;
    private String meetLongitude;
    private String meetLatitude;
    private String meetAddr;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private boolean emergencyFlag;
    private int accuseStack;
}
