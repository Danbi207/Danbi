package com.danbi.api.scheduler.service;

import com.danbi.api.scheduler.client.SchedulerClient;
import com.danbi.domain.accuse.service.AccuseService;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class AccuseStackInfoService {

    private final AccuseService accuseService;

    private final SchedulerClient schedulerClient;

    public void checkAccuseStack() {
        accuseService.checkAccuseTime();
    }

    @Scheduled(cron = "0 0 0 * * ?")
    public void sendEvent() {
        schedulerClient.requestAccuseScheduler();
    }
}
