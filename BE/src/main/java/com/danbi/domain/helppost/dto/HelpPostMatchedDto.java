package com.danbi.domain.helppost.dto;

import com.danbi.domain.helppost.constant.Category;
import com.danbi.domain.helppost.constant.State;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class HelpPostMatchedDto {

    private Long helpPostId;
    private State state;

    private Long ipId;
    private String ipName;
    private String ipProfileUrl;
    private Long ipAccumulateDewPoint;
    private int ipAccusePoint;

    private Long helperId;
    private String helperName;
    private String helperProfileUrl;
    private Long helperAccumulateDewPoint;
    private int helperAccusePoint;

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
