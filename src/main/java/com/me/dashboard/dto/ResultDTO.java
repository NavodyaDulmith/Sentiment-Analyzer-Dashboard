package com.me.dashboard.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;


@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class ResultDTO {

    @JsonProperty("id")
    private Long id;

    @JsonProperty("sentence")
    private String sentence;

    @JsonProperty("confidence")
    private Long confidence;

    @JsonProperty("negative")
    private Long negative;

    @JsonProperty("positive")
    private Long positive;

    @JsonProperty("neutral")
    private Long neutral;

    @JsonProperty("sentiment")
    private String sentiment;

    @JsonProperty("creationDate")
    private String creationDate;
}
