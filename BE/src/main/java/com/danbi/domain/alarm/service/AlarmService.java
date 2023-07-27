package com.danbi.domain.alarm.service;

import com.danbi.domain.alarm.constant.Type;
import com.danbi.domain.alarm.entity.Alarm;

import java.util.List;

public interface AlarmService {

    Alarm savaAlarm(Alarm alarm);

    Alarm updateAlarm(Long alarmId, Alarm alarm);

    void deleteAlarm(Long memberId ,Long alarmId);

    Alarm getAlarmById(Long memberId, Long alarmId);

    List<Alarm> getAlarmByType(Long memberId , Type type);

    Alarm getAlarmById(Long alarmId);

}
