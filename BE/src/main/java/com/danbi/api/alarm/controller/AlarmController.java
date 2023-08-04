package com.danbi.api.alarm.controller;

import com.danbi.api.ApiResponse;
import com.danbi.api.alarm.dto.request.RequestAlarmDto;
import com.danbi.api.alarm.dto.response.ResponseAlarmDto;
import com.danbi.api.alarm.dto.response.ResponseAlarmListDto;
import com.danbi.api.alarm.service.AlarmInfoService;
import com.danbi.global.resolver.MemberInfo;
import com.danbi.global.resolver.MemberInfoDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(name = "Alarm", description = "알람")
@RestController
@RequestMapping("api/v1/pofile/alarm")
@RequiredArgsConstructor
public class AlarmController {

    private final AlarmInfoService alarmInfoService;

    @Operation(summary = "알림 목록조회 API", description = "알림 목록조회")
    @GetMapping
    ApiResponse<ResponseAlarmListDto> getAlarmList(@MemberInfo MemberInfoDto memberInfoDto) {
        ResponseAlarmListDto alarmList = alarmInfoService.getAlarmList(memberInfoDto.getMemberId());
        return ApiResponse.ok(alarmList);
    }

    @Operation(summary = "읽지 않은 알람 목록조회 API", description = "읽지 않은 알람 목록조회")
    @GetMapping("/notread")
    ApiResponse<ResponseAlarmListDto> getNotReadAlarm(@MemberInfo MemberInfoDto memberInfoDto) {
        ResponseAlarmListDto alarmList = alarmInfoService.getNotReadAlarm(memberInfoDto.getMemberId());
        return ApiResponse.ok(alarmList);
    }

    @Operation(summary = "읽지 않은 알람 수 조회 API", description = "읽지 않은 알람 수 조회")
    @GetMapping("/notread/count")
    ApiResponse<Long> countNotReadAlarm(@MemberInfo MemberInfoDto memberInfoDto) {
        return ApiResponse.ok(alarmInfoService.countNotReadAlarm(memberInfoDto.getMemberId()));
    }

    @Operation(summary = "알림 상세조회 API", description = "알림 상세조회")
    @GetMapping("/{alarm_id}")
    ApiResponse<ResponseAlarmDto> getAlarmDetail(@MemberInfo MemberInfoDto memberInfoDto, @PathVariable("alarm_id") Long alarmId) {
        return ApiResponse.ok(alarmInfoService.getAlarmDetail(memberInfoDto.getMemberId(), alarmId));
    }

    @Operation(summary = "알림 읽음처리 API", description = "알림 읽음처리")
    @GetMapping("/read")
    ResponseEntity<String> readAlarm(@MemberInfo MemberInfoDto memberInfoDto) {
        alarmInfoService.readAlarm(memberInfoDto.getMemberId());
        return ResponseEntity.ok("알림을 읽음 처리했습니다.");
    }

    @Operation(summary = "알림 삭제처리 API", description = "알림 삭제처리")
    @DeleteMapping("/{alarm_id}")
    ResponseEntity<String> deleteAlarm(@MemberInfo MemberInfoDto memberInfoDto, @PathVariable("alarm_id") Long alarmId) {
        alarmInfoService.deleteAlarm(memberInfoDto.getMemberId(), alarmId);
        return ResponseEntity.ok("알림을 삭제 처리했습니다.");
    }

    @Operation(summary = "알림 생성 API", description = "알림 생성")
    @PostMapping
    ResponseEntity<String> registerAlarm(@MemberInfo MemberInfoDto memberInfoDto, @RequestBody RequestAlarmDto requestAlarmDto) {
        alarmInfoService.registerAlarm(memberInfoDto.getMemberId(), requestAlarmDto);
        return ResponseEntity.ok("알림을 생성했습니다.");
    }

}
