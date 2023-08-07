package com.danbi.domain.guestbook.repository;

import com.danbi.domain.guestbook.entity.GuestBook;
import com.danbi.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface GuestBookRepository extends JpaRepository<GuestBook, Long> {

    Optional<GuestBook> getGuestBookByMember(Member member);
}
