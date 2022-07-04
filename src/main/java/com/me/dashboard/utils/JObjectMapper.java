package com.me.dashboard.utils;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;

public class JObjectMapper {

    private ObjectMapper objectMapper = new ObjectMapper();

    private JObjectMapper() {
        this.objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
    }

    public static ObjectMapper getInstance() {
        return Holder.INSTANCE.objectMapper;
    }

    private static class Holder {
        private static final JObjectMapper INSTANCE = new JObjectMapper();
    }
}
