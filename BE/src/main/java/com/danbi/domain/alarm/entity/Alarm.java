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
    @JoinColumn(name = "from_member_id")
    private Member from;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "to_member_id")
    private Member to;

    @Column(nullable = false, length = 500)
    private String title;

    @Column(nullable = false)
    private Boolean readFlag;

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
    public Alarm(Member from, Member to, String title, Boolean readFlag, State state, String content, Type type) {
        this.from = from;
        this.to = to;
        this.title = title;
        this.readFlag = readFlag;
        this.state = state;
        this.content = content;
        this.type = type;
    }

    public void update(Alarm alarm) {
        this.from = alarm.getFrom();
        this.to = alarm.getTo();
        this.title = alarm.getTitle();
        this.readFlag = alarm.getReadFlag();
        this.state = alarm.getState();
        this.content = alarm.getContent();
        this.type = alarm.getType();
    }

    public void delete() {
        this.state = State.DESTROY;
    }

    public void deleteSender() {
        if (this.state == State.RECEIVER_DESTROY)
            delete();
        else this.state = State.SENDER_DESTROY;
    }

    public void deleteReceiver() {
        if (this.state == State.SENDER_DESTROY)
            delete();
        else this.state = State.RECEIVER_DESTROY;
    }

}
