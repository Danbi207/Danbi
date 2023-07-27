package com.danbi.api.guestbook.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Schema(description = "방명록 조회 응답 DTO")
@Setter
@Getter
@Builder
public class GuestBookResponseDto {

    @Schema(description = "방명록 id")
    private Long guest_book_id;

    @Schema(description = "방명록 정보")
    private GuestBookDto guestBookDto;

    @Builder
    @Setter
    @Getter
    public static class GuestBookDto {

        @Schema(description = "방명록 안에 있는 댓글 목록")
        private List<CommentDto> commentDtos;

        @Getter
        @Setter
        @Builder
        public static class CommentDto {
            @Schema(description = "댓글 id")
            private Long commentId;

            @Schema(description = "댓글 작성자 이름")
            private String name;

            @Schema(description = "댓글 작성자 profile_url")
            private String profileUrl;

            @Schema(description = "댓글 내용")
            private String content;

            @Schema(description = "댓글 생성 시간")
            @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Seoul")
            private LocalDateTime createdTime;

            @Schema(description = "댓글 수정 시간")
            @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Seoul")
            private LocalDateTime updatedTime;
        }

    }
}
