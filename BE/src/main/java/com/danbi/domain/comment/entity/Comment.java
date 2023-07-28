package com.danbi.domain.comment.entity;

import com.danbi.domain.common.BaseEntity;
import com.danbi.domain.guestbook.entity.GuestBook;
import com.danbi.domain.member.entity.Member;
import lombok.AccessLevel;
import lombok.Builder;
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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "guest_book_id")
    private GuestBook guestBook;

    @Builder
    public Comment(Long id, String content, Member member, GuestBook guestBook) {
        this.id = id;
        this.content = content;
        this.member = member;
        this.guestBook = guestBook;
    }

    public void updateContent(String content) {
        this.content = content;
    }

    public boolean checkCommenter(Member member) {
        return this.member == member;
    }
}
