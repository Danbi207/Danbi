package com.danbi.api.helppost.dto.helpersearch.contact;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ContactRequestDto {

    private String longitude;

    private String latitude;

    private String gender;

}
