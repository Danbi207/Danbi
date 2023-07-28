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

import javax.validation.Valid;

@Tag(name = "HelpPost", description = "도움 요청 게시글")
@RestController
@RequestMapping("/api/v1/help")
@RequiredArgsConstructor
public class HelpPostController {

    private final HelpPostInfoService helpPostInfoService;


    @Operation(summary = "도움 요청 게시글 등록 API", description = "도움 요청 게시글 등록 API")
    @PostMapping("/create")  // 도움 요청 게시글, 도움 게시글 생성
    public ResponseEntity<HelpPostResponseDto> createHelpPost(@MemberInfo MemberInfoDto memberInfoDto,
                                                              @Valid @RequestBody HelpPostRequestDto helpPostRequestDto) {
        HelpPostResponseDto helpPostInfo = helpPostInfoService.getHelpPostInfo(memberInfoDto.getMemberId(), helpPostRequestDto);
        return ResponseEntity.ok(helpPostInfo);
    }

    @Operation(summary = "도움 요청 게시글 삭제 API", description = "도움 요청 게시글 삭제 API")
    @DeleteMapping("/{helppost_id}")
    public ResponseEntity<String> deleteHelpPost(@PathVariable("helppost_id") Long helpPostId,
                                                 @MemberInfo MemberInfoDto memberInfoDto) {
        helpPostInfoService.deleteHelpPostInfo(helpPostId,memberInfoDto.getMemberId());
        return ResponseEntity.ok("도움요청 게시글 삭제에 성공했습니다");
    }

    @Operation(summary = "도움 요청 게시글 수정 API", description = "도움 요청 게시글 수정 API")
    @PutMapping("/{helppost_id}")
    public ResponseEntity<HelpPostResponseDto> updateHelpPost(@PathVariable("helppost_id") Long helpPostId,
                                                              @MemberInfo MemberInfoDto memberInfoDto,
                                                              @Valid @RequestBody HelpPostRequestDto helpPostRequestDto) {
        HelpPostResponseDto helpPostInfo = helpPostInfoService.updateHelpPostInfo(helpPostId, memberInfoDto.getMemberId(), helpPostRequestDto);
        return ResponseEntity.ok(helpPostInfo);
    }

    @Operation(summary = "내가 요청한 도움 요청 게시글 리스트 API", description = "내가 요청한 도움 요청 게시글 리스트 API")
    @GetMapping("/registers") // 내가(IP) 작성한 모든 도움 요청 게시글 조회
    public ResponseEntity<MyHelpPostDto> searchMyHelpPost(@MemberInfo MemberInfoDto memberInfoDto) {
        MyHelpPostDto myHelpPostDto = helpPostInfoService.searchMyHelpPost(memberInfoDto.getMemberId());
        return ResponseEntity.ok(myHelpPostDto);
    }

    @Operation(summary = "현재 등록된 모든 도움 요청 게시글 리스트 API", description = "현재 등록된 모든 도움 요청 게시글 리스트 API")
    @GetMapping("") // 현재 등록된 모든 도움 요청 게시글 조회(helper)
    public ResponseEntity<HelperResponseDto> searchAllHelpPost(@MemberInfo MemberInfoDto memberInfoDto) {
        HelperResponseDto helperResponseDto = helpPostInfoService.searchHelperHelpPost(memberInfoDto.getMemberId());
        return ResponseEntity.ok(helperResponseDto);
    }

    @Operation(summary = "도움요청 게시글 상세 조회 API", description = "도움요청 게시글 상세 조회 API")
    @GetMapping("/{helppost_id}")
    public ResponseEntity<DetailHelpPostDto> searchAllHelpPost(@PathVariable("helppost_id") Long helpPostId,
                                                               @MemberInfo MemberInfoDto memberInfoDto) {
        DetailHelpPostDto detailHelpPostDto = helpPostInfoService.searchDetailHelpPost(helpPostId, memberInfoDto.getMemberId());
        return ResponseEntity.ok(detailHelpPostDto);
    }

}
