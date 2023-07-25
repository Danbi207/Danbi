package com.danbi.api.point.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class AccumulatePointResponseDto {

    private Long accumulateDewPoint;
}
