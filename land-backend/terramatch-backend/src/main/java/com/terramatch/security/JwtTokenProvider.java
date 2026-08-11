package com.terramatch.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;

@Component
public class JwtTokenProvider {
    @Value("${app.jwt.secret}")
    private String jwtSecret;
    private SecretKey jwtSecretKey;
    @Value("${app.jwt.expiration}")
    private long jwtExpiration;

    @PostConstruct
    public void init() {
        try {
            jwtSecretKey = Keys.hmacShaKeyFor(Decoders.BASE64.decode(jwtSecret));
        } catch (IllegalArgumentException ex) {
            throw new IllegalStateException("app.jwt.secret must be a Base64-encoded key with at least 512 bits for HS512. Generate one with Keys.secretKeyFor(SignatureAlgorithm.HS512) and store the Base64 value in your configuration.", ex);
        }
    }

    public String generateToken(String email) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + jwtExpiration);
        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(jwtSecretKey, SignatureAlgorithm.HS512)
                .compact();
    }

    public String getEmailFromToken(String token) {
        return Jwts.parserBuilder().setSigningKey(jwtSecretKey).build().parseClaimsJws(token).getBody().getSubject();
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(jwtSecretKey).build().parseClaimsJws(token);
            return true;
        } catch (Exception ex) {
            return false;
        }
    }
}