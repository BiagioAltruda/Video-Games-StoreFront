package com.store.storefront.repository;

import com.store.storefront.model.Category;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {

    private final CategoryRepo repo;

    public CategoryService(CategoryRepo repo) {
        this.repo = repo;
    }

    public List<Category> findAll() {
        return repo.findAll();
    }
    public Category findById(Integer id) {
        return repo.findById(id).orElse(null);
    }
    public Category findByName(String name){
        return repo.findByName(name);
    }
    public Category save(Category category) {
        return repo.save(category);
    }
    public void deleteById(Integer id) {
        repo.deleteById(id);
    }
    public Category update(Category category) {
        return repo.save(category);
    }
}
