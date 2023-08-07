package com.danbi.domain.help.entity;

import com.danbi.domain.common.BaseEntity;
import com.danbi.domain.help.constant.State;
import com.danbi.domain.helppost.entity.HelpPost;
import com.danbi.domain.member.entity.Member;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

import static com.danbi.domain.helppost.constant.State.COMPLETED;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Help extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "help_id")
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 10)
    private State state;

    @Column(nullable = false)
    private boolean ipCompleteFlag;

    @Column(nullable = false)
    private boolean helperCompleteFlag;

    @Column(nullable = false)
    private boolean completeFlag;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ip_id")
    private Member ip;

    @ManyToOne(optional = true, fetch = FetchType.LAZY)
    @JoinColumn(name = "helper_id")
    private Member helper;

    @OneToOne
    @JoinColumn(name = "helppost_id")
    private HelpPost helpPost;

    @Builder
    public Help(State state, boolean ipCompleteFlag, boolean helperCompleteFlag, boolean completeFlag, Member ip, Member helper, HelpPost helpPost) {
        this.state = state;
        this.ipCompleteFlag = ipCompleteFlag;
        this.helperCompleteFlag = helperCompleteFlag;
        this.completeFlag = completeFlag;
        this.ip = ip;
        this.helper = helper;
        this.helpPost = helpPost;
    }

    public void updateHelper(Member member) {
        this.helper = member;
    }

    public void updateHelperFlag(boolean helperCompleteFlag) {
        this.helperCompleteFlag = helperCompleteFlag;
        this.helper.getProfile().getPoint().plusPoint(2L);

        if (ipCompleteFlag && helperCompleteFlag) {
            this.completeFlag = true;
            this.helper.getProfile().getPoint().plusPoint(2L);
            this.ip.getProfile().getPoint().plusPoint(2L);
            this.helpPost.updateState(COMPLETED);
        }
    }

    public void updateIpFlag(boolean ipCompleteFlag) {
        this.ipCompleteFlag = ipCompleteFlag;
        this.ip.getProfile().getPoint().plusPoint(2L);

        if (ipCompleteFlag && helperCompleteFlag) {
            this.completeFlag = true;
            this.helper.getProfile().getPoint().plusPoint(2L);
            this.ip.getProfile().getPoint().plusPoint(2L);
            this.helpPost.updateState(COMPLETED);
        }
    }

    public void delete(State state) {
        this.state = state;
    }

}
