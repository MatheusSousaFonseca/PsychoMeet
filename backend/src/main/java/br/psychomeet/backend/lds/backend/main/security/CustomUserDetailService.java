package br.psychomeet.backend.lds.backend.main.security;


import br.psychomeet.backend.lds.backend.main.domain.Pessoa;
import br.psychomeet.backend.lds.backend.main.port.service.user.PessoaService;
import org.springframework.context.annotation.Profile;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.security.core.userdetails.User;

import java.util.List;

@Profile("prod")
@Service
public class CustomUserDetailService implements UserDetailsService {

    private final PessoaService pessoaService;

    public CustomUserDetailService(PessoaService pessoaService) {
        this.pessoaService = pessoaService;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        if (email == null || email.isEmpty()) {
            throw new RuntimeException("E-mail nulo ou vazio");
        }
        Pessoa pessoa = pessoaService.findByEmail(email);

        if (pessoa == null){
            throw new UsernameNotFoundException("E-mail não encontrado" + email);
        }
        List<GrantedAuthority> authorities = List.of(
                new SimpleGrantedAuthority(pessoa.getRole().name())
        );


        return new User(pessoa.getEmail(), pessoa.getSenha(), authorities);
    }
}


