package com.danbi.domain.fcm.controller;

import com.danbi.domain.fcm.dto.NotificationRequest;
import com.danbi.domain.fcm.service.FcmService;
import com.danbi.global.resolver.memberinfo.MemberInfo;
import com.danbi.global.resolver.memberinfo.MemberInfoDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@Slf4j
@RestController
@RequiredArgsConstructor
public class FcmController {

    private final FcmService fcmService;

    @PostMapping("/token")
    public String registerToken(@MemberInfo MemberInfoDto memberInfoDto, @RequestBody String FcmToken) {
        fcmService.saveToken(memberInfoDto.getMemberId(), FcmToken);
        return "'" + FcmToken + "'";
    }

    @PostMapping("/sendMessageTo")
    public void sendMessageTo(@RequestBody NotificationRequest notificationRequest) throws IOException {
        fcmService.sendMessageTo(notificationRequest);
    }

}
