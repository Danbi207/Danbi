package com.danbi.global.error;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum ErrorCode {

    // 인증 && 인가
    TOKEN_EXPIRED(HttpStatus.UNAUTHORIZED, "A-001", "토큰이 만료되었습니다."),
    NOT_VALID_TOKEN(HttpStatus.UNAUTHORIZED, "A-002", "해당 토큰은 유효한 토큰이 아닙니다."),
    NOT_EXISTS_AUTHORIZATION(HttpStatus.UNAUTHORIZED, "A-003", "Authorization Header가 빈값입니다."),
    NOT_VALID_BEARER_GRANT_TYPE(HttpStatus.UNAUTHORIZED, "A-004", "인증 타입이 Bearer 타입이 아닙니다."),
    REFRESH_TOKEN_NOT_FOUND(HttpStatus.UNAUTHORIZED, "A-005", "해당 refresh token은 존재하지 않습니다."),
    REFRESH_TOKEN_EXPIRED(HttpStatus.UNAUTHORIZED, "A-006", "해당 refresh token은 만료됐습니다."),
    NOT_ACCESS_TOKEN_TYPE(HttpStatus.UNAUTHORIZED, "A-007", "해당 토큰은 ACCESS TOKEN이 아닙니다."),
    FORBIDDEN_ADMIN(HttpStatus.FORBIDDEN, "A-008", "관리자 Role이 아닙니다."),
    ACCESS_TOKEN_EXPIRED(HttpStatus.UNAUTHORIZED, "A-009", "해당 access token은 만료됐습니다."),

    // 회원
    INVALID_MEMBER_TYPE(HttpStatus.BAD_REQUEST, "M-001", "잘못된 회원 타입 입니다.(memberType : KAKAO)"),
    ALREADY_REGISTERED_MEMBER(HttpStatus.BAD_REQUEST, "M-002", "이미 가입된 회원 입니다."),
    MEMBER_NOT_EXISTS(HttpStatus.BAD_REQUEST, "M-003", "해당 회원은 존재하지 않습니다."),
    MEMBER_ROLE_NOT_EXIST(HttpStatus.BAD_REQUEST, "M-004", "해당 역할은 존재하지 않습니다."),

    // 프로필
    PROFILE_NOT_EXISTS(HttpStatus.BAD_REQUEST, "P-001", "해당 프로필은 존재하지 않습니다."),
    
    // 방명록
    GUESTBOOK_NOT_EXISTS(HttpStatus.BAD_REQUEST, "G-001", "해당 방명록은 존재하지 않습니다."),
    GUESTBOOK_MISMATCH_MEMBER(HttpStatus.BAD_REQUEST, "G-002", "해당 방명록은 작성자만 수정할 수 있습니다."),

    // 댓글
    COMMENT_NOT_EXISTS(HttpStatus.BAD_REQUEST, "C-001", "해당 댓글은 존재하지 않습니다."),
    COMMENT_MISMATCH_MEMBER(HttpStatus.BAD_REQUEST, "C-002", "해당 댓글은 작성자만 수정할 수 있습니다."),

    // 프리셋
    PRESET_NOT_EXISTS(HttpStatus.BAD_REQUEST, "P-001", "해당 프리셋은 존재하지 않습니다."),
    PRESET_MISMATCH_MEMBER(HttpStatus.BAD_REQUEST, "P-002", "해당 프리셋은 작성자만 접근 할 수 있습니다."),

    //FCM
    NOT_EXIST_FCM_TOKEN(HttpStatus.BAD_REQUEST, "F-001", "해당 회원의 FCM토큰이 없습니다."),


    //친구관계
    FRIEND_NOT_EXISTS(HttpStatus.BAD_REQUEST, "FRI-001","해당 친구관계는 존재하지 않습니다."),
    ALREADY_REGISTERED_FRIEND(HttpStatus.BAD_REQUEST, "FRI-002", "이미 존재하는 친구관계 입니다."),
    NOT_MY_FRIEND_REQUEST(HttpStatus.BAD_REQUEST, "FRI-003", "현재 회원의 친구요청이 아닙니다."),
    NOT_MY_FRIEND(HttpStatus.BAD_REQUEST, "FRI-004", "현재 회원의 친구관계가 아닙니다."),


    // HelpPost
    HELPPOST_MISMATCH_MEMBER(HttpStatus.BAD_REQUEST,"HP-001", "해당 도움 요청 게시글의 작성자와 유저가 동일하지 않습니다"),
    HELPPOST_MISMATCH_TIME(HttpStatus.BAD_REQUEST,"HP-002","도움 요청 게시글의 시간설정이 잘못 되었습니다."),
    HELPPOST_MISMATCH_START_END_TIME(HttpStatus.BAD_REQUEST,"HP-003","이미 해당 시간에 도움요청이 등록되어 있습니다."),
    HELPPOST_MISMATCH_ISMATCHED(HttpStatus.BAD_REQUEST,"HP-004","매칭된 도움 요청이 아닙니다."),
    HELPPOST_NOT_EXISTS(HttpStatus.BAD_REQUEST,"HP-005","해당번호의 매칭된 도움은 없습니다."),

    // Help
    HELP_MISMATCH_IP(HttpStatus.BAD_REQUEST,"H-001","해당 도움의 IP와 유저가 동일하지 않습니다."),
    HELP_MISMATCH_HELPER(HttpStatus.BAD_REQUEST,"H-002","해당 도움의 Helper와 유저가 동일하지 않습니다."),
    HELP_MISMATCH_MEMBER(HttpStatus.BAD_REQUEST,"H-003","해당 도움의 ip와 요청자가 동일합니다."),

    // Point
    POINT_MISMATCH_MEMBER(HttpStatus.BAD_REQUEST,"P-001","프로필의 주인과 사용자가 동일하지 않습니다."),


    // Alarm
    ALARM_NOT_EXISTS(HttpStatus.BAD_REQUEST,"AL-001","해당 알림은 존재하지 않습니다."),
    FORBIDDEN_ALARM(HttpStatus.BAD_REQUEST,"AL-002","해당 계정의 알림이 아닙니다."),

    // Accuse
    ACCUSE_MISMATCH_TARGET(HttpStatus.BAD_REQUEST,"AC-001","본인을 신고할 수는 없습니다."),
    ACCUSE_MISMATCH_MEMBER(HttpStatus.BAD_REQUEST,"AC-002","신고자와 취소 요청자가 동일하지 않습니다."),

    // Item
    ITEM_NEGATIVE_POINT(HttpStatus.BAD_REQUEST,"IT-001","보유중인 포인트가 뽑기에 필요한 포인트 이하입니다."),

    // File
    EMPTY_FILE(HttpStatus.BAD_REQUEST, "F-001", "빈 파일은 제출할 수 없습니다."),
    FILE_AMOUNTS_LIMIT(HttpStatus.BAD_REQUEST, "F-002", "제출할 수 있는 파일 수를 초과했습니다.")
    ;

    ErrorCode(HttpStatus httpStatus, String errorCode, String message) {
        this.httpStatus = httpStatus;
        this.errorCode = errorCode;
        this.message = message;
    }

    private HttpStatus httpStatus;
    private String errorCode;
    private String message;
}
