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

    @JsonProperty("alarm_id")
    private Long alarmId;

    @JsonProperty("from_name")
    private String fromName;

    @JsonProperty("to_name")
    private String toName;

    @JsonProperty("title")
    private String title;

    @JsonProperty("content")
    private String content;

    @JsonProperty("type")
    private Type type;

    @JsonProperty("creat_time")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm", timezone = "Asia/Seoul")
    private LocalDateTime createTime;

    @JsonProperty("read_flag")
    private boolean readFlag;

}
