package com.danbi.api.hleppost.dto;

import com.danbi.domain.helppost.constant.State;
import com.danbi.domain.helppost.entity.HelpPost;
import com.danbi.domain.member.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Lob;
import java.time.LocalDateTime;

@Getter
@Builder
@AllArgsConstructor
public class HelpPostRequestDto {

    private Position position;
    private boolean faceFlag;
    private boolean reservationFlag;
    @Lob
    private String content;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private int totalTime;


    @Getter
    class Position {
        private String latitude;
        private String longitude;
    }

    public static HelpPost from(HelpPostRequestDto helpPostRequestDto, Member member) {

        return HelpPost.builder()
                .member(member)
                .content(helpPostRequestDto.getContent())
                .latitude(helpPostRequestDto.getPosition().getLatitude())
                .longitude(helpPostRequestDto.getPosition().getLongitude())
                .startTime(helpPostRequestDto.getStartTime())
                .endTime(helpPostRequestDto.getEndTime())
                .totalTime(helpPostRequestDto.getTotalTime())
                .reservationFlag(helpPostRequestDto.isReservationFlag())
                .faceFlag(helpPostRequestDto.isFaceFlag())
                .state(State.ACTIVATE)
                .build();
    }

}
