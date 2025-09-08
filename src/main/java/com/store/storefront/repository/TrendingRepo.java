package com.store.storefront.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.store.storefront.model.Trending;

@Repository
public interface TrendingRepo extends JpaRepository <Trending,Integer> {
//firme dei metodi in piu 


}
