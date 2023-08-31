package com.danbi.api.guestbook.controller;

import com.danbi.api.ApiResponse;
import com.danbi.api.guestbook.dto.CommentDto;
import com.danbi.api.guestbook.dto.CommentModifyDto;
import com.danbi.api.guestbook.dto.GuestBookResponseDto;
import com.danbi.api.guestbook.service.GuestBookCommentService;
import com.danbi.api.guestbook.service.GuestBookProfileService;
import com.danbi.global.resolver.memberinfo.MemberInfo;
import com.danbi.global.resolver.memberinfo.MemberInfoDto;
import com.danbi.global.resolver.paging.LimitedSizePagination;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@Tag(name = "GuestBook", description = "방명록")
@RestController
@RequestMapping("/api/v1/profile/guestbook")
@RequiredArgsConstructor
public class GuestBookController {

    private final GuestBookProfileService guestBookProfileService;
    private final GuestBookCommentService guestBookCommentService;

    @Operation(summary = "해당 프로필의 방명록 조회 API", description = "프로필의 Id 값으로 해당 방명록 조회")
    @GetMapping("/{profileId}")
    @LimitedSizePagination
    public ApiResponse<GuestBookResponseDto> getGuestBook(@PathVariable Long profileId,
                                                          @PageableDefault(size = 100,
                                                                  sort = "createTime",
                                                                  direction = Sort.Direction.DESC) Pageable pageable) {
        GuestBookResponseDto guestBookResponseDto = guestBookProfileService.getGuestBook(profileId, pageable);
        return ApiResponse.ok(guestBookResponseDto);
    }

    @Operation(summary = "방명록에 댓글 작성 API", description = "방명록의 Id 값으로 해당 방명록에 댓글 작성")
    // TODO: Swagger에 MemberInfoDto 보이는데 HttpHeader로 바꿔야 됨
    @PostMapping("/{guestBookId}")
    public ApiResponse<CommentDto.Response> createComment(@PathVariable Long guestBookId,
                                                          @Valid @RequestBody CommentDto.Request request,
                                                          @MemberInfo MemberInfoDto memberInfoDto) {

        CommentDto.Response response = guestBookCommentService.saveComment(guestBookId, request, memberInfoDto.getMemberId());
        return ApiResponse.ok(response);
    }

    @Operation(summary = "댓글 수정 API", description = "댓글 작성자가 자신의 댓글 수정")
    @PostMapping("/{guestbookId}/{commentId}")
    public ApiResponse<CommentModifyDto.Response> modifyComment(@PathVariable("guestbookId") Long guestBookId,
                                                          @PathVariable Long commentId,
                                                          @Valid @RequestBody CommentModifyDto.Request request,
                                                          @MemberInfo MemberInfoDto memberInfoDto) {
        CommentModifyDto.Response response = guestBookCommentService.modifyComment(memberInfoDto.getMemberId(), commentId, request);
        return ApiResponse.ok(response);
    }

    @DeleteMapping("/{guestbookId}/{commentId}")
    public ApiResponse<String> deleteComment(@PathVariable("guestbookId") Long guestBookId,
                                                @PathVariable Long commentId,
                                                @MemberInfo MemberInfoDto memberInfoDto) {
        guestBookCommentService.deleteComment(memberInfoDto.getMemberId(), guestBookId, commentId);
        return ApiResponse.ok("댓글 삭제 성공했습니다.");
    }
}
