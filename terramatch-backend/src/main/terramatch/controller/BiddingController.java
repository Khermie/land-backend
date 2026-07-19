package com.terramatch.controller;

import com.terramatch.entity.LandBid;
import com.terramatch.service.BiddingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/bids")
@RequiredArgsConstructor
public class BiddingController {
    private final BiddingService biddingService;

    @PostMapping
    public ResponseEntity<LandBid> placeBid(@RequestParam String landId, @RequestParam double amount, Authentication auth) {
        return ResponseEntity.ok(biddingService.placeBid(auth.getName(), landId, amount));
    }

    @GetMapping("/{landId}")
    public ResponseEntity<List<LandBid>> getBids(@PathVariable String landId) {
        return ResponseEntity.ok(biddingService.getBidsForLand(landId));
    }
}