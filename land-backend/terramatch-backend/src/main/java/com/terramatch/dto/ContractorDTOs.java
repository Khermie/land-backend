package com.terramatch.dto;

import jakarta.validation.constraints.Min;
import java.util.List;

public class ContractorDTOs {
    public record RecommendationResponse(String name, List<String> skills, double avgRating, int yearsExperience, double matchScore) {}

    /**
     * PUT /api/contractors/me — lets a signed-in CONTRACTOR fill in the
     * profile fields AIRecommendationService actually scores on. Before
     * this endpoint existed, ContractorProfile was created empty at
     * registration (see AuthService#register) and nothing could ever
     * update it, so skills/yearsExperience stayed at their defaults
     * forever. All fields optional/nullable so a contractor can update
     * just one thing (e.g. add a skill) without resending everything.
     */
    public record UpdateContractorProfileRequest(
            List<String> skills,
            @Min(0) Integer yearsExperience
    ) {}

    public record ContractorProfileResponse(
            String id,
            String name,
            List<String> skills,
            int yearsExperience,
            double avgRating,
            boolean isVerified
    ) {}
}
