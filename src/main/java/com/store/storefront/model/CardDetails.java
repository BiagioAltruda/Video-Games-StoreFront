package com.store.storefront.model;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.time.LocalDate;

public class CardDetails {
    private int cardNumber;
    private String cardHolderName;
    @JsonFormat(pattern = "M/d/yyyy")
    private LocalDate cardExpiry;
    private int cardCVV;

    public CardDetails(int cardNumber, String cardHolderName, LocalDate cardExpiry, int cardCVV) {
        this.cardNumber = cardNumber;
        this.cardHolderName = cardHolderName;
        this.cardExpiry = cardExpiry;
        this.cardCVV = cardCVV;
    }

    public CardDetails() {}


    public int getCardNumber() {
        return cardNumber;
    }

    public void setCardNumber(int cardNumber) {
        this.cardNumber = cardNumber;
    }

    public String getCardHolderName() {
        return cardHolderName;
    }

    public void setCardHolderName(String cardHolderName) {
        this.cardHolderName = cardHolderName;
    }

    public LocalDate getCardExpiry() {
        return cardExpiry;
    }

    public void setCardExpiry(LocalDate cardExpiry) {
        this.cardExpiry = cardExpiry;
    }

    public int getCardCVV() {
        return cardCVV;
    }

    public void setCardCVV(int cardCVV) {
        this.cardCVV = cardCVV;
    }
}
