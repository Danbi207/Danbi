package com.danbi.api.accuse.dto.myAccuseStack;

import com.danbi.domain.accuse.constant.AccuseType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class MyAccuseStackDto {

    private Long accuseId;
    private AccuseType accuseType;
    private String content;

}
