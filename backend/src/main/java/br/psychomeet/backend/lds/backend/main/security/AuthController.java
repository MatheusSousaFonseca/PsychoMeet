package br.psychomeet.backend.lds.backend.main.security;

import br.psychomeet.backend.lds.backend.main.domain.Pessoa;
import br.psychomeet.backend.lds.backend.main.dto.JwtTokenDto;
import br.psychomeet.backend.lds.backend.main.port.service.authentication.AuthenticationService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController

public class AuthController {

    private final AuthenticationService authenticationService;

    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;

    public AuthController(AuthenticationService authenticationService, JwtService jwtService, UserDetailsService userDetailsService) {
        this.authenticationService = authenticationService;
        this.jwtService = jwtService;
        this.userDetailsService = userDetailsService;
    }

    @PostMapping("/auth")
    public ResponseEntity<JwtTokenDto> authenticate(@RequestBody AuthenticationRequest authenticationRequest) throws Exception{
        String email = authenticationRequest.getEmail();
        String password = authenticationRequest.getSenha();

        Pessoa authenticatedUser = authenticationService.authenticate(email, password);

        if (authenticatedUser == null){
            throw new BadCredentialsException("Invalid email or password");
        }

        UserDetails userDetails = userDetailsService.loadUserByUsername(email);

        if (userDetails == null){
            throw new UsernameNotFoundException("E-mail não encontrado");
        }

        final String jwtToken = jwtService.generateToken(userDetails, authenticatedUser.getNome(), authenticatedUser.getRole(), authenticatedUser.getEmail());

        if (jwtToken == null || jwtToken.isEmpty()) {
            throw new InternalError("jwt inválido");
        }

        System.out.println("jwt criado: " + jwtToken);

        final JwtTokenDto tokenDto = new JwtTokenDto(jwtToken);

        return ResponseEntity.ok(tokenDto);
    }
}
