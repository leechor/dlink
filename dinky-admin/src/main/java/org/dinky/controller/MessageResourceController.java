package org.dinky.controller;

import lombok.AllArgsConstructor;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.annotation.SubscribeMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@AllArgsConstructor
public class MessageResourceController {

    private final SimpMessagingTemplate messagingTemplate;

    @MessageMapping("/broadcast")
    public String broadcast(String message) {
        return "back" + message;
    }

    @SubscribeMapping("/subscribe/{id}")
    public String subscribe(@DestinationVariable Long id) {
        return "success";
    }

    @MessageMapping("/one")
    public void one(String message, Principal principal) {
        messagingTemplate.convertAndSendToUser(principal.getName(), "/queue/one", message);
    }

}
