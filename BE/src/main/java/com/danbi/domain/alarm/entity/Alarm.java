package com.danbi.domain.alarm.entity;

import com.danbi.domain.alarm.constant.State;
import com.danbi.domain.alarm.constant.Type;
import com.danbi.domain.common.BaseEntity;
import com.danbi.domain.member.entity.Member;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Alarm extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @Column(nullable = false, length = 500)
    private String title;

    @Column(nullable = false)
    private Boolean read_flag;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private State state;

    @Lob
    @Column(nullable = false)
    private String content;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private Type type;

    @Builder
    public Alarm(Member member, String title, Boolean read_flag, State state, String content, Type type) {
        this.member = member;
        this.title = title;
        this.read_flag = read_flag;
        this.state = state;
        this.content = content;
        this.type = type;
    }

    public void update(Alarm alarm) {
        this.member = alarm.getMember();
        this.title = alarm.getTitle();
        this.read_flag = alarm.getRead_flag();
        this.state = alarm.getState();
        this.content = alarm.getContent();
        this.type = alarm.getType();
    }

    public void delete(){
        this.state = State.DESTROY;}

}
