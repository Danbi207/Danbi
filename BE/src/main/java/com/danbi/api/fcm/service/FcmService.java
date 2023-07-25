package com.danbi.api.fcm.service;

import com.danbi.api.fcm.client.FcmClient;
import com.danbi.api.fcm.dto.FcmMessage;
import com.danbi.api.fcm.dto.NotificationRequest;
import com.danbi.api.fcm.repository.FcmTokenRepository;
import com.danbi.global.jwt.constant.GrantType;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.messaging.FirebaseMessaging;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Arrays;

@Slf4j
@Service
@RequiredArgsConstructor
public class FcmService {

    private final FcmTokenRepository fcmTokenRepository;
    private final FcmClient fcmClient;
    private final ObjectMapper objectMapper;
    private final String CONTENT_TYPE = "application/x-www-form-urlencoded;charset=utf8";


    public void saveToken(String email, String token) {
        fcmTokenRepository.saveToken(email, token);
    }

    public void deleteToken(String email) {
        fcmTokenRepository.deleteToken(email);
    }

    public boolean hasKey(String email) {
        return fcmTokenRepository.hasKey(email);
    }

    public String getToken(String email) {
        return fcmTokenRepository.getToken(email);
    }

    public void sendMessageTo(String targetToken, String title, String body) throws IOException {

        String message = makeMessage(targetToken, title, body);
        fcmClient.sendDataMessage(CONTENT_TYPE,
                GrantType.BEARER.getType() + " " + getAccessToken(),message);
//                GrantType.BEARER.getType() + " " + targetToken,message);
    }

    //FCM에 push 요청을 보낼 때 인증을 위해 Header에 포함시킬 AccessToken 생성
    private String getAccessToken() throws IOException {
        String firebaseConfigPath = "firebase/firebase_service_key.json";

        // GoogleApi를 사용하기 위해 oAuth2를 이용해 인증한 대상을 나타내는객체
        GoogleCredentials googleCredentials = GoogleCredentials
                // 서버로부터 받은 service key 파일 활용
                .fromStream(new ClassPathResource(firebaseConfigPath).getInputStream())
                // 인증하는 서버에서 필요로 하는 권한 지정
                .createScoped(Arrays.asList("https://www.googleapis.com/auth/cloud-platform"));

        googleCredentials.refreshIfExpired();
        String token = googleCredentials.getAccessToken().getTokenValue();

        return token;
    }

    //FCM 알림 메시지 생성
    private String makeMessage(String targetToken, String title, String body) throws JsonProcessingException {
        FcmMessage.Notification noti = new FcmMessage.Notification(title, body, null);
        FcmMessage.Message message = new FcmMessage.Message(noti, targetToken);
        FcmMessage fcmMessage = new FcmMessage(false, message);

        return objectMapper.writeValueAsString(fcmMessage);
    }

}
