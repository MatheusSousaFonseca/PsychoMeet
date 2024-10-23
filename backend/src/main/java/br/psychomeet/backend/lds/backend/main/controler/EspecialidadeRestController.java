package br.psychomeet.backend.lds.backend.main.controler;

import br.psychomeet.backend.lds.backend.main.domain.Especialidade;
import br.psychomeet.backend.lds.backend.main.port.service.especialidade.EspecialidadeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/especialidade")
public class EspecialidadeRestController {

    private final EspecialidadeService especialidadeService;

    public EspecialidadeRestController(EspecialidadeService especialidadeService) {
        this.especialidadeService = especialidadeService;
    }

    @GetMapping
    public ResponseEntity<List<Especialidade>> getAll() {
        return ResponseEntity.ok(especialidadeService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Especialidade> getById(@PathVariable int id) {
        return ResponseEntity.ok(especialidadeService.findById(id));
    }

    @PostMapping
    public ResponseEntity<Void> create(@RequestBody Especialidade especialidade) {
        int id = especialidadeService.create(especialidade);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(id).toUri();
        return ResponseEntity.created(uri).build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> update(@PathVariable int id, @RequestBody Especialidade especialidade) {
        especialidadeService.update(id, especialidade);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable int id) {
        especialidadeService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
