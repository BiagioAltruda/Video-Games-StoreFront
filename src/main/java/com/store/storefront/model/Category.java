package com.store.storefront.model;

import com.store.storefront.trending.Trending;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;

import java.util.List;
@Entity
@Table(name = "categories") //Categories table maanged the various tags a game can have
public class Category {
    @Id
    @Column(name = "category_id")
    @Positive(message = "id cannot be negative")
    private int id;
    @NotBlank(message = "category name cannot be blank")
    private String name;
    @NotBlank(message = "category description cannot be blank")
    private String description;

    @OneToMany(mappedBy = "category", fetch =FetchType.LAZY, cascade = CascadeType.ALL) //One to Many relationship with the trending table
    private List<Trending> trending;
    //empty constructor for Spring's sake
    public Category() {}


    public Category(int id, String name, String description) {
        this.id = id;
        this.name = name;
        this.description = description;
    }

    //getters and setters
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
