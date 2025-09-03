package com.store.storefront.Transaction;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface TransactionRepo extends JpaRepository<Transaction, Long> {
	
	
	List<Transaction> findByPlayerId(Long playerId);
	//metodi che servirebbero
}
