package com.terramatch.repository;
import com.terramatch.entity.LandBid;
import com.terramatch.entity.LandListing;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface LandBidRepository extends JpaRepository<LandBid, String> {
    List<LandBid> findByLandOrderByAmountDesc(LandListing land);
}