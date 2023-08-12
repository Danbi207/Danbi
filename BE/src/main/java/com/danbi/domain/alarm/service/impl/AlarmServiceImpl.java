package com.danbi.domain.alarm.service.impl;

import com.danbi.domain.alarm.constant.State;
import com.danbi.domain.alarm.entity.Alarm;
import com.danbi.domain.alarm.repository.AlarmRepository;
import com.danbi.domain.alarm.service.AlarmService;
import com.danbi.domain.member.entity.Member;
import com.danbi.domain.member.service.MemberService;
import com.danbi.global.error.ErrorCode;
import com.danbi.global.error.exception.AlarmNotFoundException;
import com.danbi.global.error.exception.BusinessException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class AlarmServiceImpl implements AlarmService {

    @PersistenceContext
    private EntityManager em;
    private final AlarmRepository alarmRepository;
    private final MemberService memberService;


    @Transactional
    @Override
    public Alarm savaAlarm(Alarm alarm) {
        return alarmRepository.save(alarm);
    }

    @Transactional
    @Override
    public Alarm updateAlarm(Long memberId, Long alarmId, Alarm alarm) {
        Alarm updatedAlarm = getAlarmById(memberId, alarmId);
        updatedAlarm.update(alarm);
        em.flush();
        return updatedAlarm;
    }

    @Transactional
    @Override
    public void deleteAlarm(Long memberId, Long alarmId) {
        Alarm deletedAlarm = getAlarmById(memberId, alarmId);
        deletedAlarm.delete();
    }

    @Transactional
    @Override
    public void deleteAlarmByFrom(Long memberId, Long alarmId) {
        Alarm deletedAlarm = getAlarmById(memberId, alarmId);
        deletedAlarm.deleteSender();
    }

    @Transactional
    @Override
    public void deleteAlarmByTo(Long memberId, Long alarmId) {
        Alarm deletedAlarm = getAlarmById(memberId, alarmId);
        deletedAlarm.deleteReceiver();
    }

    @Override
    public Alarm getAlarmById(Long memberId, Long alarmId) {
        Alarm findAlarm = getAlarmById(alarmId);
        if (memberId != findAlarm.getTo().getId() && memberId != findAlarm.getFrom().getId()) {
            throw new BusinessException(ErrorCode.FORBIDDEN_ALARM);
        }
        return findAlarm;
    }

    @Override
    public List<Alarm> getAlarmByFrom(Long memberId) {
        Member findMember = memberService.findByMemberId(memberId);
        return alarmRepository.findByFromAndStateNotAndStateNot(findMember, State.DESTROY, State.SENDER_DESTROY);
    }

    @Override
    public List<Alarm> getAlarmByTo(Long memberId) {
        Member findMember = memberService.findByMemberId(memberId);
        return alarmRepository.findByToAndStateNotAndStateNot(findMember, State.DESTROY, State.RECEIVER_DESTROY);
    }

    @Override
    public Alarm getAlarmById(Long alarmId) {
        return alarmRepository.findById(alarmId)
                .orElseThrow(() -> new AlarmNotFoundException(ErrorCode.ALARM_NOT_EXISTS));
    }

    @Override
    public Long countNotReadAlarm(Long memberId) {
        Member findMember = memberService.findByMemberId(memberId);
        return alarmRepository.countByReadFlagAndToAndStateNotAndStateNot(false, findMember, State.DESTROY, State.RECEIVER_DESTROY);
    }

    @Override
    public List<Alarm> getNotReadAlarm(Long memberId) {
        Member findMember = memberService.findByMemberId(memberId);
        return alarmRepository.findByReadFlagAndToAndStateNotAndStateNot(false, findMember, State.DESTROY, State.RECEIVER_DESTROY);
    }

    @Override
    public List<Alarm> getMyAlarms(Long memberId) {
        Member findMember = memberService.findByMemberId(memberId);
        return alarmRepository.findALLByFromOrTo(findMember);
    }

    @Override
    public Integer deleteAllAlarm(Long memberId) {
        Member findMember = memberService.findByMemberId(memberId);
        Integer deleteCnt = 0;
        deleteCnt += alarmRepository.updateDeleteReceiverAlarm(findMember);
        deleteCnt += alarmRepository.updateDeleteSenderAlarm(findMember);
        deleteCnt += alarmRepository.updateDeleteFromAlarm(findMember);
        deleteCnt += alarmRepository.updateDeleteToAlarm(findMember);
        return deleteCnt;
    }

}
