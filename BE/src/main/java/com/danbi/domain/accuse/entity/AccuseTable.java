package com.danbi.domain.accuse.entity;

import com.danbi.domain.member.entity.Member;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class AccuseTable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "from_member_id")
    private Member fromMember;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "accuse_id")
    private Accuse accuse;

    @Builder
    public AccuseTable(Member fromMember, Accuse accuse) {
        this.fromMember = fromMember;
        this.accuse = accuse;
    }
}
