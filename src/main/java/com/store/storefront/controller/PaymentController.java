package com.store.storefront.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/payment")
public class PaymentController {

    @PostMapping("/fake")
    public Map<String, Object> fakePayment(@RequestBody Map<String, Object> request) {
        Map<String, Object> response = new HashMap<>();

        String cardNumber = (String) request.get("cardNumber");

        if (cardNumber != null && cardNumber.startsWith("4")) { // esempio: carte VISA
            response.put("success", true);
            response.put("message", "Pagamento autorizzato");
        } else {
            response.put("success", false);
            response.put("message", "Carta non valida o rifiutata");
        }

        return response;
    }
}
