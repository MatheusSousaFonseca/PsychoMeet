package br.psychomeet.backend.lds.backend.main.controler;

import br.psychomeet.backend.lds.backend.main.domain.Pessoa;
import br.psychomeet.backend.lds.backend.main.dto.UpdatePasswordDto;
import br.psychomeet.backend.lds.backend.main.port.service.authentication.AuthenticationService;
import br.psychomeet.backend.lds.backend.main.port.service.user.PessoaService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.web.multipart.MultipartFile;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/pessoa")
public class PessoaRestController {

    private final PessoaService pessoaService;

    public PessoaRestController(PessoaService pessoaService) {
        this.pessoaService = pessoaService;
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

    //Tratamento de Imagens
    @PostMapping("/{id}/upload-foto")
    public ResponseEntity<String> uploadFoto(@PathVariable int id, @RequestParam("file") MultipartFile file) {
        try {
            byte[] foto = file.getBytes();
            pessoaService.updateFoto(id, foto);
            return ResponseEntity.ok("Foto atualizada com sucesso!");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Erro ao atualizar a foto: " + e.getMessage());
        }
    }

    @GetMapping("/{id}/foto")
    public ResponseEntity<byte[]> getFoto(@PathVariable int id) {
        byte[] foto = pessoaService.getFoto(id);
        if (foto != null) {
            return ResponseEntity.ok()
                    .header("Content-Type", "image/jpeg")
                    .body(foto);
        }
        return ResponseEntity.notFound().build();
    }




}
