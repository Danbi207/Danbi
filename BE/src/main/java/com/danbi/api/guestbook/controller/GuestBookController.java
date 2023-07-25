package com.danbi.api.guestbook.controller;

import com.danbi.api.guestbook.dto.CommentDto;
import com.danbi.api.guestbook.dto.GuestBookResponseDto;
import com.danbi.api.guestbook.service.GuestBookCommentService;
import com.danbi.api.guestbook.service.GuestBookProfileService;
import com.danbi.global.resolver.MemberInfo;
import com.danbi.global.resolver.MemberInfoDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(name = "GuestBook", description = "방명록")
@RestController
@RequestMapping("/api/v1/profile/guestbook")
@RequiredArgsConstructor
public class GuestBookController {

    private final GuestBookProfileService guestBookProfileService;
    private final GuestBookCommentService guestBookCommentService;

    @Operation(summary = "해당 프로필의 방명록 조회 API", description = "프로필의 Id 값으로 해당 방명록 조회")
    @GetMapping("/{profileId}")
    public ResponseEntity<GuestBookResponseDto> getGuestBook(@PathVariable Long profileId) {
        GuestBookResponseDto guestBookResponseDto = guestBookProfileService.getGuestBook(profileId);
        return ResponseEntity.ok(guestBookResponseDto);
    }

    @Operation(summary = "방명록에 댓글 작성 API", description = "방명록의 Id 값으로 해당 방명록에 댓글 작성")
    // TODO: Swagger에 MemberInfoDto 보이는데 HttpHeader로 바꿔야 됨
    @PostMapping("/{guestBookId}")
    public ResponseEntity<CommentDto.Response> createComment(@PathVariable Long guestBookId,
                                                             @RequestBody CommentDto.Reqeust reqeust,
                                                             @MemberInfo MemberInfoDto memberInfoDto) {

        CommentDto.Response response = guestBookCommentService.saveComment(guestBookId, reqeust, memberInfoDto.getMemberId());
        return ResponseEntity.ok(response);
    }
}
