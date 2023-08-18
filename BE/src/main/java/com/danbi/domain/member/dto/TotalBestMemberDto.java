package com.danbi.domain.member.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TotalBestMemberDto {

    private Long memberId;
    private Long profileId;
    private String name;
    private String profileUrl;
    private Long accumulateDewPoint;

}
