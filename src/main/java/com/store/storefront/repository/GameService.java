package com.store.storefront.repository;

import com.store.storefront.model.Game;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GameService{

    private final GameRepo repo;
    public GameService(GameRepo repo) {
        this.repo = repo;
    }

    public Game save(Game game){
        return repo.save(game);
    }
    public List<Game> getAllGames(){
        return repo.findAll();
    }
    public Game getGameById(int id){
        return repo.findById(id).orElse(null);
    }
    public Game getGameByName(String name){
        return repo.findGameByName(name);
    }
    public String deleteGameById(int id){
        if(repo.existsById(id)){
            repo.deleteById(id);
            return "Game deleted Successfully";
        }
        else
            return "Game not found";
    }

}
