package hu.flowacademy.epsilon.myfavoriteexpert;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import hu.flowacademy.epsilon.myfavoriteexpert.config.AppProperties;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

import javax.annotation.PostConstruct;

@SpringBootApplication
@EnableConfigurationProperties(AppProperties.class)
public class MyFavoriteExpertApplication {

	public static void main(String[] args) {
		SpringApplication.run(MyFavoriteExpertApplication.class, args);
	}



}
