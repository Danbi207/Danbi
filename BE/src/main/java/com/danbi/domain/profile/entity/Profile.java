package com.danbi.domain.profile.entity;

import com.danbi.domain.common.BaseEntity;
import com.danbi.domain.member.entity.Member;
import com.danbi.domain.point.entity.Point;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class Profile extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "profile_id")
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "point_id")
    private Point point;

    @Builder
    public Profile(Long id, Member member) {
        this.id = id;
        this.member = member;
    }

    public void assignMember(Member member) {
        this.member = member;
    }
}
