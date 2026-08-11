package com.terramatch.entity;

import jakarta.persistence.*;
import lombok.*;
import java.util.List;

/**
 * `isVerified` here means "eligible to appear in AI recommendations" —
 * a contractor-quality/trust gate, distinct from User.ghanaCardVerified
 * (identity verification). They're related but not the same thing:
 * ghanaCardVerified confirms who the person is; isVerified confirms
 * TerraMatch is willing to recommend them for work.
 *
 * Previously nothing in the codebase ever set isVerified=true, so
 * AIRecommendationService#getRecommendedContractors (which filters on
 * findByIsVerifiedTrue()) always returned an empty list — there was no
 * bug in the recommendation logic itself, just no path to the flag ever
 * flipping. For now, ContractorService#completeGhanaCardVerification
 * auto-sets isVerified=true the moment a contractor's Ghana Card is
 * verified, since that's the only verification signal this system has.
 * This is a reasonable default, not a permanent design decision — a
 * real admin-review workflow (see README "Known limitations") would
 * likely want its own explicit endpoint rather than piggybacking on
 * Ghana Card verification.
 */
@Entity
@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class ContractorProfile {
    @Id @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ElementCollection
    @Builder.Default
    private List<String> skills = List.of();

    @Builder.Default
    private boolean isVerified = false;

    @Builder.Default
    private int yearsExperience = 0;

    @Builder.Default
    private double avgRating = 0.0;
}
