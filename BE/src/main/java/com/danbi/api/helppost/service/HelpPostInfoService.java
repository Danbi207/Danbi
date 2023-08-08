package com.danbi.api.helppost.service;

import com.danbi.api.friend.service.FriendInfoService;
import com.danbi.api.helppost.dto.detailmatched.DetailMatchedHelpPostDto;
import com.danbi.api.helppost.dto.detailmatched.HelperMatchedDto;
import com.danbi.api.helppost.dto.detailmatched.IpMatchedDto;
import com.danbi.api.helppost.dto.detailsearch.DetailHelpPostDto;
import com.danbi.api.helppost.dto.detailsearch.IpDto;
import com.danbi.api.helppost.dto.helpersearch.face.HelperFaceHelpPostDto;
import com.danbi.api.helppost.dto.helpersearch.query.HelperQueryHelpPostDto;
import com.danbi.api.helppost.dto.HelpPostRequestDto;
import com.danbi.api.helppost.dto.HelpPostResponseDto;
import com.danbi.api.helppost.dto.searchbymonth.HelpPostByMonthDetailDto;
import com.danbi.api.helppost.dto.searchbymonth.HelpPostByMonthResponseDto;
import com.danbi.domain.help.constant.State;
import com.danbi.domain.help.entity.Help;
import com.danbi.domain.help.service.HelpService;
import com.danbi.domain.helppost.dto.HelpPostDetailQeuryDto;
import com.danbi.domain.helppost.dto.HelpPostFaceDto;
import com.danbi.domain.helppost.dto.HelpPostMatchedDto;
import com.danbi.domain.helppost.dto.HelpPostQueryDto;
import com.danbi.domain.helppost.entity.HelpPost;
import com.danbi.domain.helppost.entity.Positions;
import com.danbi.domain.helppost.service.HelpPostService;
import com.danbi.domain.helppost.service.PositionService;
import com.danbi.domain.member.entity.Member;
import com.danbi.domain.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
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

    // 도움 요청 게시글, 도움 생성
    public HelpPostResponseDto getHelpPostInfo(Long memberId, HelpPostRequestDto helpPostRequestDto) {

        Member member = memberService.findByMemberId(memberId);

        Positions positions = HelpPostRequestDto.fromPositions(helpPostRequestDto);
        Positions savedPositions = positionService.create(positions);

        HelpPost helpPost = HelpPostRequestDto.from(helpPostRequestDto, member, savedPositions);
        HelpPost newHelpPost = helpPostService.create(helpPost, memberId);

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


    public List<HelperQueryHelpPostDto> searchQueryHelpPost(Long memberId, String gender) {
        List<HelpPostQueryDto> helpPosts = helpPostService.searchAllByQuery(gender);
        List<HelperQueryHelpPostDto> helpList = new ArrayList<>();
        for (HelpPostQueryDto helpPost : helpPosts) {

            boolean isFriend = friendInfoService.isFriend(memberId, helpPost.getIpId());

            HelperQueryHelpPostDto post = HelperQueryHelpPostDto.builder()
                    .helpPostId(helpPost.getHelpPostId())
                    .ipId(helpPost.getIpId())
                    .name(helpPost.getName())
                    .profileUrl(helpPost.getProfileUrl())
                    .caution(helpPost.getCaution())
                    .startTime(helpPost.getStartTime())
                    .endTime(helpPost.getEndTime())
                    .emergencyFlag(helpPost.isEmergencyFlag())
                    .accuseStack(helpPost.getAccuseStack())
                    .friendFlag(isFriend).build();
            helpList.add(post);
        }
        return helpList;
    }

    public List<HelperFaceHelpPostDto> searchFaceHelpPost(Long memberId, String longitude,
                                                          String latitude, String gender) {
        List<HelpPostFaceDto> helpPosts = helpPostService.searchAllByFace(longitude, latitude, gender);
        List<HelperFaceHelpPostDto> helpList = new ArrayList<>();
        for (HelpPostFaceDto helpPost : helpPosts) {

            boolean isFriend = friendInfoService.isFriend(memberId, helpPost.getIpId());

            HelperFaceHelpPostDto post = HelperFaceHelpPostDto.builder()
                    .helpPostId(helpPost.getHelpPostId())
                    .ipId(helpPost.getIpId())
                    .position(HelperFaceHelpPostDto.Position.builder()
                            .meetLatitude(helpPost.getMeetLatitude())
                            .meetLongitude(helpPost.getMeetLongitude())
                            .meetAddr(helpPost.getMeetAddr()).build())
                    .name(helpPost.getName())
                    .profileUrl(helpPost.getProfileUrl())
                    .caution(helpPost.getCaution())
                    .startTime(helpPost.getStartTime())
                    .endTime(helpPost.getEndTime())
                    .emergencyFlag(helpPost.isEmergencyFlag())
                    .accuseStack(helpPost.getAccuseStack())
                    .friendFlag(isFriend).build();
            helpList.add(post);
        }
        return helpList;
    }


    public DetailHelpPostDto searchDetailQueryHelpPost(Long helpPostId, Long memberId) {
        HelpPostDetailQeuryDto helpPost = helpPostService.searchDetail(helpPostId);
        boolean isFriend = friendInfoService.isFriend(memberId, helpPost.getIpId());

        return DetailHelpPostDto.builder()
                .helpPostId(helpPostId)
                .ip(IpDto.builder()
                        .ipId(helpPost.getIpId())
                        .name(helpPost.getName())
                        .profileUrl(helpPost.getProfileUrl())
                        .accumulateDewPoint(helpPost.getAccumulateDewPoint())
                        .accusePoint(helpPost.getAccusePoint()).build())
                .faceFlag(helpPost.isFaceFlag())
                .emergencyFlag(helpPost.isEmergencyFlag())
                .content(helpPost.getContent())
                .startTime(helpPost.getStartTime())
                .endTime(helpPost.getEndTime())
                .friendFlag(isFriend)
                .caution(helpPost.getCaution())
                .category(helpPost.getCategory())
                .position(DetailHelpPostDto.Position.builder()
                        .latitude(helpPost.getLatitude())
                        .longitude(helpPost.getLongitude())
                        .destLongitude(helpPost.getDestLongitude())
                        .destLatitude(helpPost.getDestLatitude())
                        .meetLongitude(helpPost.getMeetLongitude())
                        .meetLatitude(helpPost.getMeetLatitude())
                        .addr(helpPost.getAddr())
                        .destAddr(helpPost.getDestAddr())
                        .meetAddr(helpPost.getMeetAddr()).build()).build();
    }

    public DetailMatchedHelpPostDto searchMatchedHelpPost(Long helpPostId) {
        HelpPostMatchedDto helpPost = helpPostService.searchMatchedDetail(helpPostId);

        return DetailMatchedHelpPostDto.builder()
                .helpPostId(helpPostId)
                .ip(IpMatchedDto.builder()
                        .ipId(helpPost.getIpId())
                        .name(helpPost.getIpName())
                        .profileUrl(helpPost.getIpProfileUrl())
                        .accumulateDewPoint(helpPost.getIpAccumulateDewPoint())
                        .accusePoint(helpPost.getIpAccusePoint()).build())
                .helper(HelperMatchedDto.builder()
                        .helperId(helpPost.getHelperId())
                        .name(helpPost.getHelperName())
                        .profileUrl(helpPost.getHelperProfileUrl())
                        .accumulateDewPoint(helpPost.getHelperAccumulateDewPoint())
                        .accusePoint(helpPost.getHelperAccusePoint()).build())
                .faceFlag(helpPost.isFaceFlag())
                .emergencyFlag(helpPost.isEmergencyFlag())
                .content(helpPost.getContent())
                .startTime(helpPost.getStartTime())
                .endTime(helpPost.getEndTime())
                .caution(helpPost.getCaution())
                .category(helpPost.getCategory())
                .position(DetailMatchedHelpPostDto.Position.builder()
                        .latitude(helpPost.getLatitude())
                        .longitude(helpPost.getLongitude())
                        .destLongitude(helpPost.getDestLongitude())
                        .destLatitude(helpPost.getDestLatitude())
                        .meetLongitude(helpPost.getMeetLongitude())
                        .meetLatitude(helpPost.getMeetLatitude())
                        .addr(helpPost.getAddr())
                        .destAddr(helpPost.getDestAddr())
                        .meetAddr(helpPost.getMeetAddr()).build()).build();
    }

    public HelpPostByMonthResponseDto searchByMonth(LocalDate time, Long memberId) {
        List<HelpPost> helpPosts = helpPostService.searchByMonth(time, memberId);
        List<HelpPostByMonthDetailDto> helpPostsByMonth = new ArrayList<>();

        for (HelpPost helpPost : helpPosts) {
            HelpPostByMonthDetailDto helpPostDto = HelpPostByMonthDetailDto.builder()
                    .helpPostId(helpPost.getId())
                    .content(helpPost.getContent())
                    .startTime(helpPost.getStartTime())
                    .endTime(helpPost.getEndTime())
                    .state(helpPost.getState()).build();
            helpPostsByMonth.add(helpPostDto);
        }

        return HelpPostByMonthResponseDto.builder()
                .helpList(helpPostsByMonth).build();
    }
}
