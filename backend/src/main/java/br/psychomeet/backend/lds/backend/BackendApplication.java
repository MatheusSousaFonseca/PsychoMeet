package br.psychomeet.backend.lds.backend;

import br.psychomeet.backend.lds.backend.main.port.service.util.ResourceFileService;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.jdbc.core.JdbcTemplate;

import java.io.IOException;

@SpringBootApplication
public class BackendApplication {

//	@Autowired
	private ResourceFileService resourceFileService;

//	@Autowired
	private JdbcTemplate jdbcTemplate;

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

//	@PostConstruct
	private void initializeDatabase() {
		System.out.println("Iniciando o banco de dados");

		final String basePath = "lds-db-scripts";

		try {
			final String createScript = resourceFileService.read(basePath + "/create-database.sql");

			final String createTable = resourceFileService.read(basePath + "/create-tables.sql");

			final String insertScript = resourceFileService.read(basePath + "/insert-data.sql");

			jdbcTemplate.execute(createScript);
			jdbcTemplate.execute(createTable);
			jdbcTemplate.execute(insertScript);

		} catch (IOException e) {
			throw new RuntimeException(e);
		}
	}
}
