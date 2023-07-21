package com.danbi.domain.accuse.entity;

import com.danbi.domain.accuse.constant.AccuseType;
import com.danbi.domain.accuse.constant.State;
import com.danbi.domain.common.BaseEntity;
import com.danbi.domain.member.entity.Member;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Accuse extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "target_member_id")
    private Member targetMember;

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


}
