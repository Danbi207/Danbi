package com.danbi.domain.guestbook.service;

import com.danbi.domain.guestbook.entity.GuestBook;
import com.danbi.domain.guestbook.repository.GuestBookRepository;
import com.danbi.domain.member.entity.Member;
import com.danbi.global.error.ErrorCode;
import com.danbi.global.error.exception.notfound.GuestBookNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class GuestBookService {

    private final GuestBookRepository guestBookRepository;

    public GuestBook findById(Long id) {
        Optional<GuestBook> op = guestBookRepository.findById(id);

        if(op.isEmpty()) {
            throw new GuestBookNotFoundException(ErrorCode.GUESTBOOK_NOT_EXISTS);
        }

        return op.get();
    }

    public GuestBook findByMember(Member member) {
        Optional<GuestBook> op = guestBookRepository.getGuestBookByMember(member);

        if(op.isEmpty()) {
            throw new GuestBookNotFoundException(ErrorCode.GUESTBOOK_NOT_EXISTS);
        }

        return op.get();
    }
}
