package com.store.storefront.trending;  //il mio amato model <3

import java.sql.Date;



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

@Entity
@Table (name="trending") //connettiamo alla tab del db

public class Trending {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY) // auto-increment DB
	
	private Integer id;
	
	
	@ManyToOne
	@JoinColumn(name="id_games")
	private Game game;
	
	@ManyToOne
	@JoinColumn(name="id_categories")
	private Category category;
	
	@Column (name="period")
	private Date period;
	
	public Trending () {
		//costruttore vuoto
	}
       
	
	//costruttore pieno
	public Trending(Integer id, Game game, Category category, Date period) {
		this.id = id;
		this.game = game;
		this.category = category;
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


	public Category getCategories() {
		return category;
	}


	public void setCategories(Category category) {
		this.category = category;
	}


	public Date getPeriod() {
		return period;
	}


	public void setPeriod(Date period) {
		this.period = period;
	}   
	
	
	
	
}
