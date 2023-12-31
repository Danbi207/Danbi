package com.danbi.api.helppost.controller;

import com.danbi.api.ApiResponse;
import com.danbi.api.helppost.dto.HelpPostRequestDto;
import com.danbi.api.helppost.dto.HelpPostResponseDto;
import com.danbi.api.helppost.dto.detailmatched.DetailMatchedHelpPostDto;
import com.danbi.api.helppost.dto.detailsearch.DetailHelpPostDto;
import com.danbi.api.helppost.dto.helpersearch.contact.ContactRequestDto;
import com.danbi.api.helppost.dto.helpersearch.face.HelperFaceHelpPostDto;
import com.danbi.api.helppost.dto.helpersearch.query.HelperQueryHelpPostDto;
import com.danbi.api.helppost.dto.helpersearch.untact.UntactRequestDto;
import com.danbi.api.helppost.dto.helpertime.HelperTimeResponseDto;
import com.danbi.api.helppost.dto.searchbymonth.HelpPostByMonthRequestDto;
import com.danbi.api.helppost.dto.searchbymonth.HelpPostByMonthResponseDto;
import com.danbi.api.helppost.service.HelpPostInfoService;
import com.danbi.global.resolver.memberinfo.MemberInfo;
import com.danbi.global.resolver.memberinfo.MemberInfoDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Locale;

@Tag(name = "HelpPost", description = "도움 요청 게시글")
@RestController
@RequestMapping("/api/v1/help")
@RequiredArgsConstructor
public class HelpPostController {

    private final HelpPostInfoService helpPostInfoService;


    @Operation(summary = "도움 요청 게시글 등록 API", description = "도움 요청 게시글 등록 API")
    @PostMapping("/create")  // 도움 요청 게시글, 도움 게시글 생성
    public ApiResponse<HelpPostResponseDto> createHelpPost(@MemberInfo MemberInfoDto memberInfoDto,
                                                              @Valid @RequestBody HelpPostRequestDto helpPostRequestDto) {
        HelpPostResponseDto helpPostInfo = helpPostInfoService.getHelpPostInfo(memberInfoDto.getMemberId(), helpPostRequestDto);
        return ApiResponse.ok(helpPostInfo);
    }

    @Operation(summary = "도움 요청 게시글 삭제 API", description = "도움 요청 게시글 삭제 API")
    @DeleteMapping("/{helpPostId}")
    public ApiResponse<String> deleteHelpPost(@PathVariable Long helpPostId,
                                                 @MemberInfo MemberInfoDto memberInfoDto) {
        helpPostInfoService.deleteHelpPostInfo(helpPostId,memberInfoDto.getMemberId());
        return ApiResponse.ok("도움요청 게시글 삭제에 성공했습니다");
    }

    @Operation(summary = "도움 요청 게시글 수정 API", description = "도움 요청 게시글 수정 API")
    @PutMapping("/{helpPostId}")
    public ApiResponse<HelpPostResponseDto> updateHelpPost(@PathVariable Long helpPostId,
                                                              @MemberInfo MemberInfoDto memberInfoDto,
                                                              @Valid @RequestBody HelpPostRequestDto helpPostRequestDto) {
        HelpPostResponseDto helpPostInfo = helpPostInfoService.updateHelpPostInfo(helpPostId, memberInfoDto.getMemberId(), helpPostRequestDto);
        return ApiResponse.ok(helpPostInfo);
    }

    @Operation(summary = "내가 요청한 월별 도움 요청 게시글 리스트 API", description = "내가 요청한 월별 도움 요청 게시글 리스트 API")
    @PostMapping("/registers") // 내가(IP) 작성한 모든 도움 요청 게시글 조회
    public ApiResponse<HelpPostByMonthResponseDto> searchMyHelpPost(@MemberInfo MemberInfoDto memberInfoDto,
                                                          @RequestBody HelpPostByMonthRequestDto helpPostByMonthRequestDto) {
        HelpPostByMonthResponseDto helpPostByMonth = helpPostInfoService.searchByMonth(
                helpPostByMonthRequestDto.getYearAndMonth(), memberInfoDto.getMemberId());
        return ApiResponse.ok(helpPostByMonth);
    }

    @Operation(summary = "도움요청 게시글 상세 조회 API", description = "도움요청 게시글 상세 조회 API")
    @GetMapping("/detail/{helpPostId}")
    public ApiResponse<DetailHelpPostDto> searchDetailHelpPost(@PathVariable("helpPostId") Long helpPostId,
                                                               @MemberInfo MemberInfoDto memberInfoDto) {
        DetailHelpPostDto detailHelpPostDto = helpPostInfoService.searchDetailQueryHelpPost(helpPostId, memberInfoDto.getMemberId());
        return ApiResponse.ok(detailHelpPostDto);
    }

    @Operation(summary = "현재 등록된 비대면 도움 요청 게시글 쿼리 리스트 API", description = "현재 등록된 비대면 도움 요청 게시글 쿼리 리스트 API")
    @PostMapping("/untact") // 현재 등록된 모든 도움 요청 게시글 조회(querydsl)
    public ApiResponse<List<HelperQueryHelpPostDto>> searchAllByQueryHelpPost(@MemberInfo MemberInfoDto memberInfoDto,
                                                                              @RequestBody UntactRequestDto untactRequestDto) {
        List<HelperQueryHelpPostDto> allHelpPosts = helpPostInfoService.searchQueryHelpPost(memberInfoDto.getMemberId(),
                untactRequestDto.getGender().toLowerCase());
        return ApiResponse.ok(allHelpPosts);
    }

    @Operation(summary = "현재 등록된 모든 대면 도움 요청 게시글 쿼리 리스트 API", description = "현재 등록된 모든 대면 도움 요청 게시글 쿼리 리스트 API")
    @PostMapping("/contact") // 현재 등록된 모든 도움 대면 요청 게시글 조회(querydsl)
    public ApiResponse<List<HelperFaceHelpPostDto>> searchAllByFaceHelpPost(@MemberInfo MemberInfoDto memberInfoDto,
                                                                            @RequestBody ContactRequestDto contactRequestDto) {
        List<HelperFaceHelpPostDto> allHelpPosts = helpPostInfoService.searchFaceHelpPost(memberInfoDto.getMemberId(),
                contactRequestDto.getLongitude(), contactRequestDto.getLatitude(), contactRequestDto.getGender().toLowerCase());
        return ApiResponse.ok(allHelpPosts);
    }

    @Operation(summary = "매칭된 도움, 도움 요청 게시글 쿼리 API", description = "매칭된 도움, 도움 요청 게시글 쿼리 API")
    @GetMapping("/matched/{helpPostId}") // 현재 등록된 모든 도움 대면 요청 게시글 조회(querydsl)
    public ApiResponse<DetailMatchedHelpPostDto> searchMatchedHelpPost(@MemberInfo MemberInfoDto memberInfoDto,
                                                                       @PathVariable Long helpPostId) {
        DetailMatchedHelpPostDto matchedHelpPost = helpPostInfoService.searchMatchedHelpPost(helpPostId);
        return ApiResponse.ok(matchedHelpPost);
    }

    @Operation(summary = "헬퍼 지금 도움중 인지 체크 API", description = "헬퍼 지금 도움중 인지 체크 API")
    @GetMapping("/time") // 헬퍼 지금 도움중 인지 체크
    public ApiResponse<HelperTimeResponseDto> checkHelperMatchedTime(@MemberInfo MemberInfoDto memberInfoDto) {
        HelperTimeResponseDto helperTimeResponseDto = helpPostInfoService.checkHelperMatchedTime(memberInfoDto.getMemberId());
        return ApiResponse.ok(helperTimeResponseDto);
    }
}
