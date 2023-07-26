package com.danbi.api.guestbook.dto;

import lombok.*;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.Max;
import java.time.LocalDateTime;

public class CommentModifyDto {

    @Setter
    @Getter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Request {

        @Length(max = 500, message = "댓글은 500자 이하여야 합니다.")
        private String content;
    }

    @Setter
    @Getter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Response {
        private Long id;
        private String content;
        private String name;
        private LocalDateTime createTime;
        private LocalDateTime updateTime;
    }
}
