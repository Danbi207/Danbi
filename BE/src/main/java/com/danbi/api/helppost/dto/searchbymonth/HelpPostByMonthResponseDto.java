package com.danbi.api.helppost.dto.searchbymonth;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class HelpPostByMonthResponseDto {

    List<HelpPostByMonthDetailDto> helpList;
}
