package com.terramatch.service;

import com.terramatch.dto.BiddingDTOs.BidResponse;
import com.terramatch.entity.LandBid;
import com.terramatch.entity.LandListing;
import com.terramatch.entity.User;
import com.terramatch.repository.LandBidRepository;
import com.terramatch.repository.LandListingRepository;
import com.terramatch.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BiddingService {
    private final LandBidRepository bidRepo;
    private final LandListingRepository landRepo;
    private final UserRepository userRepo;

    public BidResponse placeBid(String bidderEmail, String landId, double amount) {
        User bidder = userRepo.findByEmail(bidderEmail).orElseThrow(() -> new RuntimeException("User not found"));
        LandListing land = landRepo.findById(landId).orElseThrow(() -> new RuntimeException("Land not found"));

        if (land.getOwner().getId().equals(bidder.getId())) throw new RuntimeException("Cannot bid on your own land");

        LandBid bid = LandBid.builder().land(land).bidder(bidder).amount(amount).build();
        return BidResponse.from(bidRepo.save(bid));
    }

    // Returns BidResponse (not the raw LandBid entity) — see
    // BiddingDTOs.BidResponse's Javadoc: the entity's nested bidder/
    // land.owner User objects were exposing every bidder's phone number
    // and Ghana Card number to anyone else who could see the same
    // land's bid list.
    public List<BidResponse> getBidsForLand(String landId) {
        LandListing land = landRepo.findById(landId).orElseThrow(() -> new RuntimeException("Land not found"));
        return bidRepo.findByLandOrderByAmountDesc(land).stream().map(BidResponse::from).collect(Collectors.toList());
    }
}
