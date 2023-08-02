package com.danbi.domain.helppost.repository;

import com.danbi.domain.helppost.dto.HelpPostDetailQeuryDto;
import com.danbi.domain.helppost.dto.HelpPostFaceDto;
import com.danbi.domain.helppost.dto.HelpPostMatchedDto;
import com.danbi.domain.helppost.dto.HelpPostQueryDto;
import java.util.List;

public interface HelpPostRepositoryCustom {
    List<HelpPostQueryDto> search(String longitude, String latitude);
    List<HelpPostFaceDto> searchFace(String longitude, String latitude);

    HelpPostDetailQeuryDto searchDetail(Long helpPostId);

    HelpPostMatchedDto searchMatchedDetail(Long helpPostId);
}
