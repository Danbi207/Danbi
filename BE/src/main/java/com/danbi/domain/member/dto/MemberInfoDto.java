package com.danbi.domain.member.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class MemberInfoDto {

    private Long userId;
    private Long profileId;
    private String name;
    private String profileUrl;
    private int accusePoint;
    private Long accumulateDewPoint;
    private Long dewPoint;
}
