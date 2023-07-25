package com.danbi.api.test.openfeign.client;

import com.danbi.api.test.health.dto.HealthCheckResponseDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;

@FeignClient(url = "http://localhost:8080", name = "testClient")
public interface TestClient {

    @GetMapping(value = "/api/v1/health", consumes = "application/json")
    HealthCheckResponseDto healthCheck();
}
