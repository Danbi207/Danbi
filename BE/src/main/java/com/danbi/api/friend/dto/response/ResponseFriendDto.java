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

    @JsonProperty("profileUrl")
    private String profileUrl;

    @JsonProperty("name")
    private String name;

    @JsonProperty("dewPoint")
    private Long dewPoint;

    @JsonProperty("targetId")
    private Long targetId;
}
