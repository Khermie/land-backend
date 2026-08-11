package com.terramatch.controller;

import com.terramatch.dto.BiddingDTOs.BidResponse;
import com.terramatch.service.BiddingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import java.util.List;

/**
 * NOTE for frontend integration: this endpoint takes landId/amount as
 * query parameters (?landId=...&amount=...), NOT a JSON request body —
 * LandDTOs.PlaceBidRequest exists but was never actually wired up here.
 * Left as query params rather than switched to match the unused DTO,
 * since changing the wire format is a breaking change with no
 * functional benefit; the frontend's bid API client just needs to
 * build the request accordingly (see land-owner.md / bidApi.js).
 */
@RestController
@RequestMapping("/api/bids")
@RequiredArgsConstructor
public class BiddingController {
    private final BiddingService biddingService;

    @PostMapping
    public ResponseEntity<BidResponse> placeBid(@RequestParam String landId, @RequestParam double amount, Authentication auth) {
        return ResponseEntity.ok(biddingService.placeBid(auth.getName(), landId, amount));
    }

    @GetMapping("/{landId}")
    public ResponseEntity<List<BidResponse>> getBids(@PathVariable String landId) {
        return ResponseEntity.ok(biddingService.getBidsForLand(landId));
    }
}
