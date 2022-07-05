package com.me.dashboard.database.repository;

import com.me.dashboard.database.entities.SentimentResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface SentimentResultRepository extends JpaRepository<SentimentResult, Long> {

    @Query(value = "SELECT COUNT(id) FROM sentimentdb.sentence where sentiment ='Positive'", nativeQuery = true)
    Long positiveCount();

    @Query(value = "SELECT COUNT(id) FROM sentimentdb.sentence where sentiment ='Negative'", nativeQuery = true)
    Long negativeCount();

    @Query(value = "SELECT COUNT(id) FROM sentimentdb.sentence where sentiment ='Neutral'", nativeQuery = true)
    Long neutralCount();
}
