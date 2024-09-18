package br.psychomeet.backend.lds.backend.main.controler;

import br.psychomeet.backend.lds.backend.main.domain.Paciente;
import br.psychomeet.backend.lds.backend.main.port.service.paciente.PacienteService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/paciente")
public class PacienteRestController {

    private final PacienteService pacienteService;

    public PacienteRestController(PacienteService pacienteService) {
        this.pacienteService = pacienteService;
    }

    @GetMapping
    public ResponseEntity<List<Paciente>> getAll() {
        return ResponseEntity.ok(pacienteService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Paciente> getById(@PathVariable int id) {
        return ResponseEntity.ok(pacienteService.findById(id));
    }

    @PostMapping
    public ResponseEntity<Void> create(@RequestBody Paciente paciente) {
        int id = pacienteService.create(paciente);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(id).toUri();
        return ResponseEntity.created(uri).build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> update(@PathVariable int id, @RequestBody Paciente paciente) {
        pacienteService.update(id, paciente);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable int id) {
        pacienteService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
