package com.terramatch.service;

import com.terramatch.dto.ContractorDTOs.RecommendationResponse;
import com.terramatch.entity.ContractorProfile;
import com.terramatch.repository.ContractorProfileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AIRecommendationService {
    private final ContractorProfileRepository contractorRepo;

    public List<RecommendationResponse> getRecommendedContractors(List<String> requiredSkills) {
        List<ContractorProfile> contractors = contractorRepo.findByIsVerifiedTrue();

        return contractors.stream().map(contractor -> {
            // 1. Skill Match Score (50% weight)
            long matchedSkills = contractor.getSkills().stream()
                    .filter(skill -> requiredSkills.stream().anyMatch(rs -> rs.equalsIgnoreCase(skill)))
                    .count();
            double skillScore = requiredSkills.isEmpty() ? 1.0 : (double) matchedSkills / requiredSkills.size();

            // 2. Rating Score (30% weight, max 5.0)
            double ratingScore = contractor.getAvgRating() / 5.0;

            // 3. Experience Score (20% weight, normalized to 10 years)
            double expScore = Math.min(contractor.getYearsExperience() / 10.0, 1.0);

            // AI Weighted Formula
            double totalScore = (skillScore * 0.50) + (ratingScore * 0.30) + (expScore * 0.20);

            return new RecommendationResponse(
                    contractor.getUser().getName(),
                    contractor.getSkills(),
                    contractor.getAvgRating(),
                    contractor.getYearsExperience(),
                    Math.round(totalScore * 100.0) / 100.0
            );
        })
        .filter(dto -> dto.matchScore() > 0.2)
        .sorted(Comparator.comparingDouble(RecommendationResponse::matchScore).reversed())
        .collect(Collectors.toList());
    }
}