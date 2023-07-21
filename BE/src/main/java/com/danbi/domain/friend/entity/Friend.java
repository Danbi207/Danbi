package com.danbi.domain.friend.entity;

import com.danbi.domain.alarm.constant.Type;
import com.danbi.domain.common.BaseEntity;
import com.danbi.domain.member.entity.Member;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Friend extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "from_member_id")
    Member from;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "to_member_id")
    Member to;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private Type type;

}
