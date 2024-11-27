package br.psychomeet.backend.lds.backend.main.service.authentication;

import br.psychomeet.backend.lds.backend.main.domain.Pessoa;
import br.psychomeet.backend.lds.backend.main.port.service.authentication.AuthenticationService;
import br.psychomeet.backend.lds.backend.main.port.service.paciente.PacienteService;
import br.psychomeet.backend.lds.backend.main.port.service.psicologo.PsicologoService;
import br.psychomeet.backend.lds.backend.main.port.service.user.PessoaService;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationServiceImpl implements AuthenticationService {

    private final PessoaService pessoaService;
    private final PasswordEncoder passwordEncoder;


    public AuthenticationServiceImpl(PessoaService pessoaService, PasswordEncoder passwordEncoder) {
        this.pessoaService = pessoaService;
        this.passwordEncoder = passwordEncoder;

    }


    public Pessoa authenticate(String email, String password) {
        Pessoa user = pessoaService.findByEmail(email);
        if (user == null) {
            throw new UsernameNotFoundException("E-mail não encontrado");
        }
        System.out.println(user.getSenha());
        if (!passwordEncoder.matches(password, user.getSenha())) {
            throw new BadCredentialsException("Credenciais inválidas");
        }
        return user;

    }
}
