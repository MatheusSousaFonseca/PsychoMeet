package br.psychomeet.backend.lds.backend.main.controler;


import br.psychomeet.backend.lds.backend.main.dto.AddPsicologoDTO;
import br.psychomeet.backend.lds.backend.main.dto.PsicologoFullDTO;
import br.psychomeet.backend.lds.backend.main.port.service.psicologo.PsicologoService;

import br.psychomeet.backend.lds.backend.main.domain.Psicologo;
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


    @PostMapping
    public ResponseEntity<Void> create(@RequestBody AddPsicologoDTO psicologo) {
        int id = psicologoService.create(psicologo);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(id).toUri();
        return ResponseEntity.created(uri).build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> update(@PathVariable int id, @RequestBody Psicologo psicologo) {
        psicologoService.update(id, psicologo);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable int id) {
        psicologoService.delete(id);
        return ResponseEntity.noContent().build();
    }
}