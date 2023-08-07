package com.danbi.domain.point.entity;

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
public class Point extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "point_id")
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "profile_id")
    private Profile profile;

    @Column(nullable = false)
    private Long dewPoint;

    @Column(nullable = false)
    private Long accumulateDewPoint;

    public void pick(Long price) {
        this.dewPoint -= price;
    }

    public void plusPoint(Long dew) {
        this.dewPoint += dew;
        this.accumulateDewPoint += dew;
    }


    @Builder
    public Point(Profile profile, Long dewPoint, Long accumulateDewPoint) {
        this.profile = profile;
        this.dewPoint = dewPoint;
        this.accumulateDewPoint = accumulateDewPoint;
    }
}
