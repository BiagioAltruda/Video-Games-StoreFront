package com.store.storefront;

import com.store.storefront.players_friends.Player;
import com.store.storefront.players_friends.PlayerService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.util.*;

@Controller
@RequestMapping("/smoke/")
public class LoginController {
    PlayerService service;
    public LoginController(PlayerService service) {
        this.service = service;
    }

    @ResponseBody
    @PostMapping("/register")
    public String register(@RequestParam String name, @RequestParam String password) {

        if (service.findByName(name) != null)
            return "A player with the same name already exists";
        Date date = new Date(); //get current timestamp
        long time = date.getTime();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss"); //format it in that pattern
        String str = sdf.format(time); //save it as string
        Player p =  new Player();
        p.setName(name);
        p.setPassword(password);
        //p.setCreation_date();
        service.newAccount(p);
        return "Account created successfully";
    }

    @ResponseBody
    @PostMapping("/login")
    public ResponseEntity<Player> login(@RequestParam String username, @RequestParam String password) {

        Player p = service.findByNameAndPass(username, password);
        if (p == null)
            return ResponseEntity.status(404).body(null);
        if (!password.equals(p.getPassword()))
            return ResponseEntity.status(404).body(null);;
        String token = UUID.randomUUID().toString();
        p.setToken(token);
        return ResponseEntity.ok(p);
    }
    @GetMapping("/profile")
    public ResponseEntity<Player> profile(@RequestHeader(value = "X-Token", required = false) String token, @RequestBody Player player) {
        if (token != null)
            return ResponseEntity.ok(player);
        return ResponseEntity.status(404).build();
    }
    @PostMapping("/logout")
    public ResponseEntity<String> logout(@RequestHeader(value = "X-Token", required = false) @RequestBody Player player) {
        player.setToken(null);
        return ResponseEntity.status(200).build();
    }
}
