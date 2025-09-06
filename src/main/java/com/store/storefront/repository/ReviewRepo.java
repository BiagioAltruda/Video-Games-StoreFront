package com.store.storefront.repository;

import com.store.storefront.model.Reviewable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewRepo extends JpaRepository<Reviewable,Integer> {

}
