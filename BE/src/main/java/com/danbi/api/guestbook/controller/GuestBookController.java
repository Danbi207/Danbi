package com.danbi.api.guestbook.controller;

import com.danbi.api.guestbook.dto.GuestBookResponseDto;
import com.danbi.api.guestbook.service.GuestBookProfileService;
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

    @Operation(summary = "해당 프로필의 방명록 조회 API", description = "프로필의 Id 값으로 해당 방명록 조회")
    @GetMapping("/{profileId}")
    public ResponseEntity<GuestBookResponseDto> getGuestBook(@PathVariable Long profileId) {
        GuestBookResponseDto guestBookResponseDto = guestBookProfileService.getGuestBook(profileId);
        return ResponseEntity.ok(guestBookResponseDto);
    }
}
