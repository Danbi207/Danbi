package com.danbi.api.hleppost.dto.detailmatched;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class HelperMatchedDto {

    private Long helperId;
    private String name;
    private String profileUrl;
    private Long accumulateDewPoint;
    private int accusePoint;
}
