package com.danbi.api.alarm.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Builder
public class ResponseAlarmListDto {

    @JsonProperty("alarm_list")
    List<ResponseAlarmDto> alarmList;
}
