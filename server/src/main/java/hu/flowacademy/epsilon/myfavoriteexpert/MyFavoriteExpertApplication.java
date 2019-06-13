package hu.flowacademy.epsilon.myfavoriteexpert;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import hu.flowacademy.epsilon.myfavoriteexpert.config.AppProperties;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Primary;
import org.springframework.data.jpa.convert.threeten.Jsr310JpaConverters;
import org.springframework.http.converter.json.Jackson2ObjectMapperBuilder;

import javax.annotation.PostConstruct;

@EntityScan(basePackageClasses = { MyFavoriteExpertApplication.class, Jsr310JpaConverters.class })
@SpringBootApplication
@EnableConfigurationProperties(AppProperties.class)
public class MyFavoriteExpertApplication {

	public static void main(String[] args) {
		SpringApplication.run(MyFavoriteExpertApplication.class, args);
	}


}
