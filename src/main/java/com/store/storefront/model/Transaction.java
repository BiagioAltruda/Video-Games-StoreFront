package com.store.storefront.model;


import java.time.LocalDateTime;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;

@Entity
@Table(name = "transactions") // nome della tabella nel database
public class Transaction {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY) // auto-increment DB
	@Positive(message = "id cannot be negative")
	private Long id;
	
	@ManyToOne
	@JoinColumn(name = "player_id")
	private Player player;

	@ManyToOne
	@JoinColumn(name = "game_id")
	private Game game;

	@Column(name = "price_paid")
	@PositiveOrZero(message = "Cannot pay a negative amount")
	private double pricePaid;

	@Column(name="transaction_date")
	@Temporal(TemporalType.TIMESTAMP)
	@NotNull(message = "Account creation date cannot be null")
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

	public LocalDateTime getData() {
		return date;
	}

	public void setData(LocalDateTime data) {
		this.date = data;
	}

	

	

}
