package com.store.storefront.DTO;

import java.time.LocalDateTime;

public class TransactionRequest { //Intermediate class to format requests
    private Integer playerId;  //correctly
    private Integer gameId;
    private double pricePaid;
    private LocalDateTime date;

    public TransactionRequest() {}

    public TransactionRequest(Integer playerId, Integer gameId, double pricePaid, LocalDateTime date) {
        this.playerId = playerId;
        this.gameId = gameId;
        this.pricePaid = pricePaid;
        this.date = date;
    }

    public Integer getPlayerId() { return playerId; }
    public void setPlayerId(Integer playerId) { this.playerId = playerId; }

    public Integer getGameId() { return gameId; }
    public void setGameId(Integer gameId) { this.gameId = gameId; }

    public double getPricePaid() { return pricePaid; }
    public void setPricePaid(double pricePaid) { this.pricePaid = pricePaid; }

    public LocalDateTime getDate() { return date; }
    public void setDate(LocalDateTime date) { this.date = date; }

    @Override
    public String toString() {
        return "TransactionRequest{" +
                "playerId=" + playerId +
                ", gameId=" + gameId +
                ", pricePaid=" + pricePaid +
                ", date=" + date +
                '}';
    }
}
