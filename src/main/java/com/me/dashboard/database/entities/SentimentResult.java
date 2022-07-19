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
    private Double confidence;

    @Column(name = "negative")
    private Double negative;

    @Column(name = "positive")
    private Double positive;

    @Column(name = "neutral")
    private Double neutral;

    @Column(name = "sentiment")
    private String sentiment;

    @Column(name = "creation_date")
    private String creationDate;

}
