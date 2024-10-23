package br.psychomeet.backend.lds.backend.main.controler;

import br.psychomeet.backend.lds.backend.main.domain.Agendamento;
import br.psychomeet.backend.lds.backend.main.dto.AgendamentoDisponibilidadeDTO;
import br.psychomeet.backend.lds.backend.main.service.agendamento.AgendamentoServiceImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/agendamento")
public class AgendamentoRestController {

    private final AgendamentoServiceImpl agendamentoService;

    public AgendamentoRestController(AgendamentoServiceImpl agendamentoService) {
        this.agendamentoService = agendamentoService;
    }

    @GetMapping
    public ResponseEntity<List<Agendamento>> getAll() {
        return ResponseEntity.ok(agendamentoService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Agendamento> getById(@PathVariable int id) {
        return ResponseEntity.ok(agendamentoService.findById(id));
    }

    @PostMapping
    public ResponseEntity<Void> create(@RequestBody Agendamento agendamento) {
        int id = agendamentoService.create(agendamento);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(id).toUri();
        return ResponseEntity.created(uri).build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> update(@PathVariable int id, @RequestBody Agendamento agendamento) {
        agendamentoService.update(id, agendamento);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable int id) {
        agendamentoService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/psicologo/{psicologoId}")
    public ResponseEntity<List<AgendamentoDisponibilidadeDTO>> getByPsicologo(
            @PathVariable int psicologoId,
            @RequestParam(required = false) String status) {
        return ResponseEntity.ok(agendamentoService.findByPsicologo(psicologoId, status));
    }


    @GetMapping("/paciente/{pacienteId}")
    public ResponseEntity<List<Agendamento>> getByPaciente(
            @PathVariable int pacienteId,
            @RequestParam(required = false) String status) {
        return ResponseEntity.ok(agendamentoService.findByPaciente(pacienteId, status));
    }

    @PutMapping("/confirmar/{id}")
    public ResponseEntity<Void> confirmarAgendamento(@PathVariable int id) {
        agendamentoService.confirmarAgendamento(id);
        return ResponseEntity.ok().build();
    }

}
