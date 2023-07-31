package com.danbi.api.hleppost.dto.detailsearch;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class IpDto {

    private Long ipId;
    private String name;
    private String profileUrl;
    private Long accumulateDewPoint;
    private int accusePoint;

}
