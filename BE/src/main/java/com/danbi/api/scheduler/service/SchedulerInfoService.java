package com.danbi.api.scheduler.service;

import com.danbi.api.scheduler.client.SchedulerClient;
import com.danbi.domain.helppost.service.HelpPostService;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class SchedulerInfoService {

    private final HelpPostService helpPostService;
    private final SchedulerClient schedulerClient;

    public void HelpPostScheduler() {
        helpPostService.deleteNotMatchedHelpPost();
    }

    @Scheduled(cron = "0 0 0 * * ?")
    public void sendEvent() {
        schedulerClient.requestHelpPostScheduler();
    }
}
