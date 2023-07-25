package com.danbi.api.guestbook.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Setter
@Getter
@Builder
public class GuestBookResponseDto {

    private Long guest_book_id;
    private GuestBookDto guestBookDto;

    @Builder
    @Setter
    @Getter
    public static class GuestBookDto {
        private List<CommentDto> commentDtos;

        @Getter
        @Setter
        @Builder
        public static class CommentDto {
            private Long commentId;
            private String name;
            private String profileUrl;
            private String content;
            private LocalDateTime createdTime;
            private LocalDateTime updatedTime;
        }

    }
}
