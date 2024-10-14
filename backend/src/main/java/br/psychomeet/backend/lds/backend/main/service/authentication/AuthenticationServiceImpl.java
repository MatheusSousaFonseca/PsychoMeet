package br.psychomeet.backend.lds.backend.main.service.authentication;

import br.psychomeet.backend.lds.backend.main.domain.Pessoa;
import br.psychomeet.backend.lds.backend.main.port.service.authentication.AuthenticationService;
import br.psychomeet.backend.lds.backend.main.port.service.paciente.PacienteService;
import br.psychomeet.backend.lds.backend.main.port.service.psicologo.PsicologoService;
import br.psychomeet.backend.lds.backend.main.port.service.user.PessoaService;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationServiceImpl implements AuthenticationService {

    private final PessoaService pessoaService;
    private final PacienteService pacienteService;
    private final PsicologoService psicologoService;

    public AuthenticationServiceImpl(PessoaService pessoaService, PacienteService pacienteService, PsicologoService psicologoService) {
        this.pessoaService = pessoaService;
        this.pacienteService = pacienteService;
        this.psicologoService = psicologoService;
    }


    @Override
    public Pessoa authenticate(String email, String password) {
        Pessoa user = pessoaService.findByEmail(email);

        if (!user.getSenha().equals(password)) {

            return null;

        }

        return user;
    }
}
