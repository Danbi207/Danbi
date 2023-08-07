package com.danbi.api.friend.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RequestFriendDto {

    @JsonProperty("target_id")
    @NotNull(message = "targetId값이 필요합니다.")
    private Long targetId;

}
