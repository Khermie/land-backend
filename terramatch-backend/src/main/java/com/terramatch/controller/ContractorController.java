package com.terramatch.controller;

import com.terramatch.dto.ContractorDTOs.RecommendationResponse;
import com.terramatch.service.AIRecommendationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/api/contractors")
@RequiredArgsConstructor
public class ContractorController {
    private final AIRecommendationService aiService;

    @GetMapping("/recommend")
    public ResponseEntity<List<RecommendationResponse>> getRecommendations(@RequestParam String skills) {
        List<String> requiredSkills = Arrays.asList(skills.split(","));
        return ResponseEntity.ok(aiService.getRecommendedContractors(requiredSkills));
    }
}