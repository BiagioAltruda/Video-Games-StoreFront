package com.store.storefront.repository;

import java.util.List;

import com.store.storefront.model.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface TransactionRepo extends JpaRepository<Transaction, Long> {
	
	
	List<Transaction> findByPlayer_Id(Long playerId);
	
	List<Transaction> findByGame_Id(Long gameId);
	
	List<Transaction> findByPlayer_IdOrderByDateDesc(Long playerId);
	
	long countByPlayer_Id(Long playerId);
	
}
