package com.danbi.api.alarm.service.impl;

import com.danbi.api.alarm.dto.request.RequestAlarmDto;
import com.danbi.api.alarm.service.AlarmInfoService;
import com.danbi.domain.alarm.entity.Alarm;
import com.danbi.domain.alarm.service.AlarmService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Stream;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class AlarmInfoServiceImpl implements AlarmInfoService {

    private final AlarmService alarmService;

    //알림 목록조회
    @Override
    public List<Alarm> getAlarmList(Long memberId) {

        return null;
    }

    // 읽지 않은 알람 조회
    @Override
    public List<Alarm> getNotReadAlarm(Long memberId) {
        return null;
    }

    // 읽지 않는 알람 갯수 조회
    @Override
    public Long countNotReadAlarm(Long memberId) {
        return null;
    }

    //알림 상세조회
    @Override
    public Alarm getAlarmDetail(Long memberId, Long alarmId) {
        return null;
    }

    //알림 읽음처리
    @Override
    public void readAlarm(Long memberId, Long alarmId) {

    }

    //알림 삭제처리
    @Override
    public void deleteAlarm(Long memberId, Long alarmId) {

    }

    //알림 생성
    @Override
    public Alarm registerAlarm(Long memberId, RequestAlarmDto requestAlarmDto) {
        return null;
    }
}
