package com.terramatch.controller;

import com.terramatch.dto.ContractorDTOs.ContractorProfileResponse;
import com.terramatch.dto.ContractorDTOs.RecommendationResponse;
import com.terramatch.dto.ContractorDTOs.UpdateContractorProfileRequest;
import com.terramatch.service.AIRecommendationService;
import com.terramatch.service.ContractorService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/api/contractors")
@RequiredArgsConstructor
public class ContractorController {
    private final AIRecommendationService aiService;
    private final ContractorService contractorService;

    /**
     * `skills` is now optional (was required — a call with no query
     * string used to 400 before this reached AIRecommendationService
     * at all). Browsing all verified contractors with no skill filter
     * is a legitimate use case for a "browse contractors" page, so an
     * absent/blank param now just means "match on rating/experience
     * only" rather than being an error.
     */
    @GetMapping("/recommend")
    public ResponseEntity<List<RecommendationResponse>> getRecommendations(
            @RequestParam(required = false) String skills
    ) {
        List<String> requiredSkills = (skills == null || skills.isBlank())
                ? List.of()
                : Arrays.asList(skills.split(","));
        return ResponseEntity.ok(aiService.getRecommendedContractors(requiredSkills));
    }

    /**
     * New. Lets a signed-in contractor read and update the profile
     * fields (skills, years of experience) that AIRecommendationService
     * scores against — see ContractorService for why this write path
     * didn't exist before. `auth.getName()` resolves to the signed-in
     * user's email; a contractor can only ever read/update their own
     * profile, never another user's, since there's no path here to
     * target anyone else's ID.
     */
    @GetMapping("/me")
    public ResponseEntity<ContractorProfileResponse> getMyProfile(Authentication auth) {
        return ResponseEntity.ok(contractorService.getMyProfile(auth.getName()));
    }

    @PutMapping("/me")
    public ResponseEntity<ContractorProfileResponse> updateMyProfile(
            @Valid @RequestBody UpdateContractorProfileRequest request, Authentication auth
    ) {
        return ResponseEntity.ok(contractorService.updateMyProfile(auth.getName(), request));
    }
}
