package com.danbi.api.accuse.dto.myAccuse;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class MyAccuseDto {

    private Long accuseId;
    private String content;
}
