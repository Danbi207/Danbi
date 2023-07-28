package com.danbi.domain.alarm.repository;

import com.danbi.domain.alarm.constant.State;
import com.danbi.domain.alarm.constant.Type;
import com.danbi.domain.alarm.entity.Alarm;
import com.danbi.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AlarmRepository extends JpaRepository<Alarm, Long> {

    List<Alarm> findByFromAndStateNotAndStateNot(Member from, State state1, State state2);

    List<Alarm> findByToAndStateNotAndStateNot(Member to, State state1, State state2);

//    @Query(nativeQuery = true, value = "select * from (" +
//            "select * from Alarm a1 where union " +
//            ""  +
//            ")")
//    List<Alarm> findALLByFromOrTo(Member from, Member to, State state1, State state2);

    Long countByReadFlagAndToAndStateNotAndStateNot(boolean readFlag, Member member, State state1, State state2);

    List<Alarm> findByReadFlagAndToAndStateNotAndStateNot(boolean readFlag, Member member, State state1, State state2);
}
