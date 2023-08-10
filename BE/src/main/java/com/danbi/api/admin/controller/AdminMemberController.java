package com.danbi.api.admin.controller;

import com.danbi.api.ApiResponse;
import com.danbi.api.admin.dto.AdminMemberResponseDto;
import com.danbi.api.admin.service.AdminMemberService;
import com.danbi.domain.member.entity.Member;
import com.danbi.domain.member.service.MemberService;
import com.danbi.global.resolver.paging.LimitedSizePagination;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Tag(name = "Admin", description = "관리자")
@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/admin/member")
public class AdminMemberController {

    private final AdminMemberService adminMemberService;

    @Operation(summary = "ADMIN으로 모든 회원 조회 API", description = "ADMIN으로 모든 회원 조회 API")
    @GetMapping
    @LimitedSizePagination
    public ApiResponse<List<AdminMemberResponseDto>> findMembers(@PageableDefault(size = 10,
                                                                sort = "createTime",
                                                                direction = Sort.Direction.DESC) Pageable pageable) {
        List<AdminMemberResponseDto> response = adminMemberService.findMembers(pageable);
        return ApiResponse.ok(response);
    }

    @Operation(summary = "ADMIN으로 Role별 회원 조회 API", description = "ADMIN으로 Role별 회원 조회 API")
    @GetMapping("/role")
    @LimitedSizePagination
    public ApiResponse<List<AdminMemberResponseDto>> findMembersByRole(@RequestParam("memberRole") String memberRole,
                                                                @PageableDefault(size = 10,
                                                                sort = "createTime",
                                                                direction = Sort.Direction.DESC) Pageable pageable) {
        List<AdminMemberResponseDto> response = adminMemberService.findMembersByRole("ROLE_" + memberRole, pageable);
        return ApiResponse.ok(response);
    }
}
