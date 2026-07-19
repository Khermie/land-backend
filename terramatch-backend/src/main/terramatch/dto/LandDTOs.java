package com.terramatch.dto;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;

public class LandDTOs {
    public record CreateLandRequest(@NotBlank String title, @NotBlank String description, String locationData, String floodRisk, @Positive double price) {}
    public record PlaceBidRequest(@NotBlank String landId, @Positive double amount) {}
}