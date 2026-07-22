package com.terramatch.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class LandBid {
    @Id @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @ManyToOne
    @JoinColumn(name = "land_id")
    private LandListing land;

    @ManyToOne
    @JoinColumn(name = "bidder_id")
    private User bidder;

    private double amount;
    private String status = "PENDING"; 
    private LocalDateTime createdAt = LocalDateTime.now();
}