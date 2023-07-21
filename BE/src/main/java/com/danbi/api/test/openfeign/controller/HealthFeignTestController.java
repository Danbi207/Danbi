package com.danbi.api.test.openfeign.controller;

import com.danbi.api.test.health.dto.HealthCheckResponseDto;
import com.danbi.api.test.openfeign.client.TestClient;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class HealthFeignTestController {

    private final TestClient testClient;

    @GetMapping("/health/feign-test")
    public ResponseEntity<HealthCheckResponseDto> healthCheckTest() {
        HealthCheckResponseDto healthCheckResponseDto = testClient.healthCheck();
        return ResponseEntity.ok(healthCheckResponseDto);
    }

}
