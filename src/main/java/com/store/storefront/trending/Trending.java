package com.store.storefront.trending;  //il mio amato model <3

import java.sql.Date;
import java.util.List;

<<<<<<< HEAD


import jakarta.persistence.Id;

import com.store.storefront.model.Category;
import com.store.storefront.model.Game;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
=======
import org.springframework.data.annotation.Id;

import jakarta.persistence.*;
import com.store.storefront.model.Game;
import com.store.storefront.model.Category;
>>>>>>> c11ea1cfab97bb19a51f6c38676075f40899f2f9

@Entity
@Table (name="trending") //connettiamo alla tab del db

public class Trending {

    @jakarta.persistence.Id
    @Id
	@GeneratedValue(strategy = GenerationType.IDENTITY) // auto-increment DB
	@Column(insertable=false, updatable=false)
	private Integer id;
	
	
	@ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	@JoinColumn(name = "game_id", nullable = false)
	private Game game;
	
<<<<<<< HEAD
	@ManyToOne
	@JoinColumn(name="id_categories")
=======
	@ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	@JoinColumn(name = "category_id", nullable = false)
>>>>>>> c11ea1cfab97bb19a51f6c38676075f40899f2f9
	private Category category;
	
	@Column (name="period")
	private Date period;
	
	public Trending () {
		//costruttore vuoto
	}
       
	
	//costruttore pieno
<<<<<<< HEAD
	public Trending(Integer id, Game game, Category category, Date period) {
		this.id = id;
		this.game = game;
		this.category = category;
=======
	public Trending(Integer id, Game game, Category categories, Date period) {
		this.id = id;
		this.game = game;
		this.category = categories;
>>>>>>> c11ea1cfab97bb19a51f6c38676075f40899f2f9
		this.period = period;
	}

//Getters & Setters
	public Integer getId() {
		return id;
	}


	public void setId(Integer id) {
		this.id = id;
	}


	public Game getGame() {
		return game;
	}


	public void setGame(Game game) {
		this.game = game;
	}


<<<<<<< HEAD
	public Category getCategories() {
=======
	public Category getCategory() {
>>>>>>> c11ea1cfab97bb19a51f6c38676075f40899f2f9
		return category;
	}


<<<<<<< HEAD
	public void setCategories(Category category) {
=======
	public void setCategory(Category category) {
>>>>>>> c11ea1cfab97bb19a51f6c38676075f40899f2f9
		this.category = category;
	}


	public Date getPeriod() {
		return period;
	}


	public void setPeriod(Date period) {
		this.period = period;
	}

}
