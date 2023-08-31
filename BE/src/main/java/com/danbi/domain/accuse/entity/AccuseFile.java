package com.danbi.domain.accuse.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class AccuseFile{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 200)
    private String originName;

    @Column(nullable = false, length = 200)
    private String url;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "accuse_id")
    private Accuse accuse;

    @Builder
    public AccuseFile(String originName, String url, Accuse accuse) {
        this.originName = originName;
        this.url = url;
        this.accuse = accuse;
    }
}
