package com.danbi.domain.fcm.service;

import com.danbi.domain.fcm.client.FcmClient;
import com.danbi.domain.fcm.dto.NotificationRequest;
import com.danbi.domain.fcm.repository.FcmTokenRepository;
import com.danbi.domain.member.entity.Member;
import com.danbi.domain.member.service.MemberService;
import com.danbi.global.error.ErrorCode;
import com.danbi.global.error.exception.BusinessException;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.messaging.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;
import java.io.IOException;
import java.util.Arrays;
import java.util.concurrent.ExecutionException;

@Slf4j
@Service
@RequiredArgsConstructor
public class FcmService {

    private final FcmTokenRepository fcmTokenRepository;
    private final FcmClient fcmClient;
    private final ObjectMapper objectMapper;
    private final MemberService memberService;
    private final String CONTENT_TYPE = "application/x-www-form-urlencoded;charset=utf8";

    public void saveToken(Long memberId, String token) {
        Member member = memberService.findByMemberId(memberId);
        fcmTokenRepository.saveToken(member.getEmail(), token);
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

    public void sendMessageTo(NotificationRequest notificationRequest) throws IOException, ExecutionException, InterruptedException {
        if(!hasKey(notificationRequest.getEmail())){
            throw new BusinessException(ErrorCode.NOT_EXIST_FCM_TOKEN);
        }

        String targetToken = getToken(notificationRequest.getEmail());
        Message message = makeMessage(targetToken, notificationRequest.getTitle(), notificationRequest.getMessage());
        String response = FirebaseMessaging.getInstance().sendAsync(message).get();
        log.info("SentMessage : {}", response);
//        fcmClient.sendDataMessage(CONTENT_TYPE,
//                GrantType.BEARER.getType() + " " + getAccessToken(),message);
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
    private Message makeMessage(String targetToken, String title, String body) throws JsonProcessingException {


//        FcmMessage.Notification noti = new FcmMessage.Notification(title, body, null);
//        FcmMessage.Message message = new FcmMessage.Message(noti, targetToken);
//        FcmMessage fcmMessage = new FcmMessage(false, message);

        Message message = Message.builder()
                .setToken(targetToken)
                .setWebpushConfig(WebpushConfig.builder().putHeader("ttl", "300")
                        .setNotification(new WebpushNotification(title, body, "https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1567061659/noticon/zsflwysrgmkd14jwwe7v.png"))
                        .setFcmOptions(WebpushFcmOptions.builder()
                                .build())
                        .build()
                )
                .build();
        return message;
    }




}
