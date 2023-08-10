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
import com.danbi.domain.fcm.dto.NotificationRequest;
import com.danbi.domain.fcm.service.FcmService;
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
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.Arrays;
import java.util.concurrent.ExecutionException;

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
    private final FcmService fcmService;


    @AfterReturning(pointcut = "@annotation(notificationTrace)", returning = "result")
    public void accuseApproveAlarm(JoinPoint joinPoint, Object result, NotificationTrace notificationTrace) throws IOException, ExecutionException, InterruptedException {
        Object[] args = joinPoint.getArgs();

        Member from = null;
        Member to = null;
        String title = notificationTrace.type().getDescription();
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
            String content = from.getName()+ "님의 신고가 승인 되었습니다.";
            alarmSave(from, to, title, content, type);
        }
    }

    @AfterReturning(pointcut = "@annotation(notificationTrace)", returning = "result")
    public void accuseAlarm(JoinPoint joinPoint, Object result, NotificationTrace notificationTrace) throws IOException, ExecutionException, InterruptedException {
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
            alarmSave(from, to, title, content, type);
        }

    }

    @AfterReturning(pointcut = "@annotation(notificationTrace)", returning = "result")
    public void requestFriendAlarm(JoinPoint joinPoint, Object result, NotificationTrace notificationTrace) throws IOException, ExecutionException, InterruptedException {
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
                } else if (arg instanceof RequestFriendDto) {
                    RequestFriendDto friendDto = (RequestFriendDto) arg;
                    to = memberRepository.findById(friendDto.getTargetId()).get();
                }
            }

            alarmSave(from, to, title, content, type);
        }
    }

    @AfterReturning(pointcut = "@annotation(notificationTrace)", returning = "result")
    public void permitFriendAlarm(JoinPoint joinPoint, Object result, NotificationTrace notificationTrace) throws IOException, ExecutionException, InterruptedException {
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
                } else if (arg instanceof RequestFriendDto) {
                    RequestFriendDto friendDto = (RequestFriendDto) arg;
                    to = memberRepository.findById(friendDto.getTargetId()).get();
                }
            }
            alarmSave(from, to, title, content, type);
        }

    }


    @AfterReturning(pointcut = "@annotation(notificationTrace)", returning = "result")
    public void helpMatchingAlarm(JoinPoint joinPoint, Object result, NotificationTrace notificationTrace) throws IOException, ExecutionException, InterruptedException {
        Object[] args = joinPoint.getArgs();
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
                } else if (arg instanceof Long) {
                    Long helpPostId = (Long) arg;
                    to = helpPostRepository.findById(helpPostId).get().getMember();
                }
            }
            alarmSave(from, to, title, content, type);
        }
    }

    @AfterReturning(pointcut = "@annotation(notificationTrace)", returning = "result")
    public void helpIpCompleteAlarm(JoinPoint joinPoint, Object result, NotificationTrace notificationTrace) throws IOException, ExecutionException, InterruptedException {
        Object[] args = joinPoint.getArgs();
        Member from = null;
        Member to = null;
        String title = notificationTrace.type().getDescription();
        String content = notificationTrace.type().getDescription();
        Type type = notificationTrace.type();

        if (notificationTrace.type().equals(Type.HELP_IP_COMPLETE)) {
            log.info("{}", notificationTrace.type().getDescription());

            for (Object arg : args) {
                if (arg instanceof MemberInfoDto) {
                    MemberInfoDto memberInfoDto = (MemberInfoDto) arg;
                    from = memberRepository.findById(memberInfoDto.getMemberId()).get();
                } else if (arg instanceof Long) {
                    Long helpId = (Long) arg;
                    to = helpRepository.findById(helpId).get().getHelper();
                }
            }
            alarmSave(from, to, title, content, type);
        }
    }

    @AfterReturning(pointcut = "@annotation(notificationTrace)", returning = "result")
    public void helpHelperCompleteAlarm(JoinPoint joinPoint, Object result, NotificationTrace notificationTrace) throws IOException, ExecutionException, InterruptedException {
        Object[] args = joinPoint.getArgs();
        Member from = null;
        Member to = null;
        String title = notificationTrace.type().getDescription();
        String content = notificationTrace.type().getDescription();
        Type type = notificationTrace.type();

        if (notificationTrace.type().equals(Type.HELP_HELPER_COMPLETE)) {
            log.info("{}", notificationTrace.type().getDescription());

            for (Object arg : args) {
                if (arg instanceof MemberInfoDto) {
                    MemberInfoDto memberInfoDto = (MemberInfoDto) arg;
                    from = memberRepository.findById(memberInfoDto.getMemberId()).get();
                } else if (arg instanceof Long) {
                    Long helpId = (Long) arg;
                    to = helpRepository.findById(helpId).get().getIp();
                }
            }
            alarmSave(from, to, title, content, type);
        }
    }

    @Before("@annotation(notificationTrace)")
    public void helpCancelAlarm(JoinPoint joinPoint, NotificationTrace notificationTrace) throws IOException, ExecutionException, InterruptedException {
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
            alarmSave(from, to, title, content, type);
        }
    }

    private void alarmSave(Member from, Member to, String title, String content, Type type) throws IOException, ExecutionException, InterruptedException {
        log.info("to {}", to.getId());
        log.info("from {}", from.getId());

//
//        sendFcmMessage(from, title, content);
//        sendFcmMessage(to, title, content);
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

    private void sendFcmMessage(Member member, String title, String content) throws IOException, ExecutionException, InterruptedException {
        NotificationRequest notificationRequest = NotificationRequest.builder()
                .email(member.getEmail())
                .title(title)
                .message(content)
                .build();

        fcmService.sendMessageTo(notificationRequest);
    }


}
