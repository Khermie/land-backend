package com.terramatch.dto;

import com.terramatch.entity.LandListing;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import java.time.LocalDateTime;

public class LandDTOs {
    public record CreateLandRequest(@NotBlank String title, @NotBlank String description, String locationData, String floodRisk, @Positive double price) {}

    // PlaceBidRequest is unused by BiddingController (which reads
    // landId/amount as @RequestParam instead — see that controller's
    // own note) but left in place since it documents the intended
    // shape and nothing else in this codebase references it either way.
    public record PlaceBidRequest(@NotBlank String landId, @Positive double amount) {}

    /**
     * GET/POST /api/lands now returns this instead of the raw
     * LandListing entity. Previously the entity's full `owner` User
     * object was serialized as-is: with User.password now @JsonIgnore'd
     * that specific leak is closed, but the owner's phone number and
     * Ghana Card number were still going out to anyone browsing
     * listings once GET /api/lands became public in this pass (it used
     * to require a JWT, which accidentally limited exposure as a side
     * effect — see SecurityConfig's notes). This DTO exposes only what
     * a buyer legitimately needs to see about a listing's owner: who
     * they are, not their contact/verification details.
     */
    public record LandListingResponse(
            String id,
            String ownerId,
            String ownerName,
            boolean ownerGhanaCardVerified,
            String title,
            String description,
            String locationData,
            String floodRisk,
            double price,
            String status,
            LocalDateTime createdAt
    ) {
        public static LandListingResponse from(LandListing land) {
            return new LandListingResponse(
                    land.getId(),
                    land.getOwner() != null ? land.getOwner().getId() : null,
                    land.getOwner() != null ? land.getOwner().getName() : null,
                    land.getOwner() != null && land.getOwner().isGhanaCardVerified(),
                    land.getTitle(),
                    land.getDescription(),
                    land.getLocationData(),
                    land.getFloodRisk(),
                    land.getPrice(),
                    land.getStatus(),
                    land.getCreatedAt()
            );
        }
    }
}
