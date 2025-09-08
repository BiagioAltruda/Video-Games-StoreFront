package com.store.storefront.model;


import java.time.LocalDateTime;

<<<<<<< HEAD
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
=======
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;
>>>>>>> features-review-and-comments

@Entity
@Table(name = "transactions") // nome della tabella nel database
public class Transaction {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY) // auto-increment DB
	@Positive(message = "id cannot be negative")
	private Long id;
<<<<<<< HEAD
	
	@ManyToOne
	@JoinColumn(name = "player_id", nullable = false)
=======

	//The following 2 are the foreign keys for the games-players relation with extra attributes
	//Using the transaction table as the middle man
	@JsonIgnore //avoids looping
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "player_id")
>>>>>>> features-review-and-comments
	private Player player;

	@JsonIgnore
	@ManyToOne
	@JoinColumn(name = "game_id",nullable = false)
	private Game game;

<<<<<<< HEAD
	@Column(name = "price_paid",nullable = false)
	private double pricePaid;

	@Column(name="transaction_date",nullable = false)
=======

	@Column(name = "price_paid")
	@PositiveOrZero(message = "Cannot pay a negative amount")
	private double pricePaid;

	@Column(name="transaction_date")
	@Temporal(TemporalType.TIMESTAMP)
	@NotNull(message = "Account creation date cannot be null")
>>>>>>> features-review-and-comments
	private LocalDateTime date;

	//Constructors
	public Transaction() {

	}

	public Transaction(Long id, Player player, Game game, double pricePaid, LocalDateTime data) {
	
		this.id = id;
		this.player = player;
		this.game = game;
		this.pricePaid = pricePaid;
		this.date = data;
	}


	//Getters and Setters
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Player getPlayer() {
		return player;
	}

	public void setPlayer(Player player) {
		this.player = player;
	}

	public Game getGame() {
		return game;
	}

	public void setGame(Game game) {
		this.game = game;
	}

	public double getPricePaid() {
		return pricePaid;
	}

	public void setPricePaid(double pricePaid) {
		this.pricePaid = pricePaid;
	}

	public LocalDateTime getDate() {
		return date;
	}

	public void setDate(LocalDateTime date) {
		this.date = date;
	}

	

	

}
