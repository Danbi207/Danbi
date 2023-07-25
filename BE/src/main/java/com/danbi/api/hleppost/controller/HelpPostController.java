package com.danbi.api.hleppost.controller;

import com.danbi.api.hleppost.dto.HelpPostRequestDto;
import com.danbi.api.hleppost.dto.HelpPostResponseDto;
import com.danbi.api.hleppost.dto.detailsearch.DetailHelpPostDto;
import com.danbi.api.hleppost.dto.helpersearch.HelperResponseDto;
import com.danbi.api.hleppost.dto.mysearch.MyHelpPostDto;
import com.danbi.api.hleppost.service.HelpPostInfoService;
import com.danbi.domain.member.entity.Member;
import com.danbi.global.resolver.MemberInfo;
import com.danbi.global.resolver.MemberInfoDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(name = "HelpPost", description = "도움 요청 게시글")
@RestController
@RequestMapping("/api/v1/help")
@RequiredArgsConstructor
public class HelpPostController {

    private final HelpPostInfoService helpPostInfoService;


    @Tag(name = "HelpPost")
    @Operation(summary = "도움 요청 게시글 등록 API", description = "도움 요청 게시글 등록 API")
    @PostMapping("/create")  // 도움 요청 게시글, 도움 게시글 생성
    public ResponseEntity<HelpPostResponseDto> createHelpPost(@MemberInfo MemberInfoDto memberInfoDto, HelpPostRequestDto helpPostRequestDto) {
        HelpPostResponseDto helpPostInfo = helpPostInfoService.getHelpPostInfo(memberInfoDto.getMemberId(), helpPostRequestDto);
        return ResponseEntity.ok(helpPostInfo);
    }

    @Tag(name = "HelpPost")
    @Operation(summary = "도움 요청 게시글 삭제 API", description = "도움 요청 게시글 삭제 API")
    @DeleteMapping("/{helppost_id}")  // TODO : 작성자와 삭제 요청자 동일한지 검증 필요
    public ResponseEntity<String> deleteHelpPost(@PathVariable Long helppost_id, @MemberInfo MemberInfoDto memberInfoDto) {
        helpPostInfoService.deleteHelpPostInfo(helppost_id,memberInfoDto.getMemberId());
        return ResponseEntity.ok("도움요청 게시글 삭제에 성공했습니다");
    }

    @Tag(name = "HelpPost")
    @Operation(summary = "도움 요청 게시글 수정 API", description = "도움 요청 게시글 수정 API")
    @PutMapping("/{helppost_id}")  // TODO : 작성자와 수정 요청자 동일한지 검증 필요
    public ResponseEntity<HelpPostResponseDto> updateHelpPost(@PathVariable Long helppost_id, @MemberInfo MemberInfoDto memberInfoDto, HelpPostRequestDto helpPostRequestDto) {
        HelpPostResponseDto helpPostInfo = helpPostInfoService.updateHelpPostInfo(helppost_id, memberInfoDto.getMemberId(), helpPostRequestDto);
        return ResponseEntity.ok(helpPostInfo);
    }

    @Tag(name = "HelpPost")
    @Operation(summary = "내가 요청한 도움 요청 게시글 리스트 API", description = "내가 요청한 도움 요청 게시글 리스트 API")
    @GetMapping("/registers") // 내가(IP) 작성한 모든 도움 요청 게시글 조회
    public ResponseEntity<MyHelpPostDto> searchMyHelpPost(@MemberInfo MemberInfoDto memberInfoDto) {
        MyHelpPostDto myHelpPostDto = helpPostInfoService.searchMyHelpPost(memberInfoDto.getMemberId());
        return ResponseEntity.ok(myHelpPostDto);
    }

    @Tag(name = "HelpPost")
    @Operation(summary = "현재 등록된 모든 도움 요청 게시글 리스트 API", description = "현재 등록된 모든 도움 요청 게시글 리스트 API")
    @GetMapping("") // 현재 등록된 모든 도움 요청 게시글 조회(helper)
    public ResponseEntity<HelperResponseDto> searchAllHelpPost() {
        HelperResponseDto helperResponseDto = helpPostInfoService.searchHelperHelpPost();
        return ResponseEntity.ok(helperResponseDto);
    }

    @Tag(name = "HelpPost")
    @Operation(summary = "도움요청 게시글 상세 조회 API", description = "도움요청 게시글 상세 조회 API")
    @GetMapping("/{helppost_id}")
    public ResponseEntity<DetailHelpPostDto> searchAllHelpPost(@PathVariable Long helppost_id) {
        DetailHelpPostDto detailHelpPostDto = helpPostInfoService.searchDetailHelpPost(helppost_id);
        return ResponseEntity.ok(detailHelpPostDto);
    }

}