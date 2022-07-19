package com.me.dashboard.services;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.me.dashboard.client.HttpClient;
import com.me.dashboard.database.crud.SentimentResultCrud;
import com.me.dashboard.database.entities.SentimentResult;
import com.me.dashboard.dto.ResultDTO;
import com.me.dashboard.utils.JObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import java.util.Map;

@Component
public class AnalysisService {

    @Autowired
    SentimentResultCrud sentimentResultCrud;

    @Autowired
    HttpClient httpClient;

    @Value("${prediction.api.url}")
    private String url;

    private static final Logger logger = LoggerFactory.getLogger(AnalysisService.class);

    public String analyse(String payload) throws IOException {

        JsonObject obj = (JsonObject) new JsonParser().parse(payload);
        String text = (obj.get("text").getAsString());

        //call prediction api
        Map<String, Object> res = httpClient.sendPost(url,payload);
        res.put("text",text);
        if (res.get("status").equals(200)){
            addResult(String.valueOf(res.get("response")),text);
            logger.info("Result Successfully Received!");
            return String.valueOf(res.get("response"));
        }

        return String.valueOf(res.get("response"));
    }

    public String addResult(String payload, String sentence) {
        JsonObject obj = (JsonObject) new JsonParser().parse(payload);
        List<SentimentResult> list = new ArrayList<>();
        SentimentResult record = new SentimentResult();
        record.setSentence(sentence);
        record.setNegative(obj.get("probabilities").getAsJsonObject().get("negative").getAsDouble());
        record.setPositive(obj.get("probabilities").getAsJsonObject().get("positive").getAsDouble());
        record.setNeutral(obj.get("probabilities").getAsJsonObject().get("neutral").getAsDouble());
        record.setConfidence(obj.get("confidence").getAsDouble());
        record.setSentiment(obj.get("sentiment").getAsString());
        //add timestamp
        String timeStamp = new SimpleDateFormat("dd-M-yyyy hh:mm:ss").format(Calendar.getInstance().getTime());
        record.setCreationDate(timeStamp);
        list.add(record);
        sentimentResultCrud.addAll(list);
        logger.info("Results Successfully Added to DB!");
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
