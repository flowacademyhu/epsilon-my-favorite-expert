package hu.flowacademy.epsilon.myfavoriteexpert;

import hu.flowacademy.epsilon.myfavoriteexpert.config.AppProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
@EnableConfigurationProperties(AppProperties.class)
public class MyFavoriteExpertApplication {

	public static void main(String[] args) {
		SpringApplication.run(MyFavoriteExpertApplication.class, args);
	}

}
