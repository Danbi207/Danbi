package com.danbi.domain.helppost.repository;


import com.danbi.domain.helppost.dto.HelpPostFaceDto;
import com.danbi.domain.helppost.dto.HelpPostQueryDto;
import com.danbi.domain.helppost.entity.HelpPost;
import com.danbi.domain.helppost.entity.QHelpPost;
import com.danbi.domain.helppost.entity.QPositions;
import com.danbi.domain.member.entity.QMember;
import com.danbi.domain.point.entity.QPoint;
import com.danbi.domain.profile.entity.QProfile;
import com.querydsl.core.Tuple;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import java.util.List;

import static com.danbi.domain.helppost.entity.QHelpPost.helpPost;
import static com.danbi.domain.helppost.entity.QPositions.positions;
import static com.danbi.domain.member.entity.QMember.member;
import static com.danbi.domain.point.entity.QPoint.point;
import static com.danbi.domain.profile.entity.QProfile.profile;

@RequiredArgsConstructor
public class HelpPostRepositoryImpl implements HelpPostRepositoryCustom{

    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public List<HelpPostQueryDto> search(String longitude, String latitude) {
        return jpaQueryFactory.select(Projections.constructor(HelpPostQueryDto.class,
                        helpPost.id, member.id, member.name, member.profileUrl, helpPost.caution,
                        positions.longitude, positions.latitude,
                        helpPost.startTime, helpPost.endTime, helpPost.faceFlag,
                        point.accumulateDewPoint
                ))
                .from(helpPost)
                .innerJoin(helpPost.positions, positions)
                .leftJoin(helpPost.member, member)
                .leftJoin(member.profile, profile)
                .leftJoin(profile.point, point)
                .where(
                        positions.latitude.between(subtractFromString(latitude), plusFromString(latitude)),
                        positions.longitude.between(subtractFromString(longitude),plusFromString(longitude))
                )
                .fetch();
    }

    @Override
    public List<HelpPostFaceDto> searchFace(String longitude, String latitude) {
        return jpaQueryFactory.select(Projections.constructor(HelpPostFaceDto.class,
                        helpPost.id, member.id, member.name, member.profileUrl, helpPost.caution,
                        positions.longitude, positions.latitude, helpPost.startTime, helpPost.endTime, point.accumulateDewPoint))
                .from(helpPost)
                .innerJoin(helpPost.positions, positions)
                .leftJoin(helpPost.member, member)
                .leftJoin(member.profile, profile)
                .leftJoin(profile.point, point)
                .where(
                        positions.latitude.between(subtractFromString(latitude), plusFromString(latitude)),
                        positions.longitude.between(subtractFromString(longitude),plusFromString(longitude)),
                        helpPost.faceFlag.eq(true)
                )
                .fetch();
    }

    private String subtractFromString(String str) {
        double number = Double.parseDouble(str);
        double result = number - 0.05;
        return String.valueOf(result);
    }

    private String plusFromString(String str) {
        double number = Double.parseDouble(str);
        double result = number + 0.05;
        return String.valueOf(result);
    }

}
