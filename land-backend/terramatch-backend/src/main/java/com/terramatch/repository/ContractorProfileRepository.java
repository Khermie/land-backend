package com.terramatch.repository;
import com.terramatch.entity.ContractorProfile;
import com.terramatch.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface ContractorProfileRepository extends JpaRepository<ContractorProfile, String> {
    List<ContractorProfile> findByIsVerifiedTrue();

    // Added for PUT /api/contractors/me and Ghana Card verification —
    // both need to look up "the signed-in contractor's own profile"
    // starting from their User record, and previously there was no way
    // to do that lookup at all (ContractorProfile has a OneToOne back
    // to User, but nothing queried it in that direction).
    Optional<ContractorProfile> findByUser(User user);
}