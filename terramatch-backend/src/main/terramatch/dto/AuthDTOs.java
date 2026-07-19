package com.terramatch.dto;
import com.terramatch.entity.Role;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public class AuthDTOs {
    public record RegisterRequest(@NotBlank String name, @NotBlank @Email String email, @NotBlank String password, @NotBlank Role role) {}
    public record LoginRequest(@NotBlank @Email String email, @NotBlank String password) {}
    public record AuthResponse(String token, String message) {}
}