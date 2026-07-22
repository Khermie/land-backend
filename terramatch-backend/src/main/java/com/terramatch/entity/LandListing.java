package com.terramatch.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class LandListing {
    @Id @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @ManyToOne
    @JoinColumn(name = "owner_id")
    private User owner;

    private String title;
    @Column(columnDefinition = "TEXT")
    private String description;
    private String locationData; // JSON string for GIS data
    private String floodRisk; 
    private double price;
    private String status = "ACTIVE"; 
    private LocalDateTime createdAt = LocalDateTime.now();
}