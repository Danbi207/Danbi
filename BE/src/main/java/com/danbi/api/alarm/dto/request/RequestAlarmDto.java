package com.danbi.api.alarm.dto.request;

import com.danbi.domain.alarm.constant.Type;
import com.danbi.domain.alarm.entity.Alarm;
import com.danbi.domain.member.entity.Member;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

import java.time.LocalDateTime;

@Getter
@Builder
@AllArgsConstructor
public class RequestAlarmDto {

    @JsonProperty("from_id")
    private Long fromId;

    @JsonProperty("to_id")
    private Long toId;

    @JsonProperty("title")
    @Length(max = 100, message = "제목은 최대 100글자 이내입니다.")
    private String title;

    @JsonProperty("content")
    @Length(max = 1000, message = "내용은 최대 1000글자 이내입니다.")
    private String content;

    @JsonProperty("type")
    private Type type;

//    @JsonProperty("created_time")
//    @JsonFormat(pattern = "yyyy-MM-dd HH:mm", timezone = "Asia/Seoul")
//    private LocalDateTime createdTime;

}
