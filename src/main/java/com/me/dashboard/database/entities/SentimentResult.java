package com.me.dashboard.database.entities;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "sentence")
public class SentimentResult {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", updatable = false, nullable = false)
    private Long id;

    @Column(name = "sentence")
    private String sentence;

    @Column(name = "confidence")
    private Long confidence;

    @Column(name = "negative")
    private Long negative;

    @Column(name = "positive")
    private Long positive;

    @Column(name = "neutral")
    private Long neutral;

    @Column(name = "sentiment")
    private String sentiment;

    @Column(name = "creation_date")
    private String creationDate;

}
