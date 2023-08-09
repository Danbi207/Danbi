package com.danbi.api.scheduler.controller;

import com.danbi.api.ApiResponse;
import com.danbi.api.profile.dto.ProfileResponseDto;
import com.danbi.api.scheduler.service.SchedulerInfoService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/scheduler")
public class SchedulerController {

    private final SchedulerInfoService schedulerInfoService;

    @GetMapping("/help-post")
    public ApiResponse<String> searchProfile() {
        schedulerInfoService.HelpPostScheduler();
        return ApiResponse.ok("Success Scheduler");
    }
}
