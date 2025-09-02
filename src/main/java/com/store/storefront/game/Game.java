package com.store.storefront.game;

import jakarta.persistence.*;

import java.sql.Blob;
import java.sql.Date;

@Table(name = "games")
public class Game {

    @Id
    @GeneratedValue
    @Column(name = "appid")
    private int id;

    String name;
    String developer;
    double price;
    String genre;
    @Column(name = "release_date")
    Date releaseDate;
    String description;
    int rating;
    Blob banner;
    public void setId(int id) {
        this.id = id;
    }

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDeveloper() {
        return developer;
    }

    public void setDeveloper(String developer) {
        this.developer = developer;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getGenre() {
        return genre;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }

    public Date getReleaseDate() {
        return releaseDate;
    }

    public void setReleaseDate(Date releaseDate) {
        this.releaseDate = releaseDate;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }

    public Blob getBanner() {
        return banner;
    }

    public void setBanner(Blob banner) {
        this.banner = banner;
    }
}
