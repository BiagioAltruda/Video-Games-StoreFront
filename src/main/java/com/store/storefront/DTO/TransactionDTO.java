package com.store.storefront.DTO;

import com.store.storefront.model.CardDetails;
import com.store.storefront.model.Transaction;

public class TransactionDTO {
    private Transaction transaction;
    private CardDetails cardDetails;

    public TransactionDTO(Transaction transaction, CardDetails cardDetails) {
        this.transaction = transaction;
        this.cardDetails = cardDetails;
    }
    public TransactionDTO(){
    }

    public Transaction getTransaction() {
        return transaction;
    }

    public void setTransaction(Transaction transaction) {
        this.transaction = transaction;
    }

    public CardDetails getCardDetails() {
        return cardDetails;
    }

    public void setCardDetails(CardDetails cardDetails) {
        this.cardDetails = cardDetails;
    }
}
