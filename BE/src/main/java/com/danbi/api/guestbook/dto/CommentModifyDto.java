package com.danbi.api.guestbook.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.Max;
import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;

public class CommentModifyDto {

    @Schema(description = "댓글 수정 요청 DTO")
    @Setter
    @Getter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Request {

        @Schema(description = "수정할 댓글 내용, 500자 이하")
        @Length(max = 500, message = "댓글은 500자 이하여야 합니다.")
        @NotBlank
        private String content;
    }

    @Schema(description = "댓글 수정 응답 DTO")
    @Setter
    @Getter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Response {

        @Schema(description = "댓글 id")
        private Long id;

        @Schema(description = "댓글 내용")
        private String content;

        @Schema(description = "댓글 작성자 이름")
        private String name;

        @Schema(description = "댓글 작성 시간")
        private LocalDateTime createTime;

        @Schema(description = "댓글 수정 시간")
        private LocalDateTime updateTime;
    }
}
