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

    private boolean faceFlag;

    private boolean emergencyFlag;

    private boolean genderFlag;

    @NotBlank(message = "요청글은 필수입니다.")
    @Length(max = 500, message = "요청글은 최대 500글자 입니다.")
    private String content;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm", timezone = "Asia/Seoul")
    private LocalDateTime startTime;

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

        private String destLatitude;

        private String destLongitude;

        private String destAddr;

        private String meetLatitude;

        private String meetLongitude;

        private String meetAddr;

    }

    public static HelpPost from(HelpPostRequestDto helpPostRequestDto, Member member, Positions positions) {
        return HelpPost.builder()
                .member(member)
                .content(helpPostRequestDto.getContent())
                .startTime(helpPostRequestDto.getStartTime())
                .endTime(helpPostRequestDto.getEndTime())
                .emergencyFlag(helpPostRequestDto.isEmergencyFlag())
                .faceFlag(helpPostRequestDto.isFaceFlag())
                .genderFlag(helpPostRequestDto.isGenderFlag())
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
