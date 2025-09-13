package com.store.storefront.DTO;

import com.store.storefront.model.CardDetails;

public class TransactionDTO {
    private TransactionRequest transactionRequest;
    private CardDetails cardDetails;

    public TransactionDTO(TransactionRequest transactionRequest, CardDetails cardDetails) {
        this.transactionRequest = transactionRequest;
        this.cardDetails = cardDetails;
    }
    public TransactionDTO(){
    }

    public TransactionRequest getTransactionRequest() {
        return transactionRequest;
    }

    public void setTransactionRequest(TransactionRequest transactionRequest) {
        this.transactionRequest = transactionRequest;
    }

    public CardDetails getCardDetails() {
        return cardDetails;
    }

    public void setCardDetails(CardDetails cardDetails) {
        this.cardDetails = cardDetails;
    }

    @Override
    public String toString() {
        return "TransactionDTO{" +
                "transactionRequest=" + transactionRequest +
                ", cardDetails=" + cardDetails +
                '}';
    }
}
