package com.danbi.api.hleppost.controller;

import com.danbi.api.hleppost.dto.HelpPostRequestDto;
import com.danbi.api.hleppost.dto.HelpPostResponseDto;
import com.danbi.api.hleppost.dto.detailsearch.DetailHelpPostDto;
import com.danbi.api.hleppost.dto.helpersearch.HelperResponseDto;
import com.danbi.api.hleppost.dto.mysearch.MyHelpPostDto;
import com.danbi.api.hleppost.service.HelpPostInfoService;
import com.danbi.domain.member.entity.Member;
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
    @PostMapping("/create")  // FIXME : 후에 토큰을 통한 유저정보 얻기 수정
    public ResponseEntity<HelpPostResponseDto> createHelpPost(Member member, HelpPostRequestDto helpPostRequestDto) {
        HelpPostResponseDto helpPostInfo = helpPostInfoService.getHelpPostInfo(member, helpPostRequestDto);
        return ResponseEntity.ok(helpPostInfo);
    }

    @Tag(name = "HelpPost")
    @Operation(summary = "도움 요청 게시글 삭제 API", description = "도움 요청 게시글 삭제 API")
    @DeleteMapping("/{helppost_id}")  // FIXME : 후에 토큰을 통한 유저정보 얻고 비교 수정
    public ResponseEntity<String> deleteHelpPost(@PathVariable Long helppost_id) {
        helpPostInfoService.deleteHelpPostInfo(helppost_id);
        return ResponseEntity.ok("도움요청 게시글 삭제에 성공했습니다");
    }

    @Tag(name = "HelpPost")
    @Operation(summary = "도움 요청 게시글 수정 API", description = "도움 요청 게시글 수정 API")
    @PutMapping("/{helppost_id}")  // FIXME : 후에 토큰을 통한 유저정보 얻고 비교 수정
    public ResponseEntity<HelpPostResponseDto> updateHelpPost(@PathVariable Long helppost_id, Member member, HelpPostRequestDto helpPostRequestDto) {
        HelpPostResponseDto helpPostInfo = helpPostInfoService.updateHelpPostInfo(helppost_id, member, helpPostRequestDto);
        return ResponseEntity.ok(helpPostInfo);
    }

    @Tag(name = "HelpPost")
    @Operation(summary = "내가 요청한 도움 요청 게시글 리스트 API", description = "내가 요청한 도움 요청 게시글 리스트 API")
    @GetMapping("/registers") // FIXME : 후에 토큰을 통한 유저정보 얻고 멤버 수정
    public ResponseEntity<MyHelpPostDto> searchMyHelpPost(Member member) {
        MyHelpPostDto myHelpPostDto = helpPostInfoService.searchMyHelpPost(member);
        return ResponseEntity.ok(myHelpPostDto);
    }

    @Tag(name = "HelpPost")
    @Operation(summary = "현재 등록된 모든 도움 요청 게시글 리스트 API", description = "현재 등록된 모든 도움 요청 게시글 리스트 API")
    @GetMapping("")
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
