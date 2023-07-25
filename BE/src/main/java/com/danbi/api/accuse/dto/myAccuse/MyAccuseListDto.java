package com.danbi.api.accuse.dto.myAccuse;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
@AllArgsConstructor
public class MyAccuseListDto {

    private List<MyAccuseDto> accuseList;
}
