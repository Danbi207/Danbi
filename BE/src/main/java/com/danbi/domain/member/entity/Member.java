package com.danbi.domain.member.entity;

import com.danbi.domain.common.BaseEntity;
import com.danbi.domain.guestbook.entity.GuestBook;
import com.danbi.domain.member.constant.Gender;
import com.danbi.domain.member.constant.OauthType;
import com.danbi.domain.member.constant.Role;
import com.danbi.domain.member.constant.State;
import com.danbi.domain.profile.entity.Profile;
import com.danbi.global.jwt.dto.JwtDto;
import com.danbi.global.util.DateTimeUtils;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Entity
public class Member extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 10)
    private OauthType oauthType;

    @Column(unique = true, length = 50, nullable = false)
    private String email;

    @Column(length = 200)
    private String password;

    @Column(nullable = false, length = 30)
    private String name;

    @Column(nullable = false, length = 30)
    private String nickname;

    @Column(length = 200) // TODO: 확인후 추가
    private String profileUrl;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private Role role;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 10)
    private Gender gender;

    @Column(length = 250)
    private String refreshToken;

    private LocalDateTime tokenExpirationTime;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private State state = State.ACTIVATE;

    @OneToOne(mappedBy = "member", cascade = CascadeType.ALL)
    private GuestBook guestBook;

    @OneToOne(mappedBy = "member", cascade = CascadeType.ALL)
    private Profile profile;

    @Builder
    public Member(OauthType oauthType, String email, String password, String name, String nickname,
                  Gender gender, String profileUrl, Role role) {
        this.name = name;
        this.nickname = nickname;
        this.oauthType = oauthType;
        this.email = email;
        this.password = password;
        this.profileUrl = profileUrl;
        this.role = role;
        this.gender = gender;
    }

    public void updateState(String state) {
        this.state = State.from(state);
    }

    public void updateRefreshToken(JwtDto jwtTokenDto) {
        this.refreshToken = jwtTokenDto.getRefreshToken();
        this.tokenExpirationTime = DateTimeUtils.convertToLocalDateTime(jwtTokenDto.getRefreshTokenExpireTime());
    }

    public void expireRefreshToken(LocalDateTime now) {
        this.tokenExpirationTime = now;
    }

    public void makeGuestBook(GuestBook guestBook) {
        this.guestBook = guestBook;
        guestBook.assignMember(this);
    }

    public void makeProfile(Profile profile) {
        this.profile = profile;
        profile.assignMember(this);
    }
}
