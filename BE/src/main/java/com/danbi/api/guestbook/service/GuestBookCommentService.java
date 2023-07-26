package com.danbi.api.guestbook.service;

import com.danbi.api.guestbook.dto.CommentDto;
import com.danbi.api.guestbook.dto.GuestBookResponseDto;
import com.danbi.domain.comment.entity.Comment;
import com.danbi.domain.comment.service.CommentService;
import com.danbi.domain.guestbook.entity.GuestBook;
import com.danbi.domain.guestbook.service.GuestBookService;
import com.danbi.domain.member.entity.Member;
import com.danbi.domain.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class GuestBookCommentService {

    private final CommentService commentService;
    private final GuestBookService guestBookService;
    private final MemberService memberService;

    @Transactional
    public CommentDto.Response saveComment(Long guestBookId, CommentDto.Reqeust reqeust,Long memberId) {
        GuestBook guestBook = guestBookService.findById(guestBookId);
        Member member = memberService.findByMemberId(memberId);

        Comment comment = Comment.builder()
                .content(reqeust.getContent())
                .member(member)
                .guestBook(guestBook)
                .build();

        Comment savedComment = commentService.saveComment(comment);
        return CommentDto.Response.builder()
                .id(savedComment.getId())
                .content(savedComment.getContent())
                .name(member.getName())
                .createTime(savedComment.getCreateTime())
                .updateTime(savedComment.getUpdateTime())
                .build();
    }

}
