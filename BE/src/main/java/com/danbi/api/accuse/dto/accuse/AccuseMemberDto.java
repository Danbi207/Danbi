package com.danbi.api.accuse.dto.accuse;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class AccuseMemberDto {

    private Long memberId;
    private String name;

}
