package com.terramatch.dto;

import com.terramatch.entity.LandBid;
import java.time.LocalDateTime;

public class BiddingDTOs {
    /**
     * POST /api/bids and GET /api/bids/{landId} now return this instead
     * of the raw LandBid entity, for the same reason as
     * LandDTOs.LandListingResponse: the entity's nested `bidder` User
     * and `land` LandListing (which itself nests its `owner` User)
     * were serializing full user records — meaning anyone who could see
     * a land's bid list could also see every other bidder's phone
     * number and Ghana Card number. This exposes only what a bid list
     * legitimately needs: who bid, how much, when.
     */
    public record BidResponse(
            String id,
            String landId,
            String bidderId,
            String bidderName,
            double amount,
            String status,
            LocalDateTime createdAt
    ) {
        public static BidResponse from(LandBid bid) {
            return new BidResponse(
                    bid.getId(),
                    bid.getLand() != null ? bid.getLand().getId() : null,
                    bid.getBidder() != null ? bid.getBidder().getId() : null,
                    bid.getBidder() != null ? bid.getBidder().getName() : null,
                    bid.getAmount(),
                    bid.getStatus(),
                    bid.getCreatedAt()
            );
        }
    }
}
