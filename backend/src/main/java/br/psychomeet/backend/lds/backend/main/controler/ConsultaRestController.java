package br.psychomeet.backend.lds.backend.main.controler;

import br.psychomeet.backend.lds.backend.main.domain.Consulta;
import br.psychomeet.backend.lds.backend.main.dto.ConsultaAgendamentoDTO;
import br.psychomeet.backend.lds.backend.main.port.service.consulta.ConsultaService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/consulta")
public class ConsultaRestController {

    private final ConsultaService consultaService;

    public ConsultaRestController(ConsultaService consultaService) {
        this.consultaService = consultaService;
    }

    @GetMapping
    public ResponseEntity<List<Consulta>> getAll() {
        return ResponseEntity.ok(consultaService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Consulta> getById(@PathVariable int id) {
        return ResponseEntity.ok(consultaService.findById(id));
    }


    @PostMapping
    public ResponseEntity<Void> create(@RequestBody Consulta consulta) {
        int id = consultaService.create(consulta);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(id).toUri();
        return ResponseEntity.created(uri).build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> update(@PathVariable int id, @RequestBody Consulta consulta) {
        consultaService.update(id, consulta);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable int id) {
        consultaService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/paciente/{pacienteId}")
    public ResponseEntity<List<ConsultaAgendamentoDTO>> getByPacienteId(
            @PathVariable int pacienteId,
            @RequestParam(required = false) String status) { // Filtro de status opcional
        List<ConsultaAgendamentoDTO> consultas = consultaService.findByPaciente(pacienteId, status);
        return ResponseEntity.ok(consultas);
    }

    @GetMapping("/psicologo/{psicologoId}")
    public ResponseEntity<List<ConsultaAgendamentoDTO>> getByPsicologoId(
            @PathVariable int psicologoId,
            @RequestParam(required = false) String status) { // Filtro de status opcional
        List<ConsultaAgendamentoDTO> consultas = consultaService.findByPsicologo(psicologoId, status);
        return ResponseEntity.ok(consultas);
    }


}
