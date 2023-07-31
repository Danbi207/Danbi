package com.danbi.api.hleppost.service;

import com.danbi.api.friend.service.FriendInfoService;
import com.danbi.api.hleppost.dto.detailmatched.DetailMatchedHelpPostDto;
import com.danbi.api.hleppost.dto.detailmatched.HelperMatchedDto;
import com.danbi.api.hleppost.dto.detailmatched.IpMatchedDto;
import com.danbi.api.hleppost.dto.detailsearch.DetailHelpPostDto;
import com.danbi.api.hleppost.dto.detailsearch.IpDto;
import com.danbi.api.hleppost.dto.helpersearch.HelperHelpPostListDto;
import com.danbi.api.hleppost.dto.helpersearch.HelperResponseDto;
import com.danbi.api.hleppost.dto.mysearch.HelpPostListDto;
import com.danbi.api.hleppost.dto.HelpPostRequestDto;
import com.danbi.api.hleppost.dto.HelpPostResponseDto;
import com.danbi.api.hleppost.dto.mysearch.MyHelpPostDto;
import com.danbi.domain.accuse.entity.Accuse;
import com.danbi.domain.accuse.service.AccuseService;
import com.danbi.domain.help.constant.State;
import com.danbi.domain.help.entity.Help;
import com.danbi.domain.help.service.HelpService;
import com.danbi.domain.helppost.entity.HelpPost;
import com.danbi.domain.helppost.entity.Positions;
import com.danbi.domain.helppost.service.HelpPostService;
import com.danbi.domain.helppost.service.PositionService;
import com.danbi.domain.member.entity.Member;
import com.danbi.domain.member.service.MemberService;
import com.danbi.domain.point.entity.Point;
import com.danbi.domain.point.service.PointService;
import com.danbi.domain.profile.entity.Profile;
import com.danbi.domain.profile.service.ProfileService;
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
    private final FriendInfoService friendInfoService;
    private final PositionService positionService;

    private final ProfileService profileService;
    private final PointService pointService;
    private final AccuseService accuseService;

    // 도움 요청 게시글, 도움 생성
    public HelpPostResponseDto getHelpPostInfo(Long memberId, HelpPostRequestDto helpPostRequestDto) {

        Member member = memberService.findByMemberId(memberId);

        Positions positions = HelpPostRequestDto.fromPositions(helpPostRequestDto);
        Positions savedPositions = positionService.create(positions);

        HelpPost helpPost = HelpPostRequestDto.from(helpPostRequestDto, member, savedPositions);
        HelpPost newHelpPost = helpPostService.create(helpPost);

        positionService.updateHelpPost(newHelpPost,savedPositions);

        Help help = Help.builder()
                .state(State.ACTIVATE)
                .ipCompleteFlag(false)
                .helperCompleteFlag(false)
                .completeFlag(false)
                .ip(member)
                .helpPost(newHelpPost).build();
        helpService.create(help);

        return HelpPostResponseDto.of(newHelpPost, positions);
    }

    // 도움 요청 삭제
    public void deleteHelpPostInfo(Long helpPostId, Long memberId) {

        HelpPost helpPost = helpPostService.getHelpPost(helpPostId);
        helpPostService.delete(helpPostId,memberId);


    }

    // 도움 요청 수정
    public HelpPostResponseDto updateHelpPostInfo(Long helpPostId, Long memberId,HelpPostRequestDto helpPostRequestDto) {

        Member member = memberService.findByMemberId(memberId);

        Positions positions = HelpPostRequestDto.fromPositions(helpPostRequestDto);
        Positions savedPositions = positionService.update(helpPostId,positions);

        HelpPost helpPost = HelpPostRequestDto.from(helpPostRequestDto, member, savedPositions);
        HelpPost updatedHelpPost = helpPostService.update(helpPostId, helpPost, memberId);
        return HelpPostResponseDto.of(updatedHelpPost, savedPositions);
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
                    .endTime(helpPost.getEndTime()).build();
            helpList.add(post);
        }
        return MyHelpPostDto.builder()
                .helpList(helpList).build();
    }

    public HelperResponseDto searchHelperHelpPost(Long memberId) {
        List<HelpPost> helpPosts = helpPostService.searchAllList();
        List<HelperHelpPostListDto> helpList = new ArrayList<>();
        for (HelpPost helpPost : helpPosts) {

            boolean isFriend = friendInfoService.isFriend(memberId, helpPost.getMember().getId());

            HelperHelpPostListDto post = HelperHelpPostListDto.builder()
                    .helpPostId(helpPost.getId())
                    .ipId(helpPost.getMember().getId())
                    .faceFlag(helpPost.isFaceFlag())
                    .reservationFlag(helpPost.isReservationFlag())
                    .content(helpPost.getContent())
                    .startTime(helpPost.getStartTime())
                    .endTime(helpPost.getEndTime())
                    .friendFlag(isFriend).build();
            helpList.add(post);
        }
        return HelperResponseDto.builder()
                .helpList(helpList).build();
    }

    public DetailHelpPostDto searchDetailHelpPost(Long helpPostId, Long memberId) {
        HelpPost helpPost = helpPostService.detailHelpPost(helpPostId);

        boolean isFriend = friendInfoService.isFriend(memberId, helpPost.getMember().getId());

        Profile profileByMember = profileService.getProfileByMember(helpPost.getMember());
        Point accumulatePoint = pointService.getAccumulatePoint(profileByMember);
        List<Accuse> accuses = accuseService.myAccuseStack(helpPost.getMember());
        Positions positions = positionService.searchPositions(helpPost);

        DetailHelpPostDto detail = DetailHelpPostDto.builder()
                .helpPostId(helpPostId)
                .ip(IpDto.builder()
                        .ipId(helpPost.getMember().getId())
                        .name(helpPost.getMember().getName())
                        .accumulateDewPoint(accumulatePoint.getAccumulateDewPoint())
                        .accusePoint(accuses.size()).build())
                .faceFlag(helpPost.isFaceFlag())
                .reservationFlag(helpPost.isReservationFlag())
                .content(helpPost.getContent())
                .startTime(helpPost.getStartTime())
                .endTime(helpPost.getEndTime())
                .friendFlag(isFriend)
                .caution(helpPost.getCaution())
                .category(helpPost.getCategory())
                .position(DetailHelpPostDto.Position.builder()
                        .latitude(positions.getLatitude())
                        .longitude(positions.getLongitude())
                        .destLongitude(positions.getDestLongitude())
                        .destLatitude(positions.getDestLatitude())
                        .meetLongitude(positions.getMeetLongitude())
                        .meetLatitude(positions.getMeetLatitude())
                        .addr(positions.getAddr())
                        .destAddr(positions.getDestAddr())
                        .meetAddr(positions.getMeetAddr()).build()).build();
        return detail;
    }

    public DetailMatchedHelpPostDto searchDetailMatchedHelpPost(Long helpPostId, Long memberId) {
        HelpPost helpPost = helpPostService.detailHelpPost(helpPostId);

        boolean isFriend = friendInfoService.isFriend(memberId, helpPost.getMember().getId());

        Profile profileByMember = profileService.getProfileByMember(helpPost.getMember());
        Point accumulatePoint = pointService.getAccumulatePoint(profileByMember);
        List<Accuse> accuses = accuseService.myAccuseStack(helpPost.getMember());
        Positions positions = positionService.searchPositions(helpPost);

        Help help = helpService.search(helpPost);
        Profile profileByMemberHelper = profileService.getProfileByMember(help.getHelper());
        Point accumulatePointHelper = pointService.getAccumulatePoint(profileByMemberHelper);
        List<Accuse> accusesHelper = accuseService.myAccuseStack(helpPost.getMember());


        DetailMatchedHelpPostDto detail = DetailMatchedHelpPostDto.builder()
                .helpPostId(helpPostId)
                .ip(IpMatchedDto.builder()
                        .ipId(helpPost.getMember().getId())
                        .name(helpPost.getMember().getName())
                        .accumulateDewPoint(accumulatePoint.getAccumulateDewPoint())
                        .accusePoint(accuses.size()).build())
                .helper(HelperMatchedDto.builder()
                        .helperId(help.getHelper().getId())
                        .name(help.getHelper().getName())
                        .accumulateDewPoint(accumulatePointHelper.getAccumulateDewPoint())
                        .accusePoint(accusesHelper.size()).build())
                .faceFlag(helpPost.isFaceFlag())
                .reservationFlag(helpPost.isReservationFlag())
                .content(helpPost.getContent())
                .startTime(helpPost.getStartTime())
                .endTime(helpPost.getEndTime())
                .friendFlag(isFriend)
                .caution(helpPost.getCaution())
                .category(helpPost.getCategory())
                .position(DetailMatchedHelpPostDto.Position.builder()
                        .latitude(positions.getLatitude())
                        .longitude(positions.getLongitude())
                        .destLongitude(positions.getDestLongitude())
                        .destLatitude(positions.getDestLatitude())
                        .meetLongitude(positions.getMeetLongitude())
                        .meetLatitude(positions.getMeetLatitude())
                        .addr(positions.getAddr())
                        .destAddr(positions.getDestAddr())
                        .meetAddr(positions.getMeetAddr()).build()).build();
        return detail;
    }
}
