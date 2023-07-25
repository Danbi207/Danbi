package com.danbi.api.fcm.controller;

import com.danbi.api.fcm.service.FcmService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@Slf4j
@RestController
@RequiredArgsConstructor
public class FcmController {

    private final FcmService fcmService;

    @PostMapping("/token")
    public String registToken(String token) {
        fcmService.saveToken("user1",token);
        return "'"+token+"'" ;
    }

    @PostMapping("/sendMessageTo")
    public void sendMessageTo(String token, String title, String body) throws IOException {
        fcmService.sendMessageTo(token, title, body);
    }

}
