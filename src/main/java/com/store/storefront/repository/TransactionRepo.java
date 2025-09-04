package com.store.storefront.repository;

import java.util.List;

import com.store.storefront.model.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface TransactionRepo extends JpaRepository<Transaction, Long> {
	
	
	List<Transaction> findByPlayerId(Long playerId);
	
}
