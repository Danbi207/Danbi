package com.danbi.api.accuse.dto.accuse;

import com.danbi.domain.accuse.constant.AccuseType;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class AccuseRequestDto {

    private Long targetMemberId;

    private String title;

    private String content;

    @JsonProperty("accuse_type")
    private AccuseType accuseType;

}
