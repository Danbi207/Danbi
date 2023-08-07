package com.danbi.domain.accuse.entity;

import com.danbi.domain.accuse.constant.AccuseType;
import com.danbi.domain.accuse.constant.State;
import com.danbi.domain.common.BaseEntity;
import com.danbi.domain.member.entity.Member;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Accuse extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "accuse_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "target_member_id")
    private Member targetMember;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "reporter_id")
    private Member reporter;

    @Column(nullable = false, length = 20)
    private String title;

    @Lob
    @Column(nullable = false)
    private String content;

    @Column(length = 200) // TODO: 확인후 추가
    private String evidenceUrl;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private AccuseType accuseType;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private State state;

    public void updateAccuse(State state) {
        this.state = state;
    }

    @Builder
    public Accuse(Member targetMember, Member reporter,String title, String content, String evidenceUrl, AccuseType accuseType, State state) {
        this.targetMember = targetMember;
        this.reporter = reporter;
        this.title = title;
        this.content = content;
        this.evidenceUrl = evidenceUrl;
        this.accuseType = accuseType;
        this.state = state;
    }
}
