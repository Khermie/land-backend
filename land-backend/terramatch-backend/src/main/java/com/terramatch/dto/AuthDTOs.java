package com.terramatch.dto;

import com.terramatch.entity.Role;
import com.terramatch.entity.User;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

public class AuthDTOs {

    /**
     * phone is intentionally NOT @NotBlank — required client-side by the
     * frontend's signup form, but kept optional in the DTO so a direct
     * API caller (e.g. a future admin tool, or Postman testing) isn't
     * forced to supply it. Ghana Card fields are deliberately absent
     * from registration itself: identity verification is its own step
     * after account creation (see GhanaCardRequest / AuthController
     * #verifyGhanaCard), not something bundled into the signup payload.
     */
    public record RegisterRequest(
            @NotBlank String name,
            @NotBlank @Email String email,
            @NotBlank String password,
            @NotNull Role role,
            String phone
    ) {}

    public record LoginRequest(@NotBlank @Email String email, @NotBlank String password) {}

    /**
     * Ghana's national ID format is GHA-XXXXXXXXX-X (3 letters, hyphen,
     * 9 digits, hyphen, 1 check digit) — matches the format the frontend
     * already auto-formats to in GhanaCardVerify.jsx.
     */
    public record GhanaCardRequest(
            @NotBlank @Pattern(regexp = "^GHA-\\d{9}-\\d$", message = "Ghana Card number must match GHA-000000000-0") String ghanaCardNumber
    ) {}

    /**
     * Slim, safe user projection returned to the frontend — no password
     * hash (User itself is also @JsonIgnore-protected now, but this DTO
     * makes the contract explicit rather than relying on that alone).
     * Used both as the embedded "user" field on AuthResponse and as the
     * body of GET /api/auth/me.
     */
    public record UserResponse(
            String id,
            String name,
            String email,
            Role role,
            String phone,
            boolean ghanaCardVerified
    ) {
        public static UserResponse from(User user) {
            return new UserResponse(
                    user.getId(),
                    user.getName(),
                    user.getEmail(),
                    user.getRole(),
                    user.getPhone(),
                    user.isGhanaCardVerified()
            );
        }
    }

    /**
     * Previously {token, message} only — the frontend had to make a
     * second call just to learn who it had signed in as, and no such
     * call existed (see README "Backend changes" for the /me endpoint
     * this replaced guessing at). Register/login now return the full
     * user alongside the token so AuthContext can populate role/name/
     * verification status in one round trip.
     */
    public record AuthResponse(String token, String message, UserResponse user) {}
}
