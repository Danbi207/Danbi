package com.danbi.api.test.health.dto;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class HealthCheckResponseDto {

    private String health;

    private List<String> activeProfiles;
}
