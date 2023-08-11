package com.danbi.api.helppost.dto.helpertime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class HelperTimeResponseDto {

    private boolean helperMatched;
    private Long helpPostId;
}
