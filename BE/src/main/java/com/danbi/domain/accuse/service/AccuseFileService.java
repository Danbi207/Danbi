package com.danbi.domain.accuse.service;

import com.danbi.domain.accuse.entity.Accuse;
import com.danbi.domain.accuse.entity.AccuseFile;
import com.danbi.domain.accuse.repository.AccuseFileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class AccuseFileService {

    private final AccuseFileRepository accuseFileRepository;

    @Transactional
    public AccuseFile saveAccuseFile(String fileName, String url, Accuse accuse) {
        AccuseFile accuseFile = AccuseFile.builder()
                .originName(fileName)
                .url(url)
                .accuse(accuse)
                .build();

        return accuseFileRepository.save(accuseFile);
    }
}
