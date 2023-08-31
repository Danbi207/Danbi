package com.danbi.domain.alarm.repository;

import com.danbi.domain.alarm.constant.State;
import com.danbi.domain.alarm.constant.Type;
import com.danbi.domain.alarm.entity.Alarm;
import com.danbi.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface AlarmRepository extends JpaRepository<Alarm, Long> {

    List<Alarm> findByFromAndStateNotAndStateNot(Member from, State state1, State state2);

    List<Alarm> findByToAndStateNotAndStateNot(Member to, State state1, State state2);

    @Query(nativeQuery = true,
            value =
            "SELECT * FROM (" +
                    "select * from alarm a1 where a1.from_member_id = :member  AND a1.state = 'ACTIVATE' AND a1.state <> 'SENDER_DESTROY' "+
            " union select * from alarm a2 where a2.to_member_id = :member AND a2.state = 'ACTIVATE' AND a2.state <> 'RECEIVER_DESTROY')e order by e.alarm_id DESC ; ; "
            )
    List<Alarm> findALLByFromOrTo(@Param("member") Member member);
    @Transactional
    @Modifying(clearAutomatically = true, flushAutomatically = true)
    @Query("UPDATE Alarm a SET a.state = 'SENDER_DESTROY' WHERE a.from = :member AND a.state = 'ACTIVATE' ")
    Integer updateDeleteFromAlarm(@Param("member")Member member);
    @Transactional
    @Modifying(clearAutomatically = true, flushAutomatically = true)
    @Query("UPDATE Alarm a SET a.state = 'DESTROY' WHERE a.from = :member AND a.state = 'RECEIVER_DESTROY'")
    Integer updateDeleteSenderAlarm(@Param("member")Member member);
    @Transactional
    @Modifying(clearAutomatically = true, flushAutomatically = true)
    @Query("UPDATE Alarm a SET a.state = 'RECEIVER_DESTROY' WHERE a.to = :member AND a.state = 'ACTIVATE' ")
    Integer updateDeleteToAlarm(@Param("member")Member member);

    @Transactional
    @Modifying(clearAutomatically = true, flushAutomatically = true)
    @Query("UPDATE Alarm a SET a.state = 'DESTROY' WHERE a.to = :member AND a.state = 'SENDER_DESTROY'")
    Integer updateDeleteReceiverAlarm(@Param("member")Member member);

    Long countByReadFlagAndToAndStateNotAndStateNot(boolean readFlag, Member member, State state1, State state2);

    List<Alarm> findByReadFlagAndToAndStateNotAndStateNot(boolean readFlag, Member member, State state1, State state2);
}
