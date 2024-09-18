package br.psychomeet.backend.lds.backend.main.controler;

import br.psychomeet.backend.lds.backend.main.domain.Disponibilidade;
import br.psychomeet.backend.lds.backend.main.service.disponibilidade.DisponibilidadeServiceImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/disponibilidade")
public class DisponibilidadeRestController {

    private final DisponibilidadeServiceImpl disponibilidadeService;

    public DisponibilidadeRestController(DisponibilidadeServiceImpl disponibilidadeService) {
        this.disponibilidadeService = disponibilidadeService;
    }

    @GetMapping
    public ResponseEntity<List<Disponibilidade>> getAll() {
        return ResponseEntity.ok(disponibilidadeService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Disponibilidade> getById(@PathVariable int id) {
        return ResponseEntity.ok(disponibilidadeService.findById(id));
    }

    @PostMapping
    public ResponseEntity<Void> create(@RequestBody Disponibilidade disponibilidade) {
        int id = disponibilidadeService.create(disponibilidade);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(id).toUri();
        return ResponseEntity.created(uri).build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> update(@PathVariable int id, @RequestBody Disponibilidade disponibilidade) {
        disponibilidadeService.update(id, disponibilidade);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable int id) {
        disponibilidadeService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
