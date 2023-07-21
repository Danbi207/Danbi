package com.danbi.domain.helppost.entity;

import com.danbi.domain.common.BaseEntity;
import com.danbi.domain.helppost.constant.State;
import com.danbi.domain.member.entity.Member;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Entity
public class HelpPost extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @Lob
    private String content;

    @Column(nullable = false, length = 1023)
    private String latitude;

    @Column(nullable = false, length = 1023)
    private String longitude;

    @Column(nullable = false, length = 20)
    private LocalDateTime startTime;

    private boolean reservationFlag;
    private boolean faceFlag;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 10)
    private State state;

}
