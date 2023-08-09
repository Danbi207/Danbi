package com.danbi.api.admin.controller;

import com.danbi.api.ApiResponse;
import com.danbi.api.admin.dto.IPCertFileResponseDto;
import com.danbi.api.admin.service.AdminIPService;
import com.danbi.global.resolver.memberinfo.MemberInfo;
import com.danbi.global.resolver.memberinfo.MemberInfoDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "Admin", description = "관리자")
@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/admin/ip")
public class AdminIPController {

    private final AdminIPService adminIPService;

    @Operation(summary = "IP 회원 인증 서류 조회 API", description = "IP 회원 인증 서류 조회")
    @GetMapping("/file/{ipId}")
    public ApiResponse<List<IPCertFileResponseDto>> findIPCertFiles(@PathVariable Long ipId,
                                                                    @MemberInfo MemberInfoDto memberInfoDto) {
        List<IPCertFileResponseDto> ipCertFiles = adminIPService.findIPCertFiles(ipId);
        return ApiResponse.ok(ipCertFiles);
    }

    @Operation(summary = "IP 회원 인증 승인 처리 API", description = "IP 회원 인증 승인 처리")
    @PostMapping("/permit/{ipId}")
    public ApiResponse<String> permitIP(@PathVariable Long ipId, @MemberInfo MemberInfoDto memberInfoDto) {
        adminIPService.permitIp(ipId);
        return ApiResponse.ok("success");
    }

    @Operation(summary = "IP 회원 인증 거절 처리 API", description = "IP 회원 인증 거절 처리")
    @PostMapping("/reject/{ipId}")
    public ApiResponse<String> rejectIP(@PathVariable Long ipId, @MemberInfo MemberInfoDto memberInfoDto) {
        adminIPService.rejectIP(ipId);
        return ApiResponse.ok("success");
    }
}
