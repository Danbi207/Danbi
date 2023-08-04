package com.danbi.api.member.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MemberResponseDto {

    private Long userId;
    private Long profileId;
    private String name;
    private String profileUrl;
    private int accusePoint;
    private Long accumulateDewPoint;
    private Long dewPoint;
}
