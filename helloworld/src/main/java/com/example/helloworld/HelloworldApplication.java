package com.example.helloworld;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
public class HelloworldApplication {

  @Value("${NAME:World}")
  String name;

  // https://www.baeldung.com/spring-response-entity
  // Less helpful but relevant:
  // https://www.baeldung.com/spring-boot-json
  // https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/http/ResponseEntity.html

//  @CrossOrigin(origins = "http://localhost:8080")
  //TODO: narrow CORS for safety -- this just gets it working
  @CrossOrigin
  @RestController
  class HelloworldController {
    // Add CrossOrigin to enable client and server to run on localhost
    // https://spring.io/guides/gs/rest-service-cors/
    @GetMapping("/{name}")
    ResponseEntity<String> hello(@PathVariable("name") String who) {
      return new ResponseEntity<>("{\"text\": \"Hi, " + who + "!\"}", HttpStatus.OK);
    }

    @GetMapping("/")
    ResponseEntity<String> hello() {
      return hello("world");
    }
  }

  public static void main(String[] args) {
    SpringApplication.run(HelloworldApplication.class, args);
  }
}
