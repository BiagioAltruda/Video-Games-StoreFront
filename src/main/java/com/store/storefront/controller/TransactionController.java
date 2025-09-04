package com.store.storefront.controller;

import java.util.List;

import com.store.storefront.model.Transaction;
import com.store.storefront.repository.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.store.storefront.model.Transaction;
import com.store.storefront.repository.TransactionService;

import com.store.storefront.model.Transaction;
import com.store.storefront.repository.TransactionService;

@RestController
@RequestMapping("/transactions")
public class TransactionController {

    @Autowired
    private TransactionService transactionService;

    // restituisce tutte le transazioni
    @GetMapping
    public List<Transaction> getAllTransaction() {
        return transactionService.getAllTransactions();
    }

    // restituisce transazione per id
    @GetMapping("/{id}")
    public Transaction getTransactionById(@PathVariable Long id) {
        return transactionService.getTransactionById(id);
    }

    // crea transazione
    @PostMapping
    public Transaction createTransaction(@RequestBody Transaction transaction) {
        return transactionService.createTransaction(transaction);
    }

    // aggiorna transazione
    @PutMapping("/{id}")
    public Transaction updateTransaction(@PathVariable Long id, @RequestBody Transaction transaction) {
        return transactionService.updateTransaction(id, transaction);
    }

    // elimina transazione
    @DeleteMapping("/{id}")
    public void deleteTransaction(@PathVariable Long id) {
        transactionService.deleteTransaction(id);
    }

    // simulazione di pagamento (mock)
    @PostMapping("/pay/{id}")
    public String processPayment(@PathVariable Long id,
                                 @RequestParam String cardholderName,
                                 @RequestParam String cardNumber,
                                 @RequestParam String expirationDate,
                                 @RequestParam String cvv) {
        // mock pagamento → qui potresti aggiornare lo stato della transazione se vuoi
        return "Pagamento riuscito per transazione ID: " + id;
    }
}