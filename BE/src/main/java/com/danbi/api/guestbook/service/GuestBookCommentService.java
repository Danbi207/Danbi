package com.danbi.api.guestbook.service;

import com.danbi.api.guestbook.dto.CommentDto;
import com.danbi.api.guestbook.dto.CommentModifyDto;
import com.danbi.domain.comment.entity.Comment;
import com.danbi.domain.comment.service.CommentService;
import com.danbi.domain.guestbook.entity.GuestBook;
import com.danbi.domain.guestbook.service.GuestBookService;
import com.danbi.domain.member.entity.Member;
import com.danbi.domain.member.service.MemberService;
import com.danbi.global.error.ErrorCode;
import com.danbi.global.error.exception.mismatch.CommentMisMatchMemberException;
import com.danbi.global.error.exception.mismatch.GuestBookMisMatchMemberException;
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
    public CommentDto.Response saveComment(Long guestBookId, CommentDto.Request reqeust,Long memberId) {
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

    @Transactional
    public CommentModifyDto.Response modifyComment(Long memberId, Long commentId, CommentModifyDto.Request request) {
        Comment comment = commentService.findById(commentId);
        Member member = memberService.findByMemberId(memberId);

        if(!comment.checkCommenter(member)) {
            throw new CommentMisMatchMemberException(ErrorCode.COMMENT_MISMATCH_MEMBER);
        }

        Comment modifiedComment = commentService.modifyContent(comment, request.getContent());
        return CommentModifyDto.Response.builder()
                .id(commentId)
                .content(modifiedComment.getContent())
                .name(member.getName())
                .createTime(modifiedComment.getCreateTime())
                .updateTime(modifiedComment.getUpdateTime())
                .build();
    }

    @Transactional
    public void deleteComment(Long memberId, Long guestBookId, Long commentId) {
        Member member = memberService.findByMemberId(memberId);
        GuestBook guestBook = guestBookService.findById(guestBookId);
        Comment comment = commentService.findById(commentId);
        
        // 댓글 관리할 수 있는 권한이 있는지 확인
        validateCommentManager(comment, member, guestBook);

        commentService.deleteComment(comment);
    }

    /**
     *  댓글의 관리 권한은 
     *  댓글을 작성한 유저이거나 
     *  댓글이 작성되어 있는 방명록의 주인만 가진다.
     */
    private void validateCommentManager(Comment comment, Member member, GuestBook guestBook) {
        if(!comment.checkCommenter(member)) {
            throw new CommentMisMatchMemberException(ErrorCode.COMMENT_MISMATCH_MEMBER);
        }
        if(!guestBook.checkMember(member)) {
            throw new GuestBookMisMatchMemberException(ErrorCode.GUESTBOOK_MISMATCH_MEMBER);
        }
    }

}
