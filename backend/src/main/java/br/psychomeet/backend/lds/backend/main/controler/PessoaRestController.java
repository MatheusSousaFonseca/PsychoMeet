package br.psychomeet.backend.lds.backend.main.controler;

import br.psychomeet.backend.lds.backend.main.domain.Pessoa;
import br.psychomeet.backend.lds.backend.main.dto.UpdatePasswordDto;
import br.psychomeet.backend.lds.backend.main.port.service.authentication.AuthenticationService;
import br.psychomeet.backend.lds.backend.main.port.service.user.PessoaService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/pessoa")
public class PessoaRestController {

    private final PessoaService pessoaService;
    private final AuthenticationService authenticationService;

    public PessoaRestController(PessoaService pessoaService, AuthenticationService authenticationService) {
        this.pessoaService = pessoaService;
        this.authenticationService = authenticationService;
    }

    @GetMapping()
    public ResponseEntity<List<Pessoa>> getEntities() {
        List<Pessoa> pessoas = pessoaService.findAll();
        return ResponseEntity.ok().body(pessoas);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Pessoa> getEntityById(@PathVariable final int id) {
        Pessoa pessoa = pessoaService.findById(id);
        return ResponseEntity.ok().body(pessoa);
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<Pessoa> getEntityByEmail(@PathVariable final String email) {
        Pessoa pessoa = pessoaService.findByEmail(email);
        return ResponseEntity.ok().body(pessoa);
    }

    @PostMapping()
    public ResponseEntity<?> createEntity(@RequestBody final Pessoa data) {
        try {

            int id = pessoaService.create(data);
            final URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(id).toUri();
            return ResponseEntity.created(uri).build();

        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }


    @PutMapping("/{id}")
    public ResponseEntity<Void> updateEntity(@PathVariable final int id, @RequestBody final Pessoa data) {
        pessoaService.update(id, data);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEntity(@PathVariable final int id) {
        pessoaService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/update-password")
    public ResponseEntity<Void> updatePassword(@RequestBody final UpdatePasswordDto data) {
        Pessoa pessoa = pessoaService.findByEmail(data.getId());
        final boolean response = pessoaService.updatePassword(pessoa.getId(), data.getOldPassword(), data.getNewPassword());
        return response ? ResponseEntity.ok().build() : ResponseEntity.badRequest().build();
    }

    @GetMapping("/auth")
    public ResponseEntity<Pessoa> authenticate(@RequestParam("email") String email,
                                               @RequestParam("senha") String senha) {
//        Pessoa pessoa = pessoaService.findByEmail(email);
        Pessoa pessoa = authenticationService.authenticate(email, senha);
        if (pessoa != null) {
            return ResponseEntity.ok(pessoa);
        } else {
            return ResponseEntity.status(401).build();
        }
    }
}
