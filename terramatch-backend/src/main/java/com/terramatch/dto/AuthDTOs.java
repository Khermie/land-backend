package com.terramatch.dto;

import com.terramatch.entity.Role;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class AuthDTOs {
    public record RegisterRequest(@NotBlank String name, @NotBlank @Email String email, @NotBlank String password, @NotNull Role role) {}
    public record LoginRequest(@NotBlank @Email String email, @NotBlank String password) {}
    public record AuthResponse(String token, String message) {}
}