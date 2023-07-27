package com.danbi.domain.alarm.service.impl;

import com.danbi.domain.alarm.constant.State;
import com.danbi.domain.alarm.constant.Type;
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

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import java.util.List;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class AlarmServiceImpl implements AlarmService {

    @PersistenceContext
    private final EntityManager em;
    private final AlarmRepository alarmRepository;
    private final MemberService memberService;

    @Override
    public Alarm savaAlarm(Alarm alarm) {
        return alarmRepository.save(alarm);
    }

    @Override
    public Alarm updateAlarm(Long alarmId, Alarm alarm) {
        Alarm updatedAlarm = getAlarmById(alarmId);
        updatedAlarm.update(alarm);
        em.flush();
        return updatedAlarm;
    }

    @Override
    public void deleteAlarm(Long memberId, Long alarmId) {
        Alarm deletedAlarm = getAlarmById(memberId, alarmId);
        deletedAlarm.delete();
    }

    @Override
    public Alarm getAlarmById(Long memberId, Long alarmId) {
        Alarm findAlarm = getAlarmById(alarmId);
        if (memberId != findAlarm.getMember().getId()) {
            throw new BusinessException(ErrorCode.FORBIDDEN_ALARM);
        }
        return findAlarm;
    }

    @Override
    public List<Alarm> getAlarmByType(Long memberId, Type type) {
        Member findMember = memberService.findByMemberId(memberId);
        List<Alarm> findAlarm = alarmRepository.findByMemberAndTypeAndState(findMember, type, State.ACTIVATE);
        return findAlarm;
    }

    @Override
    public Alarm getAlarmById(Long alarmId) {
        return alarmRepository.findById(alarmId)
                .orElseThrow(() -> new AlarmNotFoundException(ErrorCode.ALARM_NOT_EXISTS))
                ;
    }

}
