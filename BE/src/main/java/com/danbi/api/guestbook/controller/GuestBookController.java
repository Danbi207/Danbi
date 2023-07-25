package com.danbi.api.guestbook.controller;

import com.danbi.api.guestbook.dto.GuestBookResponseDto;
import com.danbi.api.guestbook.service.GuestBookProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/profile/guestbook")
@RequiredArgsConstructor
public class GuestBookController {

    private final GuestBookProfileService guestBookProfileService;

    @GetMapping("/{profileId}")
    public ResponseEntity<GuestBookResponseDto> getGuestBook(@PathVariable Long profileId) {
        GuestBookResponseDto guestBookResponseDto = guestBookProfileService.getGuestBook(profileId);
        return ResponseEntity.ok(guestBookResponseDto);
    }
}
