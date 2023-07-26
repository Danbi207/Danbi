package com.danbi.api.guestbook.service;

import com.danbi.api.guestbook.dto.GuestBookResponseDto;
import com.danbi.domain.comment.entity.Comment;
import com.danbi.domain.comment.service.CommentService;
import com.danbi.domain.guestbook.entity.GuestBook;
import com.danbi.domain.member.entity.Member;
import com.danbi.domain.profile.entity.Profile;
import com.danbi.domain.profile.service.ProfileService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;


@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class GuestBookProfileService {

    private final ProfileService profileService;
    private final CommentService commentService;

    public GuestBookResponseDto getGuestBook(Long profileId) {
        Profile profile = profileService.getProfileById(profileId);
        Member member = profile.getMember();
        log.info("memberId={}", member.getId());

        GuestBook guestBook = member.getGuestBook();
        log.info("guestBookId={}", guestBook.getId());

        List<Comment> comments = commentService.findByGuestBook(guestBook);
        List<GuestBookResponseDto.GuestBookDto.CommentDto> commentDtos = comments.stream()
                .map(comment -> GuestBookResponseDto.GuestBookDto.CommentDto.builder()
                        .commentId(comment.getId())
                        .name(comment.getMember().getName())
                        .profileUrl(comment.getMember().getProfileUrl())
                        .content(comment.getContent())
                        .createdTime(comment.getCreateTime())
                        .updatedTime(comment.getUpdateTime())
                        .build())
                .collect(Collectors.toList());


        return GuestBookResponseDto.builder()
                .guest_book_id(guestBook.getId())
                .guestBookDto(
                        GuestBookResponseDto.GuestBookDto.builder()
                                .commentDtos(commentDtos)
                                .build())
                .build();
    }

}
