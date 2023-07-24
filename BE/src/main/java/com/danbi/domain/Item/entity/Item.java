package com.danbi.domain.Item.entity;

import com.danbi.domain.Item.constant.Color;
import com.danbi.domain.Item.constant.Rank;
import com.danbi.domain.common.BaseEntity;
import com.danbi.domain.profile.entity.Profile;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class Item extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "profile_id")
    private Profile profile;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private Color color;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private Rank rank;

    public void update(Color color, Rank rank) {
        this.color = color;
        this.rank = rank;
    }

}
