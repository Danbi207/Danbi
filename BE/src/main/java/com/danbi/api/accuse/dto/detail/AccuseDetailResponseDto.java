package com.danbi.api.accuse.dto.detail;

import com.danbi.domain.accuse.constant.AccuseType;
import com.danbi.domain.accuse.constant.State;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class AccuseDetailResponseDto {

    private Long accuseId;
    private String title;
    private String content;
    private AccuseType accuseType;
    private State state;
    // TODO : 신고 파일 추가
}
