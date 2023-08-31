package com.danbi.api.alarm.dto.response;

import com.danbi.domain.alarm.constant.Type;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
@AllArgsConstructor
public class ResponseAlarmDto {

    @JsonProperty("alarmId")
    private Long alarmId;

    @JsonProperty("fromName")
    private String fromName;

    @JsonProperty("toName")
    private String toName;

    @JsonProperty("title")
    private String title;

    @JsonProperty("content")
    private String content;

    @JsonProperty("type")
    private Type type;

    @JsonProperty("creatTime")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm", timezone = "Asia/Seoul")
    private LocalDateTime createTime;

    @JsonProperty("readFlag")
    private boolean readFlag;

}
