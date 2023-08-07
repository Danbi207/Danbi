package com.danbi.domain.helppost.dto;

import com.danbi.domain.helppost.constant.Category;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class HelpPostDetailQeuryDto {

    private Long helpPostId;

    private Long ipId;
    private String name;
    private String profileUrl;
    private Long accumulateDewPoint;
    private int accusePoint;

    private String latitude;
    private String longitude;
    private String addr;
    private String destLatitude;
    private String destLongitude;
    private String destAddr;
    private String meetLatitude;
    private String meetLongitude;
    private String meetAddr;

    private boolean faceFlag;
    private boolean emergencyFlag;
    private String content;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private String caution;
    private Category category;

}
