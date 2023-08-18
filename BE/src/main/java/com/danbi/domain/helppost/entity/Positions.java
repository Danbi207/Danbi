package com.danbi.domain.helppost.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Entity
public class Positions {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "positions_id")
    private Long id;

    @Column(nullable = false, length = 1023)
    private String latitude;

    @Column(nullable = false, length = 1023)
    private String longitude;

    @Column(length = 253)
    private String addr;

    @Column(length = 1023)
    private String destLatitude;

    @Column(length = 1023)
    private String destLongitude;

    @Column(length = 253)
    private String destAddr;

    @Column(length = 1023)
    private String meetLatitude;

    @Column(length = 1023)
    private String meetLongitude;

    @Column(length = 253)
    private String meetAddr;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "helppost_id")
    private HelpPost helpPost;

    @Builder
    public Positions(String latitude, String longitude, String addr, String destLatitude, String destLongitude, String destAddr, String meetLatitude, String meetLongitude, String meetAddr, HelpPost helpPost) {
        this.latitude = latitude;
        this.longitude = longitude;
        this.addr = addr;
        this.destLatitude = destLatitude;
        this.destLongitude = destLongitude;
        this.destAddr = destAddr;
        this.meetLatitude = meetLatitude;
        this.meetLongitude = meetLongitude;
        this.meetAddr = meetAddr;
        this.helpPost = helpPost;
    }

    public void updateHelpPost(HelpPost helpPost) {
        this.helpPost = helpPost;
    }

    public void update(Positions positions) {
        this.latitude = positions.getLatitude();
        this.longitude = positions.getLongitude();
        this.addr = positions.getAddr();
        this.destLatitude = positions.getDestLatitude();
        this.destLongitude = positions.getDestLongitude();
        this.destAddr = positions.getDestAddr();
        this.meetLatitude = positions.getMeetLatitude();
        this.meetLongitude = positions.getMeetLongitude();
        this.meetAddr = positions.getMeetAddr();
    }
}
