package com.terramatch.service;

import com.terramatch.dto.AuthDTOs.*;
import com.terramatch.entity.*;
import com.terramatch.repository.*;
import com.terramatch.security.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepo;
    private final ContractorProfileRepository contractorRepo;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider tokenProvider;

    public AuthResponse register(RegisterRequest request) {
        if (userRepo.existsByEmail(request.email())) throw new RuntimeException("Email already in use");

        User user = User.builder().name(request.name()).email(request.email())
                .password(passwordEncoder.encode(request.password())).role(request.role())
                .phone(request.phone()).build();
        userRepo.save(user);

        if (request.role() == Role.CONTRACTOR) {
            contractorRepo.save(ContractorProfile.builder().user(user).build());
        }
        return new AuthResponse(
                tokenProvider.generateToken(user.getEmail()),
                "Registration successful",
                UserResponse.from(user)
        );
    }

    public AuthResponse login(LoginRequest request) {
        User user = userRepo.findByEmail(request.email()).orElseThrow(() -> new RuntimeException("User not found"));
        if (!passwordEncoder.matches(request.password(), user.getPassword())) throw new RuntimeException("Invalid password");
        return new AuthResponse(
                tokenProvider.generateToken(user.getEmail()),
                "Login successful",
                UserResponse.from(user)
        );
    }

    /**
     * Backs GET /api/auth/me. `email` comes from the authenticated
     * principal (JWT subject) — see AuthController, never from a
     * frontend-supplied parameter, so a signed-in user can only ever
     * fetch their own record.
     */
    public UserResponse getCurrentUser(String email) {
        User user = userRepo.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
        return UserResponse.from(user);
    }

    /**
     * Backs POST /api/auth/verify-ghana-card. Only meaningful for
     * CLIENT/CONTRACTOR (the frontend only ever shows the Ghana Card
     * step for those roles — see signupConfig.js SIGNUP_ROLES on the
     * frontend), but this endpoint doesn't hard-block other roles from
     * calling it; there's no real reason to, and rejecting it would
     * just be one more thing that could drift out of sync with the
     * frontend's role list. It IS idempotent: calling it again just
     * re-confirms the same state rather than erroring.
     *
     * This is genuine "we recorded a card number" verification, not
     * verification against Ghana's National Identification Authority —
     * there is no such integration here or anywhere in this codebase.
     * See README "Known limitations" for why, and what real
     * verification would require.
     */
    public UserResponse verifyGhanaCard(String email, GhanaCardRequest request) {
        User user = userRepo.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
        user.setGhanaCardNumber(request.ghanaCardNumber());
        user.setGhanaCardVerified(true);
        userRepo.save(user);

        // A verified contractor's identity is confirmed, which is the
        // only verification signal ContractorProfile.isVerified has
        // right now — see the note on that field for why this isn't
        // necessarily the final word on contractor "quality" trust.
        if (user.getRole() == Role.CONTRACTOR) {
            contractorRepo.findByUser(user).ifPresent(profile -> {
                profile.setVerified(true);
                contractorRepo.save(profile);
            });
        }

        return UserResponse.from(user);
    }
}
