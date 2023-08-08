package com.danbi.api.alarm.service;

import com.danbi.api.alarm.dto.request.RequestAlarmDto;
import com.danbi.domain.alarm.entity.Alarm;

import java.util.List;

public interface AlarmInfoService {

    //알림 목록조회
    List<Alarm> getAlarmList(Long memberId);

    // 읽지 않은 알람 조회
    List<Alarm> getNotReadAlarm(Long memberId);

    // 읽지 않는 알람 갯수 조회
    Long countNotReadAlarm(Long memberId);

    //알림 상세조회
    Alarm getAlarmDetail(Long memberId, Long alarmId);

    //알림 읽음처리
    void readAlarm(Long memberId, Long alarmId);

    //알림 삭제처리
    void deleteAlarm(Long memberId, Long alarmId);

    //알림 생성
    Alarm registerAlarm(Long memberId, RequestAlarmDto requestAlarmDto);


}