package com.danbi.domain.accuse.repository;

import com.danbi.domain.accuse.constant.State;
import com.danbi.domain.accuse.entity.Accuse;
import com.danbi.domain.accuse.entity.QAccuse;
import com.danbi.domain.guestbook.entity.QGuestBook;
import com.danbi.domain.member.entity.QMember;
import com.danbi.domain.profile.entity.QProfile;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

import static com.danbi.domain.accuse.entity.QAccuse.accuse;
import static com.danbi.domain.guestbook.entity.QGuestBook.guestBook;
import static com.danbi.domain.member.entity.QMember.member;
import static com.danbi.domain.profile.entity.QProfile.profile;

@RequiredArgsConstructor
public class AccuseRepositoryImpl implements  AccuseRepositoryCustom{

    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public List<Accuse> checkAccuseTime(LocalDateTime time) {
        return jpaQueryFactory.selectFrom(accuse)
                .join(accuse.targetMember ,member).fetchJoin()
                .where(
                        accuse.state.eq(State.APPROVAL),
                        accuse.updateTime.before(time)
                ).fetch();
    }

}
