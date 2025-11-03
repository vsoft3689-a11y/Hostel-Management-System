package com.hostel.management.repository;

import com.hostel.management.model.HostelInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HostelInfoRepository extends JpaRepository<HostelInfo, Long> {
    List<HostelInfo> findByType(String type);
}
