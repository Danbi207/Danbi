package com.danbi.domain.point.entity;

import com.danbi.domain.common.BaseEntity;
import com.danbi.domain.profile.entity.Profile;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class Point extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "profile_id")
    private Profile profile;

    @Column(nullable = false)
    private Long dewPoint;

    @Column(nullable = false)
    private Long accumulateDewPoint;

    public void pick(Long price) {
        this.dewPoint -= price;
    }

}
