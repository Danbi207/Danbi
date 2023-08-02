package com.danbi.api.helppost.dto.mysearch;

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
