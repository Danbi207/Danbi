package com.danbi.domain.profile.repository;

import com.danbi.domain.profile.dto.ProfileCommentsDto;
import com.danbi.domain.profile.dto.ProfileHelpDto;
import com.danbi.domain.profile.dto.ProfileQueryDto;

import java.util.List;

public interface ProfileRepositoryCustom {

    ProfileQueryDto searchProfile(Long memberId);
    List<ProfileHelpDto> searchHelp(Long memberId);
    List<ProfileCommentsDto> searchComment(Long memberId);
}
