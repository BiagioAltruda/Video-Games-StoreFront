package com.store.storefront.service;

import java.util.List;

import com.store.storefront.model.Transaction;
import com.store.storefront.repository.TransactionRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;



@Service
public class TransactionService {

	private final TransactionRepo transactionRepo;
	
	@Autowired
    public TransactionService(TransactionRepo transactionRepo) {
        this.transactionRepo = transactionRepo;
    }

	// Metodo per ottenere tutte le transazioni dal DB
	public List<Transaction> getAllTransactions() {
		return transactionRepo.findAll();

	}

	// Metodo per ottenere una transazione tramite id

	public Transaction getTransactionById(Long id) {

		return transactionRepo.findById(id).orElse(null);
	}

	// Metodo per creare una nuova transazione
	public Transaction createTransaction(Transaction transaction) {
		transaction.setDate(java.time.LocalDateTime.now());
		return transactionRepo.save(transaction); //// save() inserisce un nuovo record se l'id è null,
	}
	
	
//aggiorna per id
	public Transaction updateTransaction(Long id, Transaction updateTransaction) {
		            //existing = esiste
		Transaction existing = transactionRepo.findById(id).orElse(null);        //cerco la transazione 
		   // Se non esiste lancio un errore
		if (existing == null) {
			throw new RuntimeException("Transaction not found brother");
			
		}
		//se esiste la transazione aggiorno i dati
		existing.setDate(updateTransaction.getDate());
		existing.setGame(updateTransaction.getGame());
		existing.setPlayer(updateTransaction.getPlayer());
		existing.setPricePaid(updateTransaction.getPricePaid());
		
		return transactionRepo.save(existing);   //salvo nel DB la transaction

	}

	// elimina una transazione
	public void deleteTransaction(Long id) {

		transactionRepo.deleteById(id);

	}

	public List<Transaction> getTransactionsByPlayerId(Integer playerId) {
		return transactionRepo.findByPlayer_Id(playerId);
	}


}
