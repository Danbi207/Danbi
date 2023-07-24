package com.danbi.domain.Item.repository;

import com.danbi.domain.Item.entity.Item;
import com.danbi.domain.profile.entity.Profile;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ItemRepository extends JpaRepository<Item, Long> {
    Optional<Item> findByProfile(Profile profile);
}
