package com.danbi.api.helppost.dto.helpersearch;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import java.util.List;

@Getter
@AllArgsConstructor
@Builder
public class HelperResponseDto {

    private List<HelperHelpPostListDto> helpList;
}
