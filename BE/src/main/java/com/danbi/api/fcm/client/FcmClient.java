package com.danbi.api.fcm.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;

@FeignClient(url = "https://fcm.googleapis.com", name = "FcmClient")
public interface FcmClient {

    //TODO 프로젝트ID 넣기
    @PostMapping(value = "/v1/projects/danbi-1fa19/messages:send", consumes = "application/json")
    void sendDataMessage(@RequestHeader(HttpHeaders.CONNECTION) String contentType,
                         @RequestHeader(HttpHeaders.AUTHORIZATION) String accessToken,
                         @RequestBody String message
    );

}
