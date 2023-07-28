package com.danbi.api.guestbook.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;


public class CommentDto {

    @Schema(description = "방명록에 댓글 작성 요청 DTO")
    @Setter
    @Getter
    public static class Reqeust {

        @Schema(description = "댓글 내용")
        private String content;
    }

    @Schema(description = "방명록에 댓글 작성 응답 DTO")
    @Setter
    @Getter
    @Builder
    public static class Response {

        @Schema(description = "작성된 댓글 id")
        private Long id;

        @Schema(description = "작성된 댓글 내용")
        private String content;

        @Schema(description = "댓글을 작성한 유저 이름")
        private String name;

        @Schema(description = "댓글을 작성한 시간")
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Seoul")
        private LocalDateTime createTime;

        @Schema(description = "댓글을 수정한 시간")
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Seoul")
        private LocalDateTime updateTime;
    }
}
