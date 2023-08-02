package com.danbi.domain.helppost.dto;

import com.danbi.domain.helppost.entity.HelpPost;
import com.danbi.domain.helppost.entity.Positions;
import com.danbi.domain.member.entity.Member;
import com.danbi.domain.point.entity.Point;
import com.danbi.domain.profile.entity.Profile;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class HelpPostQueryDto {

    private Long helpPostId;
    private Long ipId;
    private String name;
    private String profileUrl;
    private String caution;
    private String longitude;
    private String latitude;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private boolean faceFlag;
    private Long accumulateDewPoint;
}
