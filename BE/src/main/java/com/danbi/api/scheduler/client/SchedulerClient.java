package com.danbi.api.scheduler.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

@FeignClient(url = "http://localhost:8080/api/v1", name = "schedulerClient")
public interface SchedulerClient {

    @GetMapping(value = "/scheduler/help-post")
    void requestScheduler();
}
