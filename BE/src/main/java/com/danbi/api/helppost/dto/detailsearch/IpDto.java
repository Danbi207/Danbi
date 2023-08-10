package com.danbi.api.helppost.dto.detailsearch;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class IpDto {

    private Long ipId;
    private String name;
    private String profileUrl;
    private Long accumulateDewPoint;
    private int accusePoint;

}
