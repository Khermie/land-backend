package com.terramatch.controller;

import com.terramatch.dto.AuthDTOs.*;
import com.terramatch.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequest request) {
        return ResponseEntity.ok(authService.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }

    /**
     * New. Previously there was no way for the frontend to learn who it
     * was signed in as after the initial login/register call — the JWT
     * itself only carries the email (see JwtTokenProvider), and nothing
     * exposed name/role/verification status on their own. Requires a
     * valid JWT (this path is NOT in SecurityConfig's permitAll list),
     * and `auth.getName()` resolves to the authenticated user's email
     * via JwtAuthenticationFilter — never a client-supplied value, so a
     * user can only ever fetch their own record this way.
     */
    @GetMapping("/me")
    public ResponseEntity<UserResponse> me(Authentication auth) {
        return ResponseEntity.ok(authService.getCurrentUser(auth.getName()));
    }

    /**
     * New. Records a Ghana Card number against the signed-in user and
     * marks them verified. See AuthService#verifyGhanaCard and its
     * Javadoc for what "verified" does and doesn't mean here — this is
     * not a call to any government ID system.
     */
    @PostMapping("/verify-ghana-card")
    public ResponseEntity<UserResponse> verifyGhanaCard(@Valid @RequestBody GhanaCardRequest request, Authentication auth) {
        return ResponseEntity.ok(authService.verifyGhanaCard(auth.getName(), request));
    }
}
