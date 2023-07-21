package com.danbi.domain.help.entity;

import com.danbi.domain.common.BaseEntity;
import com.danbi.domain.help.constant.State;
import com.danbi.domain.helppost.entity.HelpPost;
import com.danbi.domain.member.entity.Member;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Help extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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
}
