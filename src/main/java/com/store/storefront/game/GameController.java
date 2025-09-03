package com.store.storefront.game;

import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(value = "*")
@RestController
@RequestMapping("/smoke/games")
public class GameController {

    GameService service;

    public GameController(GameService service) {
        this.service = service;
    }

    @GetMapping("/all")
    public List<Game> getAllGames(){
        return service.getAllGames();
    }

    @GetMapping("/{id}")
    public Game getGame(@PathVariable int id){
        return service.getGameById(id);
    }
    @GetMapping("/title/{name}")
    public Game getGamesByName(@PathVariable String name){
        return service.getGameByName(name);
    }
    @PostMapping("/add")
    public Game addGame(@RequestBody Game game){
        return service.save(game);
    }
    @PutMapping("/update")
    public Game updateGame(@RequestBody Game game){
        return service.save(game);
    }
    @DeleteMapping("/delete/{id}")
    public String deleteGame(@PathVariable int id){
        return service.deleteGameById(id);
    }

}
