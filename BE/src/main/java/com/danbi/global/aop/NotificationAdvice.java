package com.danbi.global.aop;

import com.danbi.api.ApiResponse;
import com.danbi.domain.alarm.constant.State;
import com.danbi.domain.alarm.constant.Type;
import com.danbi.domain.alarm.entity.Alarm;
import com.danbi.domain.alarm.service.AlarmService;
import com.danbi.domain.friend.entity.Friend;
import com.danbi.global.resolver.memberinfo.MemberInfo;
import com.danbi.global.resolver.memberinfo.MemberInfoDto;
import lombok.RequiredArgsConstructor;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import java.util.Arrays;

@Component
@Aspect
@RequiredArgsConstructor
public class NotificationAdvice {

    private final AlarmService alarmService;

    @Pointcut("execution(* com.danbi.api.friend.controller.FriendController.requestFriend(..))")
    public void getRequestFriend(){}

    @Pointcut("@annotation(com.danbi.global.aop.NotificationTrace)")
    public void notification(){};

    @AfterReturning(pointcut = "notification()", returning = "result")
    public void doTrace(JoinPoint joinPoint, Object result) {
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
        String url = request.getRequestURL().toString();
        String method = joinPoint.getSignature().getName();
        String params = Arrays.toString(joinPoint.getArgs());

        System.out.println("URL: " + url);
        System.out.println("Method: " + method);
        Object[] args = joinPoint.getArgs();
        for (Object arg : args) {
            if(arg instanceof MemberInfoDto){
                MemberInfoDto memberInfoDto = (MemberInfoDto) arg;
                System.out.println("memberInfoDto.getMemberId():"+memberInfoDto.getMemberId());
            }
            System.out.println(arg);
        }
        System.out.println("Parameters: " + params);
        System.out.println("Response: " + result);

//        if(result instanceof ApiResponse){
//            ApiResponse apiResponse = (ApiResponse) result;
//            if (apiResponse.getData() instanceof String) {
//                String data = (String) apiResponse.getData();
//                System.out.println("data" + data);
//            }
//        }


        if(result instanceof Friend){
            Friend apiResponse = (Friend) result;
            Alarm alarm = Alarm.builder()
                    .from(apiResponse.getFrom())
                    .to(apiResponse.getTo())
                    .title(Type.FRIEND_REQUEST.getDescription())
                    .readFlag(false)
                    .state(State.ACTIVATE)
                    .content(Type.FRIEND_REQUEST.getDescription())
                    .type(Type.FRIEND_REQUEST)
                    .build();

            Alarm saveAlarm = alarmService.savaAlarm(alarm);
            System.out.println("apiResponse" + apiResponse);
            System.out.println("saveAlarm" + saveAlarm);
        }
    }

//    @Around("getRequestFriend()")
//    public Object outputCrudServiceLogging(ProceedingJoinPoint jp) throws Throwable {
//
//        Object[] args = jp.getArgs();
//
//        for (Object arg : args) {
//
//        }
//
//        ApiResponse<String> result = (ApiResponse<String>) jp.proceed();
//
//
//        System.out.println("사후처리");
//
//        return result;
//    }
}
