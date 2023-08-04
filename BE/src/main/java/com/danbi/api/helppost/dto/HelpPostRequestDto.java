package com.danbi.api.helppost.dto;

import com.danbi.domain.helppost.constant.Category;
import com.danbi.domain.helppost.constant.State;
import com.danbi.domain.helppost.entity.HelpPost;
import com.danbi.domain.helppost.entity.Positions;
import com.danbi.domain.member.entity.Member;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
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

    private Category category;

    private String caution;


    @Getter
    @NoArgsConstructor
    public static class Position {

        private String latitude;

        private String longitude;

        private String addr;

        @JsonProperty("dest_latitude")
        private String destLatitude;

        @JsonProperty("dest_longitude")
        private String destLongitude;

        @JsonProperty("dest_addr")
        private String destAddr;

        @JsonProperty("meet_latitude")
        private String meetLatitude;

        @JsonProperty("meet_longitude")
        private String meetLongitude;

        @JsonProperty("meet_addr")
        private String meetAddr;

    }

    public static HelpPost from(HelpPostRequestDto helpPostRequestDto, Member member, Positions positions) {
        return HelpPost.builder()
                .member(member)
                .content(helpPostRequestDto.getContent())
                .startTime(helpPostRequestDto.getStartTime())
                .endTime(helpPostRequestDto.getEndTime())
                .reservationFlag(helpPostRequestDto.isReservationFlag())
                .faceFlag(helpPostRequestDto.isFaceFlag())
                .state(State.ACTIVATE)
                .positions(positions)
                .category(helpPostRequestDto.getCategory())
                .caution(helpPostRequestDto.getCaution())
                .build();
    }

    public static Positions fromPositions(HelpPostRequestDto helpPostRequestDto) {

        return Positions.builder()
                .latitude(helpPostRequestDto.getPosition().getLatitude())
                .longitude(helpPostRequestDto.getPosition().getLongitude())
                .destLatitude(helpPostRequestDto.getPosition().getDestLatitude())
                .destLongitude(helpPostRequestDto.getPosition().getDestLongitude())
                .meetLatitude(helpPostRequestDto.getPosition().getMeetLatitude())
                .meetLongitude(helpPostRequestDto.getPosition().getMeetLongitude())
                .addr(helpPostRequestDto.getPosition().getAddr())
                .destAddr(helpPostRequestDto.getPosition().getDestAddr())
                .meetAddr(helpPostRequestDto.getPosition().getMeetAddr()).build();
    }

}
