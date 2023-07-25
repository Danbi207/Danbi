package com.danbi.api.hleppost.dto.helpersearch;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class HelperRequestDto {

    private Position position;

    @Getter
    class Position {
        private String latitude;
        private String longitude;
    }
}
