package com.store.storefront;

import com.store.storefront.players_friends.Player;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Controller
@RequestMapping("/smoke/")
public class LoginController {
    private Set<String> validSessions = new HashSet<>();
    private PlayerService service;
    public LoginController(PlayerService service) {
        this.service = service;
    }

    @PostMapping("/register")
    public String register(@RequestParam String name, @RequestParam String password) {
        Date date = new Date(); //get current timestamp
        long time = date.getTime();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss"); //format it in that pattern
        String str = sdf.format(time); //save it as string
        Player p =  new Player();
        p.setName(name);
        p.setPassword(password);
        service.save(p);
        return "Player saved Successfully";
    }

    @PostMapping("/login")
    public String login(@RequestParam String username, @RequestParam String password) {

        Player p = service.findPlayerByNameAndPassword(username, password);
        if (p == null)
            return "Invalid username or password";
        String token = UUID.randomUUID().toString();
        validSessions.add(token);
        return token;
    }

}
