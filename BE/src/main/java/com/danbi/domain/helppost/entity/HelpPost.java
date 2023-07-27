package com.danbi.domain.helppost.entity;

import com.danbi.domain.common.BaseEntity;
import com.danbi.domain.helppost.constant.State;
import com.danbi.domain.member.entity.Member;
import lombok.AccessLevel;
import lombok.Builder;
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
    @Column(nullable = false)
    private String content;

    @Column(nullable = false, length = 1023)
    private String latitude;

    @Column(nullable = false, length = 1023)
    private String longitude;

    @Column(nullable = false, length = 20)
    private LocalDateTime startTime;

    @Column(length = 20)
    private LocalDateTime endTime;

    private int totalTime;

    private boolean reservationFlag;
    private boolean faceFlag;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 10)
    private State state;

    @Builder
    public HelpPost(Member member, String content, String latitude, String longitude, LocalDateTime startTime, LocalDateTime endTime, int totalTime, boolean reservationFlag, boolean faceFlag, State state) {
        this.member = member;
        this.content = content;
        this.latitude = latitude;
        this.longitude = longitude;
        this.startTime = startTime;
        this.endTime = endTime;
        this.totalTime = totalTime;
        this.reservationFlag = reservationFlag;
        this.faceFlag = faceFlag;
        this.state = state;
    }


    public void update(HelpPost helpPost) {
        this.content = helpPost.getContent();
        this.latitude = helpPost.getLatitude();
        this.longitude = helpPost.getLongitude();
        this.startTime = helpPost.getStartTime();
        this.endTime = helpPost.getEndTime();
        this.totalTime = helpPost.getTotalTime();
        this.reservationFlag = helpPost.isReservationFlag();
        this.faceFlag = helpPost.isFaceFlag();
        this.state = helpPost.getState();
    }

    public void delete(State state) {
        this.state = state;
    }
}
