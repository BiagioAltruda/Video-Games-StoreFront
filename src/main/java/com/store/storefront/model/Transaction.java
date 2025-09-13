package com.store.storefront.model;


import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;


@Entity
@Table(name = "transactions") // nome della tabella nel database
public class Transaction {

	@JsonIgnore
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY) // auto-increment DB
	@Positive(message = "id cannot be negative")
	private Long id;


	// Relazione Many-to-One: molte transazioni possono appartenere a un singolo player
	// fetch = FetchType.LAZY -> il Player associato verrà caricato dal DB solo quando richiesto
	@ManyToOne(fetch = FetchType.LAZY)  

	// Specifica la colonna di join nella tabella 'transaction' che fa da foreign key verso la tabella 'player'
	// In questo caso la colonna 'player_id' nella tabella 'transaction' referenzia la primary key di 'player'
	@JoinColumn(name = "player_id")  

	// Rappresenta il riferimento all'entità Player collegata a questa transazione
	private Player player;

	@ManyToOne
	@JoinColumn(name = "game_id",nullable = false)
	private Game game;


	@Column(name = "price_paid")
	@PositiveOrZero(message = "Cannot pay a negative amount")
	private double pricePaid;

	@Column(name="transaction_date")
	@Temporal(TemporalType.TIMESTAMP)
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
