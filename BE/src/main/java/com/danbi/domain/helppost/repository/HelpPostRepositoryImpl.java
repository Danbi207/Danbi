package com.danbi.domain.helppost.repository;


import com.danbi.domain.help.entity.QHelp;
import com.danbi.domain.helppost.constant.State;
import com.danbi.domain.helppost.dto.*;
import com.danbi.domain.helppost.entity.HelpPost;
import com.danbi.domain.helppost.entity.QHelpPost;
import com.danbi.domain.helppost.entity.QPositions;
import com.danbi.domain.member.constant.Gender;
import com.danbi.domain.member.entity.QMember;
import com.danbi.domain.point.entity.QPoint;
import com.danbi.domain.profile.entity.QProfile;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.NumberExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;


import static com.danbi.domain.help.entity.QHelp.help;
import static com.danbi.domain.helppost.entity.QHelpPost.helpPost;
import static com.danbi.domain.helppost.entity.QPositions.positions;
import static com.danbi.domain.member.entity.QMember.member;
import static com.danbi.domain.point.entity.QPoint.point;
import static com.danbi.domain.profile.entity.QProfile.profile;

@RequiredArgsConstructor
public class HelpPostRepositoryImpl implements HelpPostRepositoryCustom{

    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public List<HelpPostQueryDto> search(String gender) {
        return jpaQueryFactory.select(Projections.constructor(HelpPostQueryDto.class,
                        helpPost.id, member.id, member.name, member.profileUrl, helpPost.content,
                        positions.longitude, positions.latitude, helpPost.startTime, helpPost.endTime,
                        helpPost.emergencyFlag, member.accuseStack
                ))
                .from(helpPost)
                .innerJoin(helpPost.positions, positions)
                .leftJoin(helpPost.member, member)
                .leftJoin(member.profile, profile)
                .where(
                        helpPost.faceFlag.eq(false),
                        helpPost.state.eq(State.ACTIVATE),
                        searchByGender(gender)
                )
                .fetch();
    }

    @Override
    public List<HelpPostFaceDto> searchFace(String longitude, String latitude, String gender) {
        return jpaQueryFactory.select(Projections.constructor(HelpPostFaceDto.class,
                        helpPost.id, member.id, member.name, member.profileUrl, helpPost.content,
                        positions.meetLongitude, positions.meetLatitude, positions.meetAddr,
                        helpPost.startTime, helpPost.endTime, helpPost.emergencyFlag ,member.accuseStack))
                .from(helpPost)
                .innerJoin(helpPost.positions, positions)
                .leftJoin(helpPost.member, member)
                .leftJoin(member.profile, profile)
                .where(
                        positions.meetLatitude.between(subtractFromString(latitude), plusFromString(latitude)),
                        positions.meetLongitude.between(subtractFromString(longitude),plusFromString(longitude)),
                        helpPost.faceFlag.eq(true),
                        helpPost.state.eq(State.ACTIVATE),
                        searchByGender(gender)
                )
                .fetch();
    }

    private BooleanExpression searchByGender(String gender) {
        if (gender.equals("male")) {
            return helpPost.genderFlag.eq(false).or(helpPost.member.gender.eq(Gender.male));
        }
        return helpPost.genderFlag.eq(false).or(helpPost.member.gender.eq(Gender.female));
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


    @Override
    public Optional<HelpPostDetailQeuryDto> searchDetail(Long helpPostId) {
        HelpPostDetailQeuryDto helpPostDetailQeuryDto = jpaQueryFactory.select(Projections.constructor(HelpPostDetailQeuryDto.class,
                        helpPost.id, member.id, member.name, member.profileUrl, point.accumulateDewPoint,
                        member.accuseStack, positions.latitude, positions.longitude, positions.addr,
                        positions.destLatitude, positions.destLongitude, positions.destAddr,
                        positions.meetLatitude, positions.destLongitude, positions.meetAddr,
                        helpPost.genderFlag, helpPost.faceFlag, helpPost.emergencyFlag, helpPost.content,
                        helpPost.startTime, helpPost.endTime, helpPost.caution, helpPost.category))
                .from(helpPost)
                .innerJoin(helpPost.positions, positions)
                .leftJoin(helpPost.member, member)
                .leftJoin(member.profile, profile)
                .leftJoin(point).on(profile.eq(point.profile))
                .where(
                        helpPost.id.eq(helpPostId),
                        helpPost.state.ne(State.DELETE)
                )
                .fetchOne();
        return Optional.ofNullable(helpPostDetailQeuryDto);
    }


    @Override
    public HelpPostMatchedDto searchMatchedDetail(Long helpPostId) {

        QMember ipMember = new QMember("ipMember");
        QMember helperMember = new QMember("helperMember");
        QProfile ipProfile = new QProfile("ipProfile");
        QProfile helperProfile = new QProfile("helperProfile");
        QPoint ipPoint = new QPoint("ipPoint");
        QPoint helperPoint = new QPoint("helperPoint");

        return jpaQueryFactory.select(Projections.constructor(HelpPostMatchedDto.class,
                        help.id, helpPost.id, helpPost.state,
                        ipMember.id, ipMember.name, ipMember.profileUrl,
                        ipPoint.accumulateDewPoint, ipMember.accuseStack,

                        helperMember.id, helperMember.name, helperMember.profileUrl,
                        helperPoint.accumulateDewPoint, helperMember.accuseStack,

                        positions.latitude, positions.longitude, positions.addr,
                        positions.destLatitude, positions.destLongitude, positions.destAddr,
                        positions.meetLatitude, positions.destLongitude, positions.meetAddr,

                        helpPost.faceFlag, helpPost.emergencyFlag, helpPost.content,
                        helpPost.startTime, helpPost.endTime, helpPost.caution, helpPost.category))
                .from(helpPost)
                .innerJoin(helpPost.positions, positions)
                .leftJoin(help).on(helpPost.eq(help.helpPost))
                .leftJoin(helpPost.member, ipMember)
                .leftJoin(ipMember.profile, ipProfile)
                .leftJoin(ipPoint).on(ipProfile.eq(ipPoint.profile))

                .leftJoin(help.helper, helperMember)
                .leftJoin(helperMember.profile, helperProfile)
                .leftJoin(helperProfile.point, helperPoint)
                .leftJoin(helperPoint).on(helperProfile.eq(helperPoint.profile))
                .where(
                        helpPost.id.eq(helpPostId),
                        helpPost.state.eq(State.MATCHED)
                )
                .fetchOne();
    }

    @Override
    public List<HelpPost> findHelpPostsByBetweenTime(LocalDateTime startTime, LocalDateTime endTime, Long memberId) {
        return jpaQueryFactory.selectFrom(helpPost)
                .where(helpPost.startTime.between(startTime,endTime)
                                .or(helpPost.endTime.between(startTime,endTime)),
                        helpPost.member.id.eq(memberId),
                        helpPost.state.notIn(State.DELETE,State.COMPLETED)
                        )
                .fetch();
    }

    @Override
    public List<HelpPostByMonthDto> findHelpPostByMonth(LocalDate time, Long memberId) {

        LocalDateTime startTime = LocalDateTime.of(time.getYear(), time.getMonth(), 1, 0, 0, 0);
        LocalDateTime endTime = startTime.plusMonths(1).minusSeconds(1);
        QMember ipMember = new QMember("ipMember");
        QMember helperMember = new QMember("helperMember");

        return jpaQueryFactory.select(Projections.constructor(HelpPostByMonthDto.class,
                        helpPost.id, profile.id, helpPost.content,
                        helpPost.startTime, helpPost.endTime, helpPost.state))
                .from(helpPost)
                .innerJoin(help).on(helpPost.eq(help.helpPost))
                .leftJoin(helpPost.member, ipMember)
                .leftJoin(help.helper, helperMember)
                .leftJoin(helperMember.profile, profile)
                .where(helpPost.startTime.between(startTime,endTime),
                        ipMember.id.eq(memberId),
                        helpPost.state.ne(State.DELETE))
                .fetch();
    }

    @Override
    public List<HelpPost> findHelpPostByNowTime(LocalDateTime time, Long memberId) {

        List<HelpPost> helpPost = jpaQueryFactory.selectFrom(QHelpPost.helpPost)
                .innerJoin(help).on(QHelpPost.helpPost.eq(help.helpPost))
                .leftJoin(QHelpPost.helpPost.positions, positions).fetchJoin()
                .where(
                        help.helper.id.eq(memberId),
                        QHelpPost.helpPost.state.eq(State.MATCHED),
                        QHelpPost.helpPost.startTime.before(time),
                        QHelpPost.helpPost.endTime.after(time)
                ).fetch();
        return helpPost;
    }

    @Override
    public List<HelpPost> checkIsHelperCanHelp(Long memberId, LocalDateTime startTime, LocalDateTime endTime) {

            return jpaQueryFactory.selectFrom(helpPost)
            .innerJoin(help).on(helpPost.eq(help.helpPost))
            .where(
                    help.helper.id.eq(memberId),
                    helpPost.state.eq(State.MATCHED),
                    helpPost.startTime.before(endTime).
                            and(helpPost.endTime.after(startTime))
                            .or(helpPost.startTime.after(startTime).
                                    and(helpPost.endTime.before(endTime)))
            ).fetch();
    }

    @Override
    public List<HelpPost> findNotMatchedHelpPost(LocalDateTime startTime, LocalDateTime endTime) {
        return jpaQueryFactory.selectFrom(helpPost)
                .where(
                        helpPost.startTime.between(startTime,endTime),
                        helpPost.state.eq(State.ACTIVATE)
                ).fetch();
    }

    @Override
    public List<BestHelpMemberDto> searchBestMember(LocalDateTime startTime, LocalDateTime endTime) {
        NumberExpression<Long> helpPostCount = helpPost.count();

        return jpaQueryFactory.select(Projections.constructor(BestHelpMemberDto.class,
                member.id, profile.id, member.name, member.profileUrl, helpPostCount
                ))
                .from(helpPost)
                .innerJoin(help).on(helpPost.eq(help.helpPost))
                .leftJoin(help.helper, member)
                .leftJoin(member.profile, profile)
                .where(
                        helpPost.state.eq(State.COMPLETED),
                        helpPost.startTime.between(startTime,endTime)
                        )
                .groupBy(member)
                .orderBy(helpPost.count().desc())
                .limit(3)
                .fetch();
    }
}
