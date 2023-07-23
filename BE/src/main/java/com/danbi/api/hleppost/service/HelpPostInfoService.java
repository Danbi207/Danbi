package com.danbi.api.hleppost.service;

import com.danbi.api.hleppost.dto.detailsearch.DetailHelpPostDto;
import com.danbi.api.hleppost.dto.helpersearch.HelperHelpPostListDto;
import com.danbi.api.hleppost.dto.helpersearch.HelperResponseDto;
import com.danbi.api.hleppost.dto.mysearch.HelpPostListDto;
import com.danbi.api.hleppost.dto.HelpPostRequestDto;
import com.danbi.api.hleppost.dto.HelpPostResponseDto;
import com.danbi.api.hleppost.dto.mysearch.MyHelpPostDto;
import com.danbi.domain.helppost.entity.HelpPost;
import com.danbi.domain.helppost.service.HelpPostService;
import com.danbi.domain.member.entity.Member;
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

    public HelpPostResponseDto getHelpPostInfo(Member member, HelpPostRequestDto helpPostRequestDto) {
        HelpPost helpPost = HelpPostRequestDto.from(helpPostRequestDto, member);
        HelpPost newHelpPost = helpPostService.create(helpPost);
        return HelpPostResponseDto.of(newHelpPost);
    }

    public void deleteHelpPostInfo(Long id) {
        helpPostService.delete(id);
    }

    public HelpPostResponseDto updateHelpPostInfo(Long helpPostId, Member member,HelpPostRequestDto helpPostRequestDto) {
        HelpPost helpPost = HelpPostRequestDto.from(helpPostRequestDto, member);
        HelpPost updatedHelpPost = helpPostService.update(helpPostId, helpPost);
        return HelpPostResponseDto.of(updatedHelpPost);
    }

    public MyHelpPostDto searchMyHelpPost(Member member) {
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
                    .friendFlag(false).build(); // FIXME : 친구관계 후에 수정
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
                .friendFlag(false).build();
        return detail;
    }
}
