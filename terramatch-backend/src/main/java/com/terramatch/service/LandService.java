package com.terramatch.service;

import com.terramatch.dto.LandDTOs.CreateLandRequest;
import com.terramatch.entity.LandListing;
import com.terramatch.entity.User;
import com.terramatch.repository.LandListingRepository;
import com.terramatch.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class LandService {
    private final LandListingRepository landRepo;
    private final UserRepository userRepo;

    public LandListing createLand(String ownerEmail, CreateLandRequest request) {
        User owner = userRepo.findByEmail(ownerEmail).orElseThrow(() -> new RuntimeException("User not found"));
        LandListing land = LandListing.builder().owner(owner).title(request.title())
                .description(request.description()).locationData(request.locationData())
                .floodRisk(request.floodRisk()).price(request.price()).build();
        return landRepo.save(land);
    }

    public List<LandListing> getAllLands() { return landRepo.findAll(); }
}