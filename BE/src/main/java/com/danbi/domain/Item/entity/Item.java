package com.danbi.domain.Item.entity;

import com.danbi.domain.Item.constant.Color;
import com.danbi.domain.Item.constant.Ranking;
import com.danbi.domain.common.BaseEntity;
import com.danbi.domain.profile.entity.Profile;
import lombok.AccessLevel;
import lombok.Builder;
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
    private Ranking ranking;

    public void update(Color color, Ranking ranking) {
        this.color = color;
        this.ranking = ranking;
    }

    @Builder
    public Item(Profile profile, Color color, Ranking ranking) {
        this.profile = profile;
        this.color = color;
        this.ranking = ranking;
    }
}
