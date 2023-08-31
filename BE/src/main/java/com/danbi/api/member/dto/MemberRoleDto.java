package com.danbi.api.member.dto;

import com.danbi.domain.member.constant.Role;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.bouncycastle.cert.ocsp.Req;

public class MemberRoleDto {

    @Schema(description = "Member 역할 선택 요청")
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    @Getter
    public static class Request {
        @Schema(description = "선택할 Member 역할")
        private String role;
    }

}
