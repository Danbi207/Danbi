package com.danbi.domain.member.repository;

import com.danbi.domain.member.constant.State;
import com.danbi.domain.member.dto.MemberDataDto;
import com.danbi.domain.member.dto.TotalBestMemberDto;
import com.danbi.domain.point.entity.QPoint;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import java.util.List;

import static com.danbi.domain.member.entity.QMember.member;
import static com.danbi.domain.point.entity.QPoint.point;
import static com.danbi.domain.profile.entity.QProfile.profile;

@RequiredArgsConstructor
public class MemberRepositoryImpl implements MemberRepositoryCustom{

    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public MemberDataDto searchMember(Long memberId) {
        return jpaQueryFactory.select(Projections.constructor(MemberDataDto.class,
                        member.id, profile.id, member.name, member.profileUrl,
                        member.gender))
                .from(member)
                .innerJoin(member.profile, profile)
                .where(member.id.eq(memberId))
                .fetchOne();
    }

    @Override
    public List<TotalBestMemberDto> searchTotalBestMembers() {
        return jpaQueryFactory.select(Projections.constructor(TotalBestMemberDto.class,
                member.id, profile.id, member.name, member.profileUrl, point.accumulateDewPoint
                ))
                .from(member)
                .innerJoin(member.profile, profile)
                .leftJoin(profile.point, point)
                .where(
                        member.state.eq(State.ACTIVATE)
                )
                .orderBy(point.accumulateDewPoint.desc())
                .limit(10)
                .fetch();
    }
}
