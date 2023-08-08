package com.danbi.api.admin.controller;

import com.danbi.api.ApiResponse;
import com.danbi.api.admin.dto.IPCertFileResponseDto;
import com.danbi.api.admin.service.AdminIPService;
import com.danbi.global.resolver.memberinfo.MemberInfo;
import com.danbi.global.resolver.memberinfo.MemberInfoDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/admin/ip")
public class AdminIPController {

    private final AdminIPService adminIPService;

    @GetMapping("/file/{ipId}/{fileId}")
    public ApiResponse<List<IPCertFileResponseDto>> findIPCertFiles(@PathVariable Long ipId,
                                                                    @PathVariable Long fileId,
                                                                    @MemberInfo MemberInfoDto memberInfoDto) {
        List<IPCertFileResponseDto> ipCertFiles = adminIPService.findIPCertFiles(memberInfoDto.getMemberId());
        return ApiResponse.ok(ipCertFiles);
    }
}
