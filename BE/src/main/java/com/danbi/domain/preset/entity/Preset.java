package com.danbi.domain.preset.entity;

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
public class Preset extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "profile_id")
    private Profile profile;

    @Column(nullable = false, length = 30)
    private String title;

    @Lob
    @Column(nullable = false)
    private String content;

    @Column(nullable = false)
    private Integer sequence;

    @Column(nullable = false)
    private Boolean activeFlag;

    @Builder
    public Preset(Long id, Profile profile, String title, String content, Integer sequence, Boolean activeFlag) {
        this.id = id;
        this.profile = profile;
        this.title = title;
        this.content = content;
        this.sequence = sequence;
        this.activeFlag = activeFlag;
    }

    public void updateTitle(String title) {
        this.title = title;
    }

    public void updateContent(String content) {
        this.content = content;
    }

    public void updateSequence(Integer sequence) {
        this.sequence = sequence;
    }

    public boolean checkProfile(Profile profile) {
        return this.profile == profile;
    }
}
