package com.danbi.domain.profile.repository;

import com.danbi.domain.Item.entity.QItem;
import com.danbi.domain.comment.entity.QComment;
import com.danbi.domain.guestbook.entity.QGuestBook;
import com.danbi.domain.help.entity.QHelp;
import com.danbi.domain.member.entity.QMember;
import com.danbi.domain.point.entity.QPoint;
import com.danbi.domain.profile.dto.ProfileCommentsDto;
import com.danbi.domain.profile.dto.ProfileHelpDto;
import com.danbi.domain.profile.dto.ProfileQueryDto;
import com.danbi.domain.profile.entity.QProfile;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import java.util.List;

import static com.danbi.domain.Item.entity.QItem.item;
import static com.danbi.domain.comment.entity.QComment.comment;
import static com.danbi.domain.guestbook.entity.QGuestBook.guestBook;
import static com.danbi.domain.help.entity.QHelp.help;
import static com.danbi.domain.member.entity.QMember.member;
import static com.danbi.domain.point.entity.QPoint.point;
import static com.danbi.domain.profile.entity.QProfile.profile;

@RequiredArgsConstructor
public class ProfileRepositoryImpl implements ProfileRepositoryCustom{

    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public ProfileQueryDto searchProfile(Long memberId) {
        return jpaQueryFactory.select(Projections.constructor(ProfileQueryDto.class,
                    profile.id, guestBook.id ,member.name, member.profileUrl,
                        member.accuseStack, point.dewPoint, item.ranking, item.color))
                .from(profile)
                .innerJoin(profile.member, member)
                .leftJoin(item).on(profile.eq(item.profile))
                .leftJoin(profile.point, point)
                .leftJoin(member.guestBook, guestBook)
                .where(member.id.eq(memberId))
                .fetchOne();
    }

    @Override
    public List<ProfileHelpDto> searchHelp(Long memberId) {
        return jpaQueryFactory.select(Projections.constructor(ProfileHelpDto.class,help.id, help.createTime))
                .from(help)
                .where(
                        help.helper.id.eq(memberId).or(help.ip.id.eq(memberId)),
                        help.completeFlag.eq(true)
                ).fetch();

    }

    @Override
    public List<ProfileCommentsDto> searchComment(Long memberId) {
        return jpaQueryFactory.select(Projections.constructor(ProfileCommentsDto.class,
                        comment.member.name, comment.member.profileUrl,
                        comment.content, comment.createTime, comment.updateTime
                ))
                .from(comment)
                .innerJoin(comment.guestBook, guestBook)
                .where(guestBook.member.id.eq(memberId))
                .fetch();
    }
}
