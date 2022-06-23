package com.me.dashboard.controllers;

import com.me.dashboard.services.HistoryService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@ComponentScan
@EnableSwagger2
@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/v1/csa/")
public class HistoryController {

    private static final Logger logger = LoggerFactory.getLogger(HistoryController.class);

    @Autowired
    HistoryService historyService;

    @GetMapping(value = "history")
    public ResponseEntity<String> getHistory() {
        try {
            return new ResponseEntity<>(historyService.getHistory(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
