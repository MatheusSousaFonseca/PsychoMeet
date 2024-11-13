package br.psychomeet.backend.lds.backend.service.pacienteServiceImpl;

import br.psychomeet.backend.lds.backend.main.port.dao.paciente.PacienteDao;
import br.psychomeet.backend.lds.backend.main.service.paciente.PacienteServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.stereotype.Service;

import static org.junit.jupiter.api.Assertions.assertEquals;

@Service
public class PacienteServiceTest {

    @InjectMocks
    private PacienteServiceImpl pacienteServiceImpl;

    @Mock
    private PacienteDao pacienteDao;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }
    @Test
    void create_whenEntityIsNull_shouldReturnZero() {
        int result = pacienteServiceImpl.create(null);
        assertEquals(0, result);
    }
}
