package com.danbi.domain.member.dto;

import com.danbi.domain.member.constant.Gender;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class MemberDataDto {

    private Long userId;
    private Long profileId;
    private String name;
    private String profileUrl;
    private Gender gender;

}