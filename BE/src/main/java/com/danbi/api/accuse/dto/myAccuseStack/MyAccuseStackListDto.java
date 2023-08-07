package com.danbi.api.accuse.dto.myAccuseStack;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
@AllArgsConstructor
public class MyAccuseStackListDto {

    private List<MyAccuseStackDto> accuseList;
}
