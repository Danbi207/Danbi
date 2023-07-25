package com.danbi.domain.guestbook.service;

import com.danbi.domain.guestbook.entity.GuestBook;
import com.danbi.domain.guestbook.repository.GuestBookRepository;
import com.danbi.domain.member.entity.Member;
import com.danbi.global.error.ErrorCode;
import com.danbi.global.error.exception.GuestBookNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class GuestBookService {

    private final GuestBookRepository guestBookRepository;

    public GuestBook getGuestBookById(Long id) {
        Optional<GuestBook> op = guestBookRepository.findById(id);

        if(op.isEmpty()) {
            throw new GuestBookNotFoundException(ErrorCode.GUESTBOOK_NOT_EXISTS);
        }

        return op.get();
    }

    public GuestBook getGuestBookByMember(Member member) {
        Optional<GuestBook> op = guestBookRepository.getGuestBookByMember(member);

        if(op.isEmpty()) {
            throw new GuestBookNotFoundException(ErrorCode.GUESTBOOK_NOT_EXISTS);
        }

        return op.get();
    }
}
