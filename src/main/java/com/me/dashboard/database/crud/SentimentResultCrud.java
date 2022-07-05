package com.me.dashboard.database.crud;

import com.me.dashboard.database.entities.SentimentResult;
import com.me.dashboard.database.repository.SentimentResultRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class SentimentResultCrud {

    private SentimentResultRepository sentenceRepository;

    @Autowired
    public SentimentResultCrud(SentimentResultRepository repository) {
        this.sentenceRepository = repository;
    }

    public void addAll(List<SentimentResult> list) {
        sentenceRepository.saveAll(list);
    }

    public List<SentimentResult> getAll() {
        return sentenceRepository.findAll();
    }

    public Long getPositiveCount() {
        return sentenceRepository.positiveCount();
    }

    public Long getNegativeCount() {
        return sentenceRepository.negativeCount();
    }

    public Long getNeutralCount() {
        return sentenceRepository.neutralCount();
    }
}
