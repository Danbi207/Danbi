package com.danbi.api.friend.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ResponseFriendDto {

    @JsonProperty("profile_url")
    private String profileUrl;

    @JsonProperty("name")
    private String name;

    @JsonProperty("dew_point")
    private Long dewPoint;
}
