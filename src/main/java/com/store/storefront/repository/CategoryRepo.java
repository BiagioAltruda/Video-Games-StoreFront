package com.store.storefront.repository;

import com.store.storefront.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepo extends JpaRepository<Category,Integer> {
    public Category findByName(String name);
}
