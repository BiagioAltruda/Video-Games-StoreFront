package com.store.storefront.repository;

import java.util.List;

import com.store.storefront.model.Transaction;
import org.apache.catalina.startup.Tomcat.ExistingStandardWrapper;
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

	// Metodo per creare una nuova transazione
	public Transaction createTransaction(Transaction transaction) {

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
		existing.setData(updateTransaction.getData());
		existing.setGame(updateTransaction.getGame());
		existing.setPlayer(updateTransaction.getPlayer());
		existing.setPricePaid(updateTransaction.getPricePaid());
		
		return transactionRepo.save(existing);   //salvo nel DB la transaction

	}

	// elimina una transazione
	public void deleteTransaction(Long id) {

		transactionRepo.deleteById(id);

	}

}
