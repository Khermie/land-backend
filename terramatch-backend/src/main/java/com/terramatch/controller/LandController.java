package com.terramatch.controller;

import com.terramatch.dto.LandDTOs.CreateLandRequest;
import com.terramatch.entity.LandListing;
import com.terramatch.service.LandService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/lands")
@RequiredArgsConstructor
public class LandController {
    private final LandService landService;

    @PostMapping
    public ResponseEntity<LandListing> createLand(@Valid @RequestBody CreateLandRequest request, Authentication auth) {
        return ResponseEntity.ok(landService.createLand(auth.getName(), request));
    }

    @GetMapping
    public ResponseEntity<List<LandListing>> getAllLands() {
        return ResponseEntity.ok(landService.getAllLands());
    }
}