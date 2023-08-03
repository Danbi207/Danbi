package com.danbi.domain.member.repository;

import com.danbi.domain.member.dto.MemberInfoDto;
import com.danbi.domain.member.entity.QMember;
import com.danbi.domain.point.entity.QPoint;
import com.danbi.domain.profile.entity.QProfile;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import static com.danbi.domain.member.entity.QMember.member;
import static com.danbi.domain.point.entity.QPoint.point;
import static com.danbi.domain.profile.entity.QProfile.profile;

@RequiredArgsConstructor
public class MemberRepositoryImpl implements MemberRepositoryCustom{

    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public MemberInfoDto searchMember(Long memberId) {
        return jpaQueryFactory.select(Projections.constructor(MemberInfoDto.class,
                        member.id, profile.id, member.name, member.profileUrl,
                        member.accuseStack, point.accumulateDewPoint, point.dewPoint))
                .from(member)
                .innerJoin(member.profile, profile)
                .leftJoin(profile.point, point)
                .where(member.id.eq(memberId))
                .fetchOne();
    }
}
