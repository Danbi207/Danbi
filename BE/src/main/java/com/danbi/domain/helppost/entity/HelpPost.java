package com.danbi.domain.helppost.entity;

import com.danbi.domain.common.BaseEntity;
import com.danbi.domain.helppost.constant.Category;
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
    @Column(name = "help_post_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @Column(nullable = false)
    private String content;

    @Column(nullable = false, length = 20)
    private LocalDateTime startTime;

    @Column(length = 20)
    private LocalDateTime endTime;

    private boolean emergencyFlag;

    private boolean faceFlag;

    private boolean genderFlag;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 10)
    private State state;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 10)
    private Category category;

    @Lob
    @Column(nullable = false)
    private String caution;

    @OneToOne(mappedBy = "helpPost", cascade = CascadeType.ALL)
    private Positions positions;


    @Builder
    public HelpPost(Member member, String content, LocalDateTime startTime, LocalDateTime endTime, boolean emergencyFlag, boolean faceFlag, State state, boolean genderFlag, Category category, String caution, Positions positions) {
        this.member = member;
        this.content = content;
        this.startTime = startTime;
        this.endTime = endTime;
        this.emergencyFlag = emergencyFlag;
        this.faceFlag = faceFlag;
        this.genderFlag = genderFlag;
        this.state = state;
        this.category = category;
        this.caution = caution;
        this.positions = positions;
    }


    public void update(HelpPost helpPost) {
        this.content = helpPost.getContent();
        this.startTime = helpPost.getStartTime();
        this.endTime = helpPost.getEndTime();
        this.emergencyFlag = helpPost.isEmergencyFlag();
        this.faceFlag = helpPost.isFaceFlag();
        this.genderFlag = helpPost.isGenderFlag();
        this.state = helpPost.getState();
        this.category = helpPost.getCategory();
        this.caution = helpPost.getCaution();
        this.positions = helpPost.getPositions();
    }
    public void updateState(State state) {
        this.state = state;
    }
}
