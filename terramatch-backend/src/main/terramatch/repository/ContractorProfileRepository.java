package com.terramatch.repository;
import com.terramatch.entity.ContractorProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ContractorProfileRepository extends JpaRepository<ContractorProfile, String> {
    List<ContractorProfile> findByIsVerifiedTrue();
}