package com.terramatch.repository;
import com.terramatch.entity.LandListing;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LandListingRepository extends JpaRepository<LandListing, String> {}