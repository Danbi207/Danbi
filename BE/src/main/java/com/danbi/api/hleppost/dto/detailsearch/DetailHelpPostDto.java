package com.danbi.api.hleppost.dto.detailsearch;

import com.danbi.api.hleppost.dto.HelpPostResponseDto;
import com.danbi.domain.helppost.entity.HelpPost;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import javax.persistence.Lob;
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
    @Lob
    private String content;
    private LocalDateTime startTime;
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
