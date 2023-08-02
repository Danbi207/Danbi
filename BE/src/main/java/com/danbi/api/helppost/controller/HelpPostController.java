package com.danbi.api.helppost.controller;

import com.danbi.api.helppost.dto.HelpPostRequestDto;
import com.danbi.api.helppost.dto.HelpPostResponseDto;
import com.danbi.api.helppost.dto.detailmatched.DetailMatchedHelpPostDto;
import com.danbi.api.helppost.dto.detailsearch.DetailHelpPostDto;
import com.danbi.api.helppost.dto.helpersearch.face.HelperFaceHelpPostDto;
import com.danbi.api.helppost.dto.helpersearch.query.HelperQueryHelpPostDto;
import com.danbi.api.helppost.dto.mysearch.MyHelpPostDto;
import com.danbi.api.helppost.service.HelpPostInfoService;
import com.danbi.global.resolver.MemberInfo;
import com.danbi.global.resolver.MemberInfoDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

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

//    @Operation(summary = "현재 등록된 모든 도움 요청 게시글 리스트 API", description = "현재 등록된 모든 도움 요청 게시글 리스트 API")
//    @GetMapping("") // 현재 등록된 모든 도움 요청 게시글 조회(helper)
//    public ResponseEntity<HelperResponseDto> searchAllHelpPost(@MemberInfo MemberInfoDto memberInfoDto) {
//        HelperResponseDto helperResponseDto = helpPostInfoService.searchHelperHelpPost(memberInfoDto.getMemberId());
//        return ResponseEntity.ok(helperResponseDto);
//    }

    @Operation(summary = "도움요청 게시글 상세 조회 API", description = "도움요청 게시글 상세 조회 API")
    @GetMapping("/{helppost_id}")
    public ResponseEntity<DetailHelpPostDto> searchDetailHelpPost(@PathVariable("helppost_id") Long helpPostId,
                                                               @MemberInfo MemberInfoDto memberInfoDto) {
        DetailHelpPostDto detailHelpPostDto = helpPostInfoService.searchDetailQueryHelpPost(helpPostId, memberInfoDto.getMemberId());
        return ResponseEntity.ok(detailHelpPostDto);
    }

//    @Operation(summary = "도움요청 완료된 게시글 상세 조회 API", description = "도움요청 완료된 게시글 상세 조회 API")
//    @GetMapping("/matched/{helppost_id}")
//    public ResponseEntity<DetailMatchedHelpPostDto> searchDetailMatchedHelpPost(@PathVariable("helppost_id") Long helpPostId,
//                                                               @MemberInfo MemberInfoDto memberInfoDto) {
//        DetailMatchedHelpPostDto detailHelpPostDto = helpPostInfoService.searchDetailMatchedHelpPost(helpPostId, memberInfoDto.getMemberId());
//        return ResponseEntity.ok(detailHelpPostDto);
//    }

    @Operation(summary = "매칭된 도움, 도움 요청 게시글 쿼리 API", description = "매칭된 도움, 도움 요청 게시글 쿼리 API")
    @GetMapping("/matched/{helppost_id}") // 현재 등록된 모든 도움 대면 요청 게시글 조회(querydsl)
    public ResponseEntity<DetailMatchedHelpPostDto> searchMatchedHelpPost(@MemberInfo MemberInfoDto memberInfoDto,
                                                                             @PathVariable("helppost_id") Long helppostId) {
        DetailMatchedHelpPostDto matchedHelpPost = helpPostInfoService.searchMatchedHelpPost(helppostId);
        return ResponseEntity.ok(matchedHelpPost);
    }

    @Operation(summary = "현재 등록된 모든 도움 요청 게시글 쿼리 리스트 API", description = "현재 등록된 모든 도움 요청 게시글 쿼리 리스트 API")
    @GetMapping("/{longitude}/{latitude}") // 현재 등록된 모든 도움 요청 게시글 조회(querydsl)
    public ResponseEntity<List<HelperQueryHelpPostDto>> searchAllByQueryHelpPost(@MemberInfo MemberInfoDto memberInfoDto,
                                                                      @PathVariable String longitude,
                                                                      @PathVariable String latitude) {
        List<HelperQueryHelpPostDto> allHelpPosts = helpPostInfoService.searchQueryHelpPost(memberInfoDto.getMemberId(), longitude, latitude);
        return ResponseEntity.ok(allHelpPosts);
    }

    @Operation(summary = "현재 등록된 모든 대면 도움 요청 게시글 쿼리 리스트 API", description = "현재 등록된 모든 대면 도움 요청 게시글 쿼리 리스트 API")
    @GetMapping("/meet/{longitude}/{latitude}") // 현재 등록된 모든 도움 대면 요청 게시글 조회(querydsl)
    public ResponseEntity<List<HelperFaceHelpPostDto>> searchAllByFaceHelpPost(@MemberInfo MemberInfoDto memberInfoDto,
                                                                               @PathVariable String longitude,
                                                                               @PathVariable String latitude) {
        List<HelperFaceHelpPostDto> allHelpPosts = helpPostInfoService.searchFaceHelpPost(memberInfoDto.getMemberId(), longitude, latitude);
        return ResponseEntity.ok(allHelpPosts);
    }


}
