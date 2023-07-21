package com.danbi.domain.comment.entity;

import com.danbi.domain.common.BaseEntity;
import com.danbi.domain.guestbook.entity.GuestBook;
import com.danbi.domain.member.entity.Member;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class Comment extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Lob
    @Column(nullable = false)
    private String content;

    @ManyToOne
    private Member member;

    @ManyToOne
    private GuestBook guestBook;
}
