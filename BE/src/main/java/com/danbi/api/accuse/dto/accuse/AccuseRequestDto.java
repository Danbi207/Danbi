package com.danbi.api.accuse.dto.accuse;

import com.danbi.domain.accuse.constant.AccuseType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class AccuseRequestDto {

    private Long targetMemberId;
    private String evidenceUrl;
    private String title;
    private String content;
    private AccuseType accuseType;

}
