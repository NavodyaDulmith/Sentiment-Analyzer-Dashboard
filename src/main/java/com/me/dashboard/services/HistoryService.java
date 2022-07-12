package com.me.dashboard.services;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.me.dashboard.database.crud.SentimentResultCrud;
import com.me.dashboard.database.entities.SentimentResult;
import com.me.dashboard.dto.ResultDTO;
import com.me.dashboard.utils.JObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class HistoryService {

    @Autowired
    SentimentResultCrud sentimentResultCrud;

    public String getHistory() throws JsonProcessingException {
        List<SentimentResult> list = sentimentResultCrud.getAll();
        ObjectMapper objectMapper = JObjectMapper.getInstance();
        ResultDTO[] resultDTOS = objectMapper.convertValue(list,ResultDTO[].class);
        return objectMapper.writeValueAsString(resultDTOS);
    }
}
