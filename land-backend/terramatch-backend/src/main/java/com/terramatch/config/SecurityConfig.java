package com.terramatch.config;

import com.terramatch.security.JwtAuthenticationFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.List;

/**
 * Changes made in the auth-integration pass (see README "Backend
 * changes"):
 *
 *  1. CORS no longer uses allowedOriginPatterns(List.of("*")) combined
 *     with allowCredentials(true). That combination is permissive by
 *     design — Spring resolves the wildcard pattern against whatever
 *     Origin header shows up and echoes it back, so in practice it
 *     accepts credentialed requests from any origin, not just your dev
 *     frontend. Origins now come from app.cors.allowed-origins
 *     (application.properties / CORS_ALLOWED_ORIGINS env var),
 *     defaulting to the Vite dev server's usual port. Update that list
 *     for staging/production rather than widening it back to "*".
 *
 *  2. /api/auth/** was entirely permitAll() before, which was correct
 *     for register/login but would have made the new /api/auth/me and
 *     /api/auth/verify-ghana-card endpoints accessible without a JWT
 *     too. Those two are carved out explicitly below and require
 *     authentication like everything else; only register/login stay
 *     open.
 *
 *  3. GET /api/lands and GET /api/contractors/recommend are now public.
 *     Previously "anyRequest().authenticated()" caught them, which
 *     meant a signed-out visitor couldn't browse land listings or
 *     contractor recommendations at all — but the frontend's Explore
 *     Land and Find Contractor pages are public marketing pages. Only
 *     the mutating calls (POST /api/lands, POST /api/bids, PUT
 *     /api/contractors/me) still require a JWT.
 *
 * The duplicate/redundant CorsFilter bean that used to exist alongside
 * the SecurityFilterChain's own .cors(...) block has been removed —
 * having both is redundant (the http.cors() config already wires a
 * CorsConfigurationSource into the filter chain) and having two
 * independently-maintained copies of the same allow-list is exactly
 * the kind of thing that drifts out of sync silently.
 */
@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {
    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    @Value("${app.cors.allowed-origins}")
    private String allowedOrigins;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(AbstractHttpConfigurer::disable)
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/auth/register", "/api/auth/login").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/lands").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/lands/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/contractors/recommend").permitAll()
                .anyRequest().authenticated())
            .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(Arrays.asList(allowedOrigins.split(",")));
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(List.of("*"));
        config.setAllowCredentials(true);
        source.registerCorsConfiguration("/**", config);
        return source;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }
}
