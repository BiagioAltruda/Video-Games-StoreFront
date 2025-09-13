package com.store.storefront.repository;

import java.util.List;

import com.store.storefront.model.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


//Indica che questa interfaccia è un componente Spring di tipo Repository
//Serve per accedere e gestire i dati della tabella 'transaction'
@Repository
public interface TransactionRepo extends JpaRepository<Transaction, Long> {

 // Restituisce tutte le transazioni legate a un certo player (tramite il suo id)
 List<Transaction> findByPlayer_Id(Long playerId);

 // Restituisce tutte le transazioni legate a un certo game (tramite il suo id)
 List<Transaction> findByGame_Id(Long gameId);

 // Restituisce tutte le transazioni di un certo player ordinate per data decrescente (le più recenti prima)
 List<Transaction> findByPlayer_IdOrderByDateDesc(Long playerId);

 // Conta quante transazioni appartengono a un certo player
 long countByPlayer_Id(Long playerId);
}
