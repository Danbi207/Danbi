package com.danbi.api.accuse.dto.accuse;

import com.danbi.domain.accuse.constant.AccuseType;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AccuseRequestDto {

    private Long targetMemberId;

    private String content;

    private AccuseType accuseType;

}
