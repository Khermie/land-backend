package com.terramatch.service;

import com.terramatch.dto.ContractorDTOs.ContractorProfileResponse;
import com.terramatch.dto.ContractorDTOs.UpdateContractorProfileRequest;
import com.terramatch.entity.ContractorProfile;
import com.terramatch.entity.Role;
import com.terramatch.entity.User;
import com.terramatch.repository.ContractorProfileRepository;
import com.terramatch.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

/**
 * New in the auth-integration pass. Previously nothing could ever
 * update a ContractorProfile after AuthService created it empty at
 * registration — no endpoint touched skills/yearsExperience at all, so
 * AIRecommendationService had real profiles to score but no way for
 * anyone to have filled them in. This is the missing write path.
 */
@Service
@RequiredArgsConstructor
public class ContractorService {
    private final ContractorProfileRepository contractorRepo;
    private final UserRepository userRepo;

    public ContractorProfileResponse getMyProfile(String email) {
        ContractorProfile profile = requireProfile(email);
        return toResponse(profile);
    }

    public ContractorProfileResponse updateMyProfile(String email, UpdateContractorProfileRequest request) {
        ContractorProfile profile = requireProfile(email);

        if (request.skills() != null) {
            profile.setSkills(request.skills());
        }
        if (request.yearsExperience() != null) {
            profile.setYearsExperience(request.yearsExperience());
        }
        contractorRepo.save(profile);
        return toResponse(profile);
    }

    private ContractorProfile requireProfile(String email) {
        User user = userRepo.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
        if (user.getRole() != Role.CONTRACTOR) {
            throw new RuntimeException("Only contractor accounts have a contractor profile");
        }
        // Registering as CONTRACTOR always creates a ContractorProfile
        // in the same transaction (see AuthService#register), so a
        // missing profile here means the account predates that logic
        // or the data is otherwise inconsistent — surfaced as a normal
        // 400 rather than a silent auto-create, since auto-creating
        // here would mask that inconsistency instead of catching it.
        return contractorRepo.findByUser(user)
                .orElseThrow(() -> new RuntimeException("Contractor profile not found for this account"));
    }

    private ContractorProfileResponse toResponse(ContractorProfile profile) {
        return new ContractorProfileResponse(
                profile.getId(),
                profile.getUser() != null ? profile.getUser().getName() : null,
                profile.getSkills(),
                profile.getYearsExperience(),
                profile.getAvgRating(),
                profile.isVerified()
        );
    }
}
