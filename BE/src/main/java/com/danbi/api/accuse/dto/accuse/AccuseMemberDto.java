package com.danbi.api.accuse.dto.accuse;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AccuseMemberDto {

    private Long memberId;
    private String name;

}
