package com.store.storefront.controller;

import java.util.List;

import com.store.storefront.model.Transaction;
import com.store.storefront.service.TransactionService;

import org.springframework.beans.factory.annotation.Autowired;
<<<<<<< HEAD
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

=======
import org.springframework.validation.annotation.Validated;
>>>>>>> features-review-and-comments
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping
@CrossOrigin("*")
public class TransactionController {

	@Autowired
	private TransactionService transactionService;

	public TransactionController(TransactionService transactionService) {
		this.transactionService = transactionService;
	}
	
	 @GetMapping("/payment")
	    public String paymentPage() {
	        return "pages/Payment";  // -> src/main/resources/templates/pages/Payment.html
	    }

	// restituisce tutte le transazioni
	@GetMapping("/transactions")
	public List<Transaction> getAllTransaction() {
		return transactionService.getAllTransactions();
	}

<<<<<<< HEAD
	// restituisce transazione per id
	// Una transazione per id (404 se non esiste)
	@GetMapping("/transactions/{id}")
	public ResponseEntity<Transaction> getTransactionById(@PathVariable Long id) {
		Transaction trans = transactionService.getTransactionById(id); // nel service ora può tornare null
		if (trans == null)
			return ResponseEntity.notFound().build();
		return ResponseEntity.ok(trans);
	}

	// Crea (201 Created)
	@PostMapping("/transactions")
	public ResponseEntity<Transaction> createTransaction(@RequestBody Transaction transaction) {
		Transaction saved = transactionService.createTransaction(transaction);
		return ResponseEntity.status(HttpStatus.CREATED).body(saved); // costruisce una risposta http, la salva,
																		// controlla lo status
	}
=======
    // crea transazione
    @PostMapping
    public Transaction createTransaction(@Validated @RequestBody Transaction transaction) {
        return transactionService.createTransaction(transaction);
    }

    // aggiorna transazione
    @PutMapping("/{id}")
    public Transaction updateTransaction(@PathVariable Long id, @Validated @RequestBody Transaction transaction) {
        return transactionService.updateTransaction(id, transaction);
    }
>>>>>>> features-review-and-comments

	// Aggiorna (404 se non esiste)
	@PutMapping("/transactions/{id}")
	public ResponseEntity<Transaction> updateTransaction(@PathVariable Long id, @RequestBody Transaction transaction) {
		try {
			Transaction updated = transactionService.updateTransaction(id, transaction);
			return ResponseEntity.ok(updated);
		} catch (RuntimeException ex) { // "Transaction not found brother"
			return ResponseEntity.notFound().build();
		}
	}

	// Elimina (204 No Content)
	@DeleteMapping("/transactions/{id}")
	public ResponseEntity<Void> deleteTransaction(@PathVariable Long id) {
		transactionService.deleteTransaction(id);
		return ResponseEntity.noContent().build();
	}

	// simulazione di pagamento (mock)
	@PostMapping("/transactions/pay/{id}")
	public String processPayment(@PathVariable Long id) {
		
		// transactionService.markAsPaid(id); // aggiorna la transazione (data/stato) e salva
		// mock pagamento → qui potresti aggiornare lo stato della transazione se vuoi
		return "Pagamento riuscito per transazione ID: " + id;
	}
}