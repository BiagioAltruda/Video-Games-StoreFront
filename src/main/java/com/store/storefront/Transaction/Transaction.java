package com.store.storefront.Transaction;


import java.time.LocalDateTime;

import com.store.storefront.game.Game;
import com.store.storefront.players_friends.Player;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "transactions") // nome della tabella nel database
public class Transaction {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY) // auto-increment DB
	private Long id;
	
	@ManyToOne
	@JoinColumn(name = "player_id")
	private Player player;

	@ManyToOne
	@JoinColumn(name = "game_id")
	private Game game;

	@Column(name = "price_paid")
	private double pricePaid;

	@Column(name="transaction_date")
	private LocalDateTime date;

	public Transaction() {

	}

	public Transaction(Long id, Player player, Game game, double pricePaid, LocalDateTime data) {
	
		this.id = id;
		this.player = player;
		this.game = game;
		this.pricePaid = pricePaid;
		this.date = data;
	}

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

	public double getPricePayed() {
		return pricePaid;
	}

	public void setPricePayed(double pricePayed) {
		this.pricePaid = pricePayed;
	}

	public LocalDateTime getData() {
		return date;
	}

	public void setData(LocalDateTime data) {
		this.date = data;
	}

	

	

}
