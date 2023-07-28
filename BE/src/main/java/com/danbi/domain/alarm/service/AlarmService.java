package com.danbi.domain.alarm.service;

import com.danbi.domain.alarm.constant.Type;
import com.danbi.domain.alarm.entity.Alarm;

import java.util.List;

public interface AlarmService {

    List<Alarm> getAlarmList(Long memberId);

    Alarm savaAlarm(Alarm alarm);

    Alarm updateAlarm(Long memberId, Long alarmId, Alarm alarm);

    void deleteAlarm(Long memberId, Long alarmId);

    void deleteAlarmByFrom(Long memberId, Long alarmId);

    void deleteAlarmByTo(Long memberId, Long alarmId);

    Alarm getAlarmById(Long memberId, Long alarmId);

    List<Alarm> getAlarmByFrom(Long memberId);

    List<Alarm> getAlarmByTo(Long memberId);

    Alarm getAlarmById(Long alarmId);

    Long countNotReadAlarm(Long memberId);

    List<Alarm> getNotReadAlarm(Long memberId);
}
