package com.danbi.api.admin.controller;

import com.danbi.api.ApiResponse;
import com.danbi.api.admin.dto.besthelp.AdminBestHelpResponseDto;
import com.danbi.api.admin.dto.AdminMembersCountResponseDto;
import com.danbi.api.admin.dto.totalbest.TotalBestResponseDto;
import com.danbi.api.admin.service.AdminMemberService;
import com.danbi.global.resolver.paging.LimitedSizePagination;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "Admin", description = "관리자")
@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/admin/member")
public class AdminMemberController {

    private final AdminMemberService adminMemberService;

    @Operation(summary = "ADMIN으로 모든 회원 조회 API", description = "ADMIN으로 모든 회원 조회 API")
    @GetMapping
    @LimitedSizePagination
    public ApiResponse<AdminMembersCountResponseDto> findMembers(@PageableDefault(size = 10,
                                                                sort = "createTime",
                                                                direction = Sort.Direction.DESC) Pageable pageable) {
        AdminMembersCountResponseDto response = adminMemberService.findMembers(pageable);
        return ApiResponse.ok(response);
    }

    @Operation(summary = "ADMIN으로 Role별 회원 조회 API", description = "ADMIN으로 Role별 회원 조회 API")
    @GetMapping("/role")
    @LimitedSizePagination
    public ApiResponse<AdminMembersCountResponseDto> findMembersByRole(@RequestParam("memberRole") String memberRole,
                                                                @PageableDefault(size = 10,
                                                                sort = "createTime",
                                                                direction = Sort.Direction.DESC) Pageable pageable) {
        AdminMembersCountResponseDto response = adminMemberService.findMembersByRole("ROLE_" + memberRole, pageable);
        return ApiResponse.ok(response);
    }

    @Operation(summary = "이번달의 도움왕 3명 조회 API", description = "이번달의 도움왕 3명 조회 API")
    @GetMapping("/best")
    public ApiResponse<AdminBestHelpResponseDto> findBestHelpMembers() {
        AdminBestHelpResponseDto adminBestHelpResponseDto = adminMemberService.searchBestHelpMembers();
        return ApiResponse.ok(adminBestHelpResponseDto);
    }

    @Operation(summary = "누적 포인트 왕 10명 조회 API", description = "누적 포인트 왕 10명 조회 API")
    @GetMapping("/total")
    public ApiResponse<TotalBestResponseDto> findTotalBestHelpMembers() {
        TotalBestResponseDto totalBestResponseDto = adminMemberService.searchTotalBestMembers();
        return ApiResponse.ok(totalBestResponseDto);
    }
}
