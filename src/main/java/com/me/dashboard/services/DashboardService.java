package com.me.dashboard.services;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.me.dashboard.database.crud.SentimentResultCrud;
import com.me.dashboard.utils.JObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class DashboardService {

    @Autowired
    SentimentResultCrud sentimentResultCrud;

    public String getChart1Options() throws JsonProcessingException {

        ObjectMapper objectMapper = JObjectMapper.getInstance();
        String[] arr = new String[]{"Positive", "Negative", "Neutral"};
        String[] array = objectMapper.convertValue(arr, String[].class);
        return objectMapper.writeValueAsString(array);

    }

    public String getChart1Series() throws JsonProcessingException {

        Long positiveCount = sentimentResultCrud.getPositiveCount();
        Long negativeCount = sentimentResultCrud.getNegativeCount();
        Long neutralCount = sentimentResultCrud.getNeutralCount();
        ObjectMapper objectMapper = JObjectMapper.getInstance();
        Long[] arr = new Long[]{positiveCount, negativeCount, neutralCount};
        Long[] array = objectMapper.convertValue(arr, Long[].class);
        return objectMapper.writeValueAsString(array);

    }
}
