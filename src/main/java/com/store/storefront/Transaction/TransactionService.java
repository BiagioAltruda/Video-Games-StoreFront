package com.store.storefront.Transaction;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

@Service
public class TransactionService {

	private TransactionRepo transactionRepo;

	// Metodo per ottenere tutte le transazioni dal DB
	public List<Transaction> getAllTransactions() {
		return transactionRepo.findAll();

	}

	// Metodo per ottenere una transazione tramite id

	public Transaction getIdTransactions(Long id) {

		return transactionRepo.findById(id).orElse(null);
	}

	
	  //  Metodo per creare una nuova transazione
    public Transaction createTransaction(Transaction transaction) {
      
        return transactionRepo.save(transaction);    //// save() inserisce un nuovo record se l'id è null,
}
    }
