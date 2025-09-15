package com.store.storefront.controller;

import java.util.ArrayList;
import java.util.List;

import com.store.storefront.DTO.TransactionDTO;
import com.store.storefront.DTO.TransactionRequest;
import com.store.storefront.model.Game;
import com.store.storefront.model.PaymentProcessor;
import com.store.storefront.model.Player;
import com.store.storefront.service.GameService;
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
	private final GameService gameService;

	public TransactionController(TransactionService transactionService, PlayerService playerService, GameService gameService) {
		this.transactionService = transactionService;
		this.playerService = playerService;
		this.gameService = gameService;
	}

	@GetMapping("/payment")
	public String paymentPage() {
		return "pages/Payment"; // /pages/Payment.html
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
	@GetMapping("player/{id}")
	public ResponseEntity<List<Game>> getTransactionsByPlayerId(@PathVariable Integer id) {
		List<Game> ownedGames = new ArrayList();
		List<Transaction> transactions = transactionService.getTransactionsByPlayerId(id);
		for (Transaction transaction : transactions) {
			ownedGames.add(transaction.getGame());
		}
		return ResponseEntity.ok(ownedGames);
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

	
	@PostMapping("/pay/{playerId}")
	public ResponseEntity<String> processPayment(@PathVariable Integer playerId, @RequestBody TransactionDTO dto) {
	    System.out.println("Ricevuto DTO: " + dto);

	    if (dto.getTransactionRequest() == null) {
	        return ResponseEntity.badRequest().body("❌ Transaction mancante");
	    }
	    if (dto.getCardDetails() == null) {
	        return ResponseEntity.badRequest().body("❌ Dati carta mancanti");
	    }

	    if (!PaymentProcessor.validate(dto.getCardDetails())) {
			return ResponseEntity.badRequest().body("❌ Pagamento fallito: carta non valida");
	    }
		TransactionRequest request = dto.getTransactionRequest();
		Transaction transaction = new  Transaction();
		Player player = playerService.findById(playerId);
		Game game = gameService.getGameById(request.getGameId());
		if(player == null){
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Player not found");
		}
		if(game == null){
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Game not found");
		}
		transaction.setPlayer(player);
		transaction.setGame(game);
		transaction.setPricePaid(request.getPricePaid());
		transaction.setDate(request.getDate());
		Transaction savedTransaction = transactionService.createTransaction(transaction);
		return ResponseEntity.ok("✅ Pagamento riuscito per transazione ID: " + savedTransaction.getId());
	}
}