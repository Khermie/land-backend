package com.terramatch.controller;

import com.terramatch.dto.LandDTOs.CreateLandRequest;
import com.terramatch.dto.LandDTOs.LandListingResponse;
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
    public ResponseEntity<LandListingResponse> createLand(@Valid @RequestBody CreateLandRequest request, Authentication auth) {
        return ResponseEntity.ok(landService.createLand(auth.getName(), request));
    }

    // Public — see SecurityConfig: browsing listings doesn't require a
    // signed-in user, matching the frontend's public Explore Land page.
    @GetMapping
    public ResponseEntity<List<LandListingResponse>> getAllLands() {
        return ResponseEntity.ok(landService.getAllLands());
    }
}
