package com.danbi.api.helppost.dto.helpersearch.query;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
@Builder
public class HelperQueryHelpPostDto {

    private Long helpPostId;

    private Long ipId;

    private String name;

    private String profileUrl;

    private String caution;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm", timezone = "Asia/Seoul")
    private LocalDateTime startTime;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm", timezone = "Asia/Seoul")
    private LocalDateTime endTime;

    private boolean faceFlag;

    private int accuseStack;

    private boolean friendFlag;

}
