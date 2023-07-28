package com.danbi.domain.preset.dto;

import com.danbi.domain.profile.entity.Profile;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Setter
@Getter
@Builder
public class PresetDto {

    private Long id;

    private Profile profile;

    private String title;

    private String content;

    private Integer sequence;

    private Boolean activeFlag;
}
