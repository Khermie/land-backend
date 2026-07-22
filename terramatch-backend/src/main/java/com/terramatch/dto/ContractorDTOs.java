package com.terramatch.dto;
import java.util.List;

public class ContractorDTOs {
    public record RecommendationResponse(String name, List<String> skills, double avgRating, int yearsExperience, double matchScore) {}
}