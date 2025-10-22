package in.authn.InvoiceGenerater;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.config.EnableMongoAuditing;

@SpringBootApplication
@EnableMongoAuditing
public class InvoiceGeneraterApplication {

	public static void main(String[] args) {
		SpringApplication.run(InvoiceGeneraterApplication.class, args);
	}

}
