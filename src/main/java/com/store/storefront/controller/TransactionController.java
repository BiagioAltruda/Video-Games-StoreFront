package com.store.storefront.controller;

import java.util.List;

import com.store.storefront.DTO.TransactionDTO;
import com.store.storefront.model.PaymentProcessor;
import com.store.storefront.service.PlayerService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.store.storefront.model.Transaction;
import com.store.storefront.service.TransactionService;

@RestController
@RequestMapping("smoke/transactions")
@CrossOrigin("*")
public class TransactionController {

	private final TransactionService transactionService;
	private final PlayerService playerService;

	public TransactionController(TransactionService transactionService, PlayerService playerService) {
		this.transactionService = transactionService;
		this.playerService = playerService;
	}

	@GetMapping("/payment")
	public String paymentPage() {
		return "pages/Payment"; // -> src/main/resources/templates/pages/Payment.html
	}

	// restituisce tutte le transazioni
	@GetMapping
	public List<Transaction> getAllTransaction() {
		return transactionService.getAllTransactions();
	}

	// restituisce transazione per id
	// Una transazione per id (404 se non esiste)
	@GetMapping("/{id}")
	public ResponseEntity<Transaction> getTransactionById(@PathVariable Long id) {
		Transaction trans = transactionService.getTransactionById(id); // nel service ora può tornare null
		if (trans == null)
			return ResponseEntity.notFound().build();
		return ResponseEntity.ok(trans);
	}

	// Crea (201 Created)
	@PostMapping("/transactions") // for debugging
	public ResponseEntity<Transaction> createTransaction(@RequestBody Transaction transaction) {
		Transaction saved = transactionService.createTransaction(transaction);
		return ResponseEntity.status(HttpStatus.CREATED).body(saved); // costruisce una risposta http, la salva,
		// controlla lo status
	}

	// Aggiorna (404 se non esiste)
	@PutMapping("/{id}")
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

	// Endpoint POST che si attiva con una richiesta a /pay/{playerId}
	// Serve per processare un pagamento associato a un certo player
	@PostMapping("/pay/{playerId}")
	public ResponseEntity<String> processPayment(@PathVariable Integer playerId, @RequestBody TransactionDTO dto) {

		// Debug: stampa a console il contenuto del DTO ricevuto
		System.out.println("Ricevuto DTO: " + dto);

		// 1. Controllo: se non è stata passata la transazione -> errore 400
		if (dto.getTransaction() == null) {
			return ResponseEntity.badRequest().body(" Transaction mancante");
		}

		// 2. Controllo: se non sono stati passati i dati della carta -> errore 400
		if (dto.getCardDetails() == null) {
			return ResponseEntity.badRequest().body(" Dati carta mancanti");
		}

		// 3. Validazione carta con PaymentProcessor
		if (PaymentProcessor.validate(dto.getCardDetails())) {

			// Se la carta è valida, si recupera il Player dal DB con il suo ID
			dto.getTransaction().setPlayer(playerService.findById(playerId));

			// Salva la transazione nel DB tramite il service
			Transaction transaction = transactionService.createTransaction(dto.getTransaction());

			// Risposta positiva con messaggio e ID della transazione
			return ResponseEntity.ok(" Pagamento riuscito per transazione ID: " + transaction.getId());
		}

		// 4. Se la carta non è valida -> errore 400
		return ResponseEntity.badRequest().body(" Pagamento fallito: carta non valida");
	}
}