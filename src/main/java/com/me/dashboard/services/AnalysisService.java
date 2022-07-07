package com.me.dashboard.services;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.me.dashboard.database.crud.SentimentResultCrud;
import com.me.dashboard.database.entities.SentimentResult;
import com.me.dashboard.dto.ResultDTO;
import com.me.dashboard.utils.JObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

@Component
public class AnalysisService {

    @Autowired
    SentimentResultCrud sentimentResultCrud;

    private static final Logger logger = LoggerFactory.getLogger(AnalysisService.class);

    public String analyse() {
        //call py api
        //get response
        logger.info("Result Successfully Received!");
        //save result
        //addResult("payload", sentence);

        return "payload";
    }

    public String addResult(String payload, String sentence) {
        JsonObject obj = (JsonObject) new JsonParser().parse(payload);
        List<SentimentResult> list = new ArrayList<>();
        SentimentResult record = new SentimentResult();
        record.setSentence(sentence);
        record.setConfidence(obj.get("").getAsLong());
        record.setNegative(obj.get("").getAsLong());
        record.setPositive(obj.get("").getAsLong());
        record.setNeutral(obj.get("").getAsLong());
        record.setSentiment(obj.get("").getAsString());
        String timeStamp = new SimpleDateFormat("dd-M-yyyy hh:mm:ss").format(Calendar.getInstance().getTime());
        record.setCreationDate(timeStamp);
        list.add(record);
        sentimentResultCrud.addAll(list);
        logger.info("Results Successfully Added!");
        return record.getSentence();
    }

    public String getResult() throws JsonProcessingException {
        List<SentimentResult> list = sentimentResultCrud.getAll();
        ObjectMapper objectMapper = JObjectMapper.getInstance();
        ResultDTO[] resultDTOS = objectMapper.convertValue(list, ResultDTO[].class);
        return objectMapper.writeValueAsString(resultDTOS);
    }

    public String getChart() {

        List<SentimentResult> results = sentimentResultCrud.getAll();
        JsonArray series = new JsonArray();
        JsonArray options = new JsonArray();
        for (SentimentResult result : results) {
            //Long violationCount = result.getViolations();
            //series.add(violationCount);
            //options.add(result.getName());
        }
        JsonObject object = new JsonObject();
        object.add("options", options);
        object.add("series", series);

        /*ObjectMapper objectMapper = JObjectMapper.getInstance();
        return objectMapper.writeValueAsString(object);*/
        return new Gson().toJson(object);

    }
}
