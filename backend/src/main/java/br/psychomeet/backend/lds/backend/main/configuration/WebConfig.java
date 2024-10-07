package br.psychomeet.backend.lds.backend.main.configuration;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    //CORS é um mecanismo de segurança que permite que uma aplicação frontend faça requisições
    // para um servidor backend hospedado em um domínio diferente.


    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // Aplica a todos os endpoints
                .allowedOrigins("http://localhost:4200") // Permite explicitamente a origem do frontend Angular
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Permite os métodos HTTP necessários
                .allowedHeaders("*") // Permite todos os cabeçalhos
                .allowCredentials(true) // Permite credenciais como cookies ou cabeçalhos de autorização
                .maxAge(3600); // Armazena em cache a resposta preflight por uma hora

    }
}
