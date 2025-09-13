package com.store.storefront.model;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.time.LocalDate;

public class CardDetails {
    private String cardNumber;
    private String cardHolderName;
    @JsonFormat(pattern = "M/d/yyyy")
    private LocalDate cardExpiry;
    private String cardCVV;

    public CardDetails(String cardNumber, String cardHolderName, LocalDate cardExpiry, String cardCVV) {
        this.cardNumber = cardNumber;
        this.cardHolderName = cardHolderName;
        this.cardExpiry = cardExpiry;
        this.cardCVV = cardCVV;
    }

    public CardDetails() {}


    public String getCardNumber() {
        return cardNumber;
    }

    public void setCardNumber(String cardNumber) {
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

    public String getCardCVV() {
        return cardCVV;
    }

    public void setCardCVV(String cardCVV) {
        this.cardCVV = cardCVV;
    }

    @Override
    public String toString() {
        return "CardDetails{" +
                "cardNumber='" + cardNumber + '\'' +
                ", cardHolderName='" + cardHolderName + '\'' +
                ", cardExpiry=" + cardExpiry +
                ", cardCVV='" + cardCVV + '\'' +
                '}';
    }
}
