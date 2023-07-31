package com.danbi.domain.alarm.repository;

import com.danbi.domain.alarm.constant.State;
import com.danbi.domain.alarm.constant.Type;
import com.danbi.domain.alarm.entity.Alarm;
import com.danbi.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AlarmRepository extends JpaRepository<Alarm, Long> {

    List<Alarm> findByFromAndStateNotAndStateNot(Member from, State state1, State state2);

    List<Alarm> findByToAndStateNotAndStateNot(Member to, State state1, State state2);

    @Query(nativeQuery = true,
            value =
            "SELECT * FROM (" +
                    "select * from Alarm a1 where a1.from_member_id = :member  AND a1.state = 'ACTIVATE' OR a1.state = 'RECEIVER_DESTROY' "+
            " union select * from Alarm a2 where a2.to_member_id =:member AND a2.state = 'ACTIVATE' OR a2.state = 'SENDER_DESTROY') e" +
                    " order by e.id DESC ; "
            )
    List<Alarm> findALLByFromOrTo(@Param("member") Member member);

    Long countByReadFlagAndToAndStateNotAndStateNot(boolean readFlag, Member member, State state1, State state2);

    List<Alarm> findByReadFlagAndToAndStateNotAndStateNot(boolean readFlag, Member member, State state1, State state2);
}
