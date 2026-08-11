package com.terramatch.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

/**
 * Core user record for all roles (CLIENT / CONTRACTOR / ADMIN).
 *
 * Added in the auth-integration pass (see README "Backend changes" log):
 *  - phone: collected at registration for all roles; nullable so it
 *    doesn't break registration for anyone who omits it, but the
 *    frontend's signup form always sends it.
 *  - ghanaCardNumber / ghanaCardVerified: CLIENT and CONTRACTOR accounts
 *    go through a Ghana Card verification step in the frontend signup
 *    flow (see AuthController#verifyGhanaCard). ADMIN accounts and any
 *    future role that doesn't require it simply never populate these.
 *    ghanaCardVerified defaults to false and is only ever flipped true
 *    server-side by the verification endpoint — the frontend cannot set
 *    it directly, so "verified" always means the backend actually
 *    accepted a card number for this user.
 *
 * @JsonIgnore on password prevents the bcrypt hash from being
 * serialized into API responses. Previously GET /api/lands returned the
 * full owner object including this hash, since Jackson serializes every
 * getter by default with no annotation present — that was a genuine
 * data-exposure bug, not something new introduced here.
 */
@Entity
@Table(name = "users")
@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class User {
    @Id @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private String name;

    @Column(unique = true, nullable = false)
    private String email;

    @JsonIgnore
    private String password;

    @Enumerated(EnumType.STRING)
    private Role role;

    private String phone;

    @Column(name = "ghana_card_number")
    private String ghanaCardNumber;

    @Column(name = "ghana_card_verified", nullable = false)
    @Builder.Default
    private boolean ghanaCardVerified = false;
}
