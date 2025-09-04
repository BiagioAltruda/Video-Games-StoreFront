package com.store.storefront.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.store.storefront.model.Transaction;
import com.store.storefront.repository.TransactionService;

@RestController
@RequestMapping("/transaction")
public class TransactionController {

	@Autowired
	private TransactionService transactionService;

	// restituisce tutte le transazioni
	@GetMapping
	public List<Transaction> getAllTransaction() {
		return transactionService.getAllTransactions();

	}
//restituito solo id della transazione
	@GetMapping("/{id}")
	public Transaction getIdTransaction(@PathVariable Long id) {

		return transactionService.getIdTransactions(id);
	}
//creazione della transazione
	@PostMapping
	public Transaction createTransaction(@RequestBody Transaction transaction) {

		return transactionService.createTransaction(transaction);

	}
//aggiornamento della transazione
	@PutMapping("/{id}")
	public Transaction updateTransaction(@PathVariable Long id, @RequestBody Transaction transaction) {
		
		return transactionService.updateTransaction(id, transaction);

	}
	//eliminazione della transazione
	@DeleteMapping("/{id}")
	public void  deleteTransaction(@PathVariable Long id) {
		
	 transactionService.deleteTransaction(id);
	}

}
