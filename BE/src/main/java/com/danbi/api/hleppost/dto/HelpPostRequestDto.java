package com.danbi.api.hleppost.dto;

import com.danbi.domain.helppost.constant.State;
import com.danbi.domain.helppost.entity.HelpPost;
import com.danbi.domain.member.entity.Member;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import net.bytebuddy.implementation.bind.annotation.Empty;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;

@Getter
@Builder
@AllArgsConstructor
public class HelpPostRequestDto {

    private Position position;

    @JsonProperty("face_flag")
    private boolean faceFlag;

    @JsonProperty("reservation_flag")
    private boolean reservationFlag;

    @NotBlank(message = "요청글은 필수입니다.")
    @Length(max = 500, message = "요청글은 최대 500글자 입니다.")
    private String content;

    @JsonProperty("start_time")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm", timezone = "Asia/Seoul")
    private LocalDateTime startTime;

    @JsonProperty("end_time")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm", timezone = "Asia/Seoul")
    private LocalDateTime endTime;

    @JsonProperty("total_time")
    private int totalTime;


    @Getter
    @NoArgsConstructor
    public static class Position {
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
