package com.danbi.domain.profile.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProfileCommentsDto {

    private String name;
    private String profileUrl;
    private String content;
    private LocalDateTime createdTime;
    private LocalDateTime updatedTime;
}
