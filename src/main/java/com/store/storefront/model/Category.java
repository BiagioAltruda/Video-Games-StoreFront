package com.store.storefront.model;

import com.store.storefront.trending.Trending;
import jakarta.persistence.*;

import java.util.List;
@Entity
@Table(name = "categories")
public class Category {
    @Id
    @Column(name = "category_id")
    private int id;
    private String name;
    private String description;

    @OneToMany(mappedBy = "category", fetch =FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Trending> trending;
    public Category() {}

    public Category(int id, String name, String description) {
        this.id = id;
        this.name = name;
        this.description = description;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<Trending> getTrending() {
        return trending;
    }

    public void setTrending(List<Trending> trending) {
        this.trending = trending;
    }
}
