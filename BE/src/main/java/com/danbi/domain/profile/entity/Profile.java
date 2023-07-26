package com.danbi.domain.profile.entity;

import com.danbi.domain.common.BaseEntity;
import com.danbi.domain.member.entity.Member;
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
    private Long id;

    @OneToOne(fetch = FetchType.EAGER) // TODO: LAZY 해야됨
    @JoinColumn(name = "member_id")
    private Member member;

    @Builder
    public Profile(Long id, Member member) {
        this.id = id;
        this.member = member;
    }

    public void assignMember(Member member) {
        this.member = member;
    }
}
