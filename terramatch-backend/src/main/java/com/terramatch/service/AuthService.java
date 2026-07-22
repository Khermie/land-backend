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
                .password(passwordEncoder.encode(request.password())).role(request.role()).build();
        userRepo.save(user);

        if (request.role() == Role.CONTRACTOR) {
            contractorRepo.save(ContractorProfile.builder().user(user).build());
        }
        return new AuthResponse(tokenProvider.generateToken(user.getEmail()), "Registration successful");
    }

    public AuthResponse login(LoginRequest request) {
        User user = userRepo.findByEmail(request.email()).orElseThrow(() -> new RuntimeException("User not found"));
        if (!passwordEncoder.matches(request.password(), user.getPassword())) throw new RuntimeException("Invalid password");
        return new AuthResponse(tokenProvider.generateToken(user.getEmail()), "Login successful");
    }
}