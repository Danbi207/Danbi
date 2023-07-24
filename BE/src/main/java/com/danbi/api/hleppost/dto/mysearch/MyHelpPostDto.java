package com.danbi.api.hleppost.dto.mysearch;

import com.danbi.api.hleppost.dto.mysearch.HelpPostListDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
@AllArgsConstructor
public class MyHelpPostDto {

    private List<HelpPostListDto> helpList;
}
