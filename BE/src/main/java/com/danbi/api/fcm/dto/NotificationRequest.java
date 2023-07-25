package com.danbi.api.fcm.dto;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class NotificationRequest {

    private String title;
    private String message;
    private String token;

    @Builder
    public NotificationRequest(String title, String message, String token) {
        this.title = title;
        this.message = message;
        this.token = token;
    }
}
