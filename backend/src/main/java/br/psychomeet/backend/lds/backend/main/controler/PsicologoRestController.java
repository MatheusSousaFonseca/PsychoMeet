package br.psychomeet.backend.lds.backend.main.controler;

import br.psychomeet.backend.lds.backend.main.dto.AddPsicologoDTO;
import br.psychomeet.backend.lds.backend.main.dto.PsicologoFullDTO;
import br.psychomeet.backend.lds.backend.main.port.service.psicologo.PsicologoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/psicologo")
public class PsicologoRestController {

    private final PsicologoService psicologoService;

    public PsicologoRestController(PsicologoService psicologoService) {
        this.psicologoService = psicologoService;
    }

    @GetMapping
    public ResponseEntity<List<PsicologoFullDTO>> getAll(@RequestParam String name,@RequestParam String especialidade) {
        if(name.isEmpty() && especialidade.isEmpty()){
            return ResponseEntity.ok(psicologoService.findAll());
        }else{
            return ResponseEntity.ok(psicologoService.search(name,especialidade));
        }

    }

    @GetMapping("/{id}")
    public ResponseEntity<PsicologoFullDTO> getById(@PathVariable int id) {
        PsicologoFullDTO psicologoFullDTO = psicologoService.findById(id);
        return ResponseEntity.ok(psicologoFullDTO);
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<PsicologoFullDTO> getById(@PathVariable String email) {
        PsicologoFullDTO psicologoFullDTO = psicologoService.findByEmail(email);
        return ResponseEntity.ok(psicologoFullDTO);
    }


    @PostMapping
    public ResponseEntity<?> create(@RequestBody AddPsicologoDTO psicologo) {
        try {
            int id = psicologoService.create(psicologo);
            URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(id).toUri();
            return ResponseEntity.created(uri).build();
        } catch (RuntimeException e) {
            // Retornar erro 400 (bad request) com a mensagem apropriada
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }


    @PutMapping("/{id}")
    public ResponseEntity<Void> update(@PathVariable int id, @RequestBody AddPsicologoDTO psicologo) {
        psicologoService.update(id, psicologo);  // Passando o DTO com os dados completos
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable int id) {
        psicologoService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
