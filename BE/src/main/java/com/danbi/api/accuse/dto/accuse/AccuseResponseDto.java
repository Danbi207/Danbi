package com.danbi.api.accuse.dto.accuse;

import com.danbi.domain.accuse.constant.AccuseType;
import com.danbi.domain.accuse.constant.State;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
@AllArgsConstructor
@Schema(description = "회원 신고")
public class AccuseResponseDto {

    private Long accuseId;
    private AccuseMemberDto memberInfo;
    private String content;
    private AccuseType accuseType;
    private State state;
    private List<AccuseFileDto> fileList;
}
