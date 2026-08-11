package com.terramatch.service;

import com.terramatch.dto.ContractorDTOs.RecommendationResponse;
import com.terramatch.entity.ContractorProfile;
import com.terramatch.repository.ContractorProfileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.Locale;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AIRecommendationService {
    private final ContractorProfileRepository contractorRepo;

    public List<RecommendationResponse> getRecommendedContractors(List<String> requiredSkills) {
        List<String> normalizedSkills = requiredSkills == null ? List.of() : requiredSkills.stream()
                .filter(skill -> skill != null && !skill.isBlank())
                .map(skill -> skill.trim().toLowerCase(Locale.ROOT))
                .collect(Collectors.toList());

        return contractorRepo.findByIsVerifiedTrue().stream()
                .map(contractor -> {
                    List<String> contractorSkills = contractor.getSkills() == null ? List.of() : contractor.getSkills();
                    long matchedSkills = contractorSkills.stream()
                            .filter(skill -> skill != null)
                            .map(skill -> skill.trim().toLowerCase(Locale.ROOT))
                            .filter(normalizedSkills::contains)
                            .count();

                    double skillScore = normalizedSkills.isEmpty() ? 1.0 : (double) matchedSkills / normalizedSkills.size();
                    double ratingScore = Math.max(0.0, Math.min(1.0, contractor.getAvgRating() / 5.0));
                    double expScore = Math.max(0.0, Math.min(1.0, contractor.getYearsExperience() / 10.0));

                    double totalScore = (skillScore * 0.50) + (ratingScore * 0.30) + (expScore * 0.20);

                    return new RecommendationResponse(
                            contractor.getUser() != null ? contractor.getUser().getName() : "Unknown",
                            contractorSkills,
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