package com.danbi.api.helppost.dto.helpersearch;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class HelperRequestDto {

    private Position position;

    @Getter
    @NoArgsConstructor
    public static class Position {
        private String latitude;
        private String longitude;
    }
}
