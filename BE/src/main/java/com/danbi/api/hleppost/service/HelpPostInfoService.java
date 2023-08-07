package com.danbi.api.hleppost.service;

import com.danbi.api.hleppost.dto.detailsearch.DetailHelpPostDto;
import com.danbi.api.hleppost.dto.helpersearch.HelperHelpPostListDto;
import com.danbi.api.hleppost.dto.helpersearch.HelperResponseDto;
import com.danbi.api.hleppost.dto.mysearch.HelpPostListDto;
import com.danbi.api.hleppost.dto.HelpPostRequestDto;
import com.danbi.api.hleppost.dto.HelpPostResponseDto;
import com.danbi.api.hleppost.dto.mysearch.MyHelpPostDto;
import com.danbi.domain.help.constant.State;
import com.danbi.domain.help.entity.Help;
import com.danbi.domain.help.service.HelpService;
import com.danbi.domain.helppost.entity.HelpPost;
import com.danbi.domain.helppost.service.HelpPostService;
import com.danbi.domain.member.entity.Member;
import com.danbi.domain.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class HelpPostInfoService {

    private final HelpPostService helpPostService;
    private final HelpService helpService;
    private final MemberService memberService;

    // 도움 요청 게시글, 도움 생성
    public HelpPostResponseDto getHelpPostInfo(Long memberId, HelpPostRequestDto helpPostRequestDto) {

        Member member = memberService.findByMemberId(memberId);

        HelpPost helpPost = HelpPostRequestDto.from(helpPostRequestDto, member);
        HelpPost newHelpPost = helpPostService.create(helpPost);

        Help help = Help.builder()
                .state(State.ACTIVATE)
                .ipCompleteFlag(false)
                .helperCompleteFlag(false)
                .completeFlag(false)
                .ip(member)
                .helpPost(newHelpPost).build();
        helpService.create(help);

        return HelpPostResponseDto.of(newHelpPost);
    }

    // 도움 요청 삭제
    public void deleteHelpPostInfo(Long helpPostId, Long memberId) {

        HelpPost helpPost = helpPostService.getHelpPost(helpPostId);
        helpPostService.delete(helpPostId,memberId);


    }

    // 도움 요청 수정
    public HelpPostResponseDto updateHelpPostInfo(Long helpPostId, Long memberId,HelpPostRequestDto helpPostRequestDto) {

        Member member = memberService.findByMemberId(memberId);

        HelpPost helpPost = HelpPostRequestDto.from(helpPostRequestDto, member);
        HelpPost updatedHelpPost = helpPostService.update(helpPostId, helpPost, memberId);
        return HelpPostResponseDto.of(updatedHelpPost);
    }

    public MyHelpPostDto searchMyHelpPost(Long memberId) {

        Member member = memberService.findByMemberId(memberId);

        List<HelpPost> helpPosts = helpPostService.searchMyHelp(member);
        List<HelpPostListDto> helpList = new ArrayList<>();
        for (HelpPost helpPost : helpPosts) {
            HelpPostListDto post = HelpPostListDto.builder()
                    .helpPostId(helpPost.getId())
                    .content(helpPost.getContent())
                    .startTime(helpPost.getStartTime())
                    .endTime(helpPost.getEndTime())
                    .totalTime(helpPost.getTotalTime()).build();
            helpList.add(post);
        }
        return MyHelpPostDto.builder()
                .helpList(helpList).build();
    }

    public HelperResponseDto searchHelperHelpPost() {
        List<HelpPost> helpPosts = helpPostService.searchAllList();
        List<HelperHelpPostListDto> helpList = new ArrayList<>();
        for (HelpPost helpPost : helpPosts) {
            HelperHelpPostListDto post = HelperHelpPostListDto.builder()
                    .helpPostId(helpPost.getId())
                    .ipId(helpPost.getMember().getId())
                    .position(HelperHelpPostListDto.Position.builder()
                            .latitude(helpPost.getLatitude())
                            .longitude(helpPost.getLongitude())
                            .build())
                    .faceFlag(helpPost.isFaceFlag())
                    .reservationFlag(helpPost.isReservationFlag())
                    .content(helpPost.getContent())
                    .startTime(helpPost.getStartTime())
                    .endTime(helpPost.getEndTime())
                    .totalTime(helpPost.getTotalTime())
                    .friendFlag(false).build(); // TODO : 친구관계 후에 수정
            helpList.add(post);
        }
        return HelperResponseDto.builder()
                .helpList(helpList).build();
    }

    public DetailHelpPostDto searchDetailHelpPost(Long helpPostId) {
        HelpPost helpPost = helpPostService.detailHelpPost(helpPostId);
        DetailHelpPostDto detail = DetailHelpPostDto.builder()
                .helpPostId(helpPostId)
                .ipId(helpPost.getMember().getId())
                .position(DetailHelpPostDto.Position.builder()
                        .latitude(helpPost.getLatitude())
                        .longitude(helpPost.getLongitude()).build())
                .faceFlag(helpPost.isFaceFlag())
                .reservationFlag(helpPost.isReservationFlag())
                .content(helpPost.getContent())
                .startTime(helpPost.getStartTime())
                .endTime(helpPost.getEndTime())
                .totalTime(helpPost.getTotalTime())
                .friendFlag(false).build(); // TODO : 친구관계 후에 수정
        return detail;
    }
}
