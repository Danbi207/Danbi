package com.danbi.api.alarm.service.impl;

import com.danbi.api.alarm.dto.request.RequestAlarmDto;
import com.danbi.api.alarm.dto.response.ResponseAlarmDto;
import com.danbi.api.alarm.dto.response.ResponseAlarmListDto;
import com.danbi.api.alarm.service.AlarmInfoService;
import com.danbi.domain.alarm.constant.State;
import com.danbi.domain.alarm.constant.Type;
import com.danbi.domain.alarm.entity.Alarm;
import com.danbi.domain.alarm.service.AlarmService;
import com.danbi.domain.member.service.MemberService;
import com.danbi.global.error.ErrorCode;
import com.danbi.global.error.exception.BusinessException;
import com.danbi.global.error.exception.MisMatchException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class AlarmInfoServiceImpl implements AlarmInfoService {

    private final AlarmService alarmService;
    private final MemberService memberService;

    //알림 목록조회
    @Override
    public ResponseAlarmListDto getAlarmList(Long memberId) {
        List<Alarm> list = alarmService.getMyAlarms(memberId);
        List<ResponseAlarmDto> alarmList = new ArrayList<>();

        for (Alarm result : list) {

            alarmList.add(ResponseAlarmDto.builder()
                    .alarmId(result.getId())
                    .fromName(memberService.findByMemberId(result.getFrom().getId()).getName())
                    .toName(memberService.findByMemberId(result.getTo().getId()).getName())
                    .title(result.getTitle())
                    .content(result.getContent())
                    .type(result.getType())
                    .createTime(result.getCreateTime())
                    .readFlag(result.getReadFlag())
                    .build());
        }

        return ResponseAlarmListDto.builder().alarmList(alarmList).build();
    }

    // 읽지 않은 알람 조회
    @Override
    public ResponseAlarmListDto getNotReadAlarm(Long memberId) {
        List<Alarm> list = alarmService.getNotReadAlarm(memberId);
        List<ResponseAlarmDto> alarmList = new ArrayList<>();

        for (Alarm result : list) {

            alarmList.add(ResponseAlarmDto.builder()
                    .alarmId(result.getId())
                    .fromName(memberService.findByMemberId(result.getFrom().getId()).getName())
                    .toName(memberService.findByMemberId(result.getTo().getId()).getName())
                    .title(result.getTitle())
                    .content(result.getContent())
                    .type(result.getType())
                    .createTime(result.getCreateTime())
                    .readFlag(result.getReadFlag())
                    .build());
        }
        return ResponseAlarmListDto.builder().alarmList(alarmList).build();
    }

    // 읽지 않는 알람 갯수 조회
    @Override
    public Long countNotReadAlarm(Long memberId) {
        return alarmService.countNotReadAlarm(memberId);
    }

    //알림 상세조회
    @Override
    public ResponseAlarmDto getAlarmDetail(Long memberId, Long alarmId) {
        Alarm result = alarmService.getAlarmById(memberId, alarmId);

        return ResponseAlarmDto.builder()
                .alarmId(result.getId())
                .fromName(memberService.findByMemberId(result.getFrom().getId()).getName())
                .toName(memberService.findByMemberId(result.getTo().getId()).getName())
                .title(result.getTitle())
                .content(result.getContent())
                .type(result.getType())
                .createTime(result.getCreateTime())
                .readFlag(result.getReadFlag())
                .build();
    }

    //알림 읽음처리
    @Transactional
    @Override
    public void readAlarm(Long memberId) {
        List<Alarm> list = alarmService.getNotReadAlarm(memberId);
        for (Alarm alarm : list) {
            alarm.updateReadAlarm();
        }
    }

    //알림 삭제처리
    @Transactional
    @Override
    public void deleteAlarm(Long memberId, Long alarmId) {
        Alarm findAlarm = alarmService.getAlarmById(memberId, alarmId);
        if (findAlarm.getTo().getId() == memberId) {
            alarmService.deleteAlarmByTo(memberId, alarmId);
        }
        if(findAlarm.getFrom().getId() == memberId) {
            alarmService.deleteAlarmByFrom(memberId, alarmId);
        }
    }


    //알림 생성
    @Transactional
    @Override
    public ResponseAlarmDto registerAlarm(Long memberId, RequestAlarmDto requestAlarmDto) {
        Alarm alarm = Alarm.builder()
                .from(memberService.findByMemberId(requestAlarmDto.getFromId()))
                .to(memberService.findByMemberId(requestAlarmDto.getToId()))
                .title(requestAlarmDto.getTitle())
                .readFlag(false)
                .state(State.ACTIVATE)
                .content(requestAlarmDto.getContent())
                .type(Type.from(requestAlarmDto.getType()))
                .build();

        Alarm saveAlarm = alarmService.savaAlarm(alarm);

        return ResponseAlarmDto.builder()
                .alarmId(saveAlarm.getId())
                .fromName(memberService.findByMemberId(saveAlarm.getFrom().getId()).getName())
                .toName(memberService.findByMemberId(saveAlarm.getTo().getId()).getName())
                .title(saveAlarm.getTitle())
                .content(saveAlarm.getContent())
                .type(saveAlarm.getType())
                .createTime(saveAlarm.getCreateTime())
                .readFlag(saveAlarm.getReadFlag())
                .build();
    }

    @Override
    public Integer deleteAllAlarm(Long memberId) {
        return alarmService.deleteAllAlarm(memberId);
    }


}
