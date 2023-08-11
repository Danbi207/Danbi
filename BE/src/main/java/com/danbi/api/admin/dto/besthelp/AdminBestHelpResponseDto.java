package com.danbi.api.admin.dto.besthelp;

import com.danbi.api.admin.dto.besthelp.AdminBestHelpMemberDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AdminBestHelpResponseDto {

    List<AdminBestHelpMemberDto> memberList;
}
