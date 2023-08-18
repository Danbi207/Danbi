package com.danbi.api.admin.dto.totalbest;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TotalBestResponseDto {

    private List<TotalBestDto> bestMemberList;
}
