package com.me.dashboard.database.repository;

import com.me.dashboard.database.entities.SentimentResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SentimentResultRepository extends JpaRepository<SentimentResult, Long> {

}
