package com.me.dashboard.client;

import org.apache.http.HttpEntity;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;


@Component
public class HttpClient {

    Logger logger = LoggerFactory.getLogger(HttpClient.class);

    public Map<String, Object> sendPost(String url, String payload) throws ClientProtocolException, IOException {

        HttpPost request = new HttpPost(url);
        request.addHeader("contet-type", "application/json");
        StringEntity entity = new StringEntity(payload);
        entity.setContentType("application/json");
        request.setEntity(entity);
        Map<String, Object> res = new HashMap();

        try (CloseableHttpClient httpClient = HttpClients.createDefault();
             CloseableHttpResponse response = httpClient.execute(request)) {
            logger.info("data was sent -> " + url);
            logger.info("status - > " + response.getStatusLine().getStatusCode());
            logger.info("payload" + payload);
            HttpEntity entityRS = response.getEntity();

            res.put("response", EntityUtils.toString(entityRS));
            res.put("status", response.getStatusLine().getStatusCode());
        }

        return res;
    }

}
