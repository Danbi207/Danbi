package com.danbi.api.hleppost.dto.helpersearch;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
public class HelperRequestDto {

    private Position position;

    @Getter
    @NoArgsConstructor
    public static class Position {
        private String latitude;
        private String longitude;
    }
}
