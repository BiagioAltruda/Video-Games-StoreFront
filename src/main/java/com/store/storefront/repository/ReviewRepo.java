package com.store.storefront.repository;

import com.store.storefront.model.Player;
import com.store.storefront.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepo extends JpaRepository<Review,Integer> {

    public List<Review> findReviewsByReviewedId(int reviewedId);
    public List<Review> findReviewsByPlayer(Player player);
}
