package com.danbi.global.aop;

import com.danbi.api.ApiResponse;
import com.danbi.api.accuse.dto.accuse.AccuseResponseDto;
import com.danbi.api.friend.dto.request.RequestFriendDto;
import com.danbi.api.help.dto.assign.HelpAssignDto;
import com.danbi.domain.accuse.entity.Accuse;
import com.danbi.domain.accuse.repository.AccuseRepository;
import com.danbi.domain.alarm.constant.State;
import com.danbi.domain.alarm.constant.Type;
import com.danbi.domain.alarm.entity.Alarm;
import com.danbi.domain.alarm.service.AlarmService;
import com.danbi.domain.friend.entity.Friend;
import com.danbi.domain.help.repository.HelpRepository;
import com.danbi.domain.helppost.repository.HelpPostRepository;
import com.danbi.domain.helppost.service.HelpPostService;
import com.danbi.domain.member.entity.Member;
import com.danbi.domain.member.repository.MemberRepository;
import com.danbi.domain.member.service.MemberService;
import com.danbi.global.resolver.memberinfo.MemberInfo;
import com.danbi.global.resolver.memberinfo.MemberInfoDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.*;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import java.util.Arrays;

@Slf4j
@Component
@Aspect
@RequiredArgsConstructor
public class NotificationAdvice {

    private final AlarmService alarmService;
    private final MemberRepository memberRepository;
    private final HelpPostRepository helpPostRepository;
    private final HelpRepository helpRepository;
    private final AccuseRepository accuseRepository;

    @Pointcut("execution(* com.danbi.api.friend.controller.FriendController.requestFriend(..))")
    public void getRequestFriend() {
    }

    @Pointcut("@annotation(com.danbi.global.aop.NotificationTrace)")
    public void notification() {
    }

    @AfterReturning(pointcut = "@annotation(notificationTrace)", returning = "result")
    public void accuseApproveAlarm(JoinPoint joinPoint, Object result, NotificationTrace notificationTrace) {
        Object[] args = joinPoint.getArgs();

        Member from = null;
        Member to = null;
        String title = notificationTrace.type().getDescription();
        String content = notificationTrace.type().getDescription();
        Type type = notificationTrace.type();
        if (notificationTrace.type().equals(Type.ACCUSE_PERMIT)) {
            log.info("{}", notificationTrace.type().getDescription());

            for (Object arg : args) {
                if (arg instanceof Long) {
                    Long accuseId = (Long) arg;
                    Accuse accuse = accuseRepository.findById(accuseId).get();
                    from = accuse.getReporter();
                    to = accuse.getReporter();
                }
            }
        }


        alarmSave(from, to, title, content, type);

    }

    @AfterReturning(pointcut = "@annotation(notificationTrace)", returning = "result")
    public void accuseAlarm(JoinPoint joinPoint, Object result, NotificationTrace notificationTrace) {

        Member from = null;
        Member to = null;
        String title = notificationTrace.type().getDescription();
        String content = notificationTrace.type().getDescription();
        Type type = notificationTrace.type();

        if (notificationTrace.type().equals(Type.ACCUSE_SENT)) {
            log.info("{}", notificationTrace.type().getDescription());

            if (result instanceof ApiResponse) {
                ApiResponse apiResponse = (ApiResponse) result;
                if (apiResponse.getData() instanceof AccuseResponseDto) {
                    AccuseResponseDto data = (AccuseResponseDto) apiResponse.getData();
                    Accuse accuse = accuseRepository.findById(data.getAccuseId()).get();
                    from = accuse.getReporter();
                    to = accuse.getReporter();
                }
            }
        }


        alarmSave(from, to, title, content, type);

    }

    @AfterReturning(pointcut = "@annotation(notificationTrace)", returning = "result")
    public void requestFriendAlarm(JoinPoint joinPoint, Object result, NotificationTrace notificationTrace) {
        Object[] args = joinPoint.getArgs();


        Member from = null;
        Member to = null;
        String title = notificationTrace.type().getDescription();
        String content = notificationTrace.type().getDescription();
        Type type = notificationTrace.type();

        if (notificationTrace.type().equals(Type.FRIEND_REQUEST)) {
            log.info("{}", notificationTrace.type().getDescription());

            for (Object arg : args) {
                if (arg instanceof MemberInfoDto) {
                    MemberInfoDto memberInfoDto = (MemberInfoDto) arg;
                    from = memberRepository.findById(memberInfoDto.getMemberId()).get();
                    System.out.println("memberInfoDto.getMemberId():" + memberInfoDto.getMemberId());
                } else if (arg instanceof RequestFriendDto) {
                    RequestFriendDto friendDto = (RequestFriendDto) arg;
                    to = memberRepository.findById(friendDto.getTargetId()).get();
                }
            }
        }


        alarmSave(from, to, title, content, type);

    }

    @AfterReturning(pointcut = "@annotation(notificationTrace)", returning = "result")
    public void permitFriendAlarm(JoinPoint joinPoint, Object result, NotificationTrace notificationTrace) {
        Object[] args = joinPoint.getArgs();


        Member from = null;
        Member to = null;
        String title = notificationTrace.type().getDescription();
        String content = notificationTrace.type().getDescription();
        Type type = notificationTrace.type();

        if (notificationTrace.type().equals(Type.FRIEND_PERMIT)) {
            log.info("{}", notificationTrace.type().getDescription());

            for (Object arg : args) {
                if (arg instanceof MemberInfoDto) {
                    MemberInfoDto memberInfoDto = (MemberInfoDto) arg;
                    from = memberRepository.findById(memberInfoDto.getMemberId()).get();
                    System.out.println("memberInfoDto.getMemberId():" + memberInfoDto.getMemberId());
                } else if (arg instanceof RequestFriendDto) {
                    RequestFriendDto friendDto = (RequestFriendDto) arg;
                    to = memberRepository.findById(friendDto.getTargetId()).get();
                }
            }
        }


        alarmSave(from, to, title, content, type);

    }


    @AfterReturning(pointcut = "@annotation(notificationTrace)", returning = "result")
    public void helpMatchingAlarm(JoinPoint joinPoint, Object result, NotificationTrace notificationTrace) {
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
        String url = request.getRequestURL().toString();
        String method = joinPoint.getSignature().getName();
        String params = Arrays.toString(joinPoint.getArgs());

        System.out.println("URL: " + url);
        System.out.println("Method: " + method);
        Object[] args = joinPoint.getArgs();
//        RequestFriendDto requestFriendDto;
//        for (Object arg : args) {
//            if (arg instanceof MemberInfoDto) {
//                memberInfoDto = (MemberInfoDto) arg;
//                System.out.println("memberInfoDto.getMemberId():" + memberInfoDto.getMemberId());
//            }
//        }

        Member from = null;
        Member to = null;
        String title = notificationTrace.type().getDescription();
        String content = notificationTrace.type().getDescription();
        Type type = notificationTrace.type();

        if (notificationTrace.type().equals(Type.HELP_MATCHING)) {
            log.info("{}", notificationTrace.type().getDescription());

            for (Object arg : args) {
                if (arg instanceof MemberInfoDto) {
                    MemberInfoDto memberInfoDto = (MemberInfoDto) arg;
                    from = memberRepository.findById(memberInfoDto.getMemberId()).get();
                    System.out.println("memberInfoDto.getMemberId():" + memberInfoDto.getMemberId());
                } else if (arg instanceof Long) {
                    Long helpPostId = (Long) arg;
                    to = helpPostRepository.findById(helpPostId).get().getMember();
                }
            }
        } else if (notificationTrace.type().equals(Type.HELP_IP_COMPLETE)) {
            log.info("{}", notificationTrace.type().getDescription());

            for (Object arg : args) {
                if (arg instanceof MemberInfoDto) {
                    MemberInfoDto memberInfoDto = (MemberInfoDto) arg;
                    from = memberRepository.findById(memberInfoDto.getMemberId()).get();
                    System.out.println("memberInfoDto.getMemberId():" + memberInfoDto.getMemberId());
                } else if (arg instanceof Long) {
                    Long helpId = (Long) arg;
                    to = helpRepository.findById(helpId).get().getHelper();
                }
            }
        } else if (notificationTrace.type().equals(Type.HELP_HELPER_COMPLETE)) {
            log.info("{}", notificationTrace.type().getDescription());

            for (Object arg : args) {
                if (arg instanceof MemberInfoDto) {
                    MemberInfoDto memberInfoDto = (MemberInfoDto) arg;
                    from = memberRepository.findById(memberInfoDto.getMemberId()).get();
                    System.out.println("memberInfoDto.getMemberId():" + memberInfoDto.getMemberId());
                } else if (arg instanceof Long) {
                    Long helpId = (Long) arg;
                    to = helpRepository.findById(helpId).get().getIp();
                }
            }
        }


        System.out.println("Parameters: " + params);
        System.out.println("Response: " + result);


        alarmSave(from, to, title, content, type);

    }



    @Before("@annotation(notificationTrace)")
    public void helpCancelAlarm(JoinPoint joinPoint, NotificationTrace notificationTrace) {

        Object[] args = joinPoint.getArgs();

        Member from = null;
        Member to = null;
        String title = notificationTrace.type().getDescription();
        String content = notificationTrace.type().getDescription();
        Type type = notificationTrace.type();

        if (notificationTrace.type().equals(Type.HELP_CANCEL)) {
            log.info("{}", notificationTrace.type().getDescription());

            for (Object arg : args) {
                if (arg instanceof Long) {
                    Long helpId = (Long) arg;
                    to = helpRepository.findById(helpId).get().getIp();
                    from = helpRepository.findById(helpId).get().getHelper();
                }
            }
        }

        alarmSave(from, to, title, content, type);

    }

    private void alarmSave(Member from, Member to, String title, String content, Type type) {
        Alarm alarm = Alarm.builder()
                .from(from)
                .to(to)
                .title(title)
                .readFlag(false)
                .state(State.ACTIVATE)
                .content(content)
                .type(type)
                .build();

        alarmService.savaAlarm(alarm);
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
