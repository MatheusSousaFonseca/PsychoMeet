package br.psychomeet.backend.lds.backend.service.pacienteServiceImpl;

import br.psychomeet.backend.lds.backend.main.domain.Paciente;
import br.psychomeet.backend.lds.backend.main.port.dao.paciente.PacienteDao;
import br.psychomeet.backend.lds.backend.main.service.paciente.PacienteServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;

class PacienteServiceTest {

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

    @Test
    void create_whenEntityIsValid_shouldReturnId() {
        Paciente paciente = new Paciente();
        paciente.setPessoaId(1);

        when(pacienteDao.add(any(Paciente.class))).thenReturn(1);

        int result = pacienteServiceImpl.create(paciente);
        assertEquals(1, result);
    }

    @Test
    void delete_whenIdIsNegative_shouldNotCallRemove() {
        pacienteServiceImpl.delete(-1);
        verify(pacienteDao, never()).remove(anyInt());
    }

    @Test
    void delete_whenIdIsValid_shouldCallRemove() {
        pacienteServiceImpl.delete(1);
        verify(pacienteDao, times(1)).remove(1);
    }

    @Test
    void findById_whenIdIsNegative_shouldReturnNull() {
        Paciente result = pacienteServiceImpl.findById(-1);
        assertNull(result);
    }

    @Test
    void findById_whenIdIsValid_shouldReturnPaciente() {
        Paciente paciente = new Paciente();
        paciente.setPessoaId(1);

        when(pacienteDao.readById(1)).thenReturn(paciente);

        Paciente result = pacienteServiceImpl.findById(1);
        assertNotNull(result);
        assertEquals(1, result.getPessoaId());
    }

    @Test
    void findAll_shouldReturnListOfPacientes() {
        List<Paciente> pacientes = new ArrayList<>();
        pacientes.add(new Paciente());
        pacientes.add(new Paciente());

        when(pacienteDao.readAll()).thenReturn(pacientes);

        List<Paciente> result = pacienteServiceImpl.findAll();
        assertEquals(2, result.size());
    }

    @Test
    void update_whenPacienteNotFound_shouldNotCallUpdateInformation() {
        when(pacienteDao.readById(1)).thenReturn(null);

        pacienteServiceImpl.update(1, new Paciente());
        verify(pacienteDao, never()).updateInformation(anyInt(), any(Paciente.class));
    }

    @Test
    void update_whenPacienteFound_shouldCallUpdateInformation() {
        Paciente paciente = new Paciente();
        paciente.setPessoaId(1);

        when(pacienteDao.readById(1)).thenReturn(paciente);

        Paciente updatedPaciente = new Paciente();
        pacienteServiceImpl.update(1, updatedPaciente);

        verify(pacienteDao, times(1)).updateInformation(1, updatedPaciente);
    }

    @Test
    void getByPessoa_shouldReturnPaciente() {
        Paciente paciente = new Paciente();
        paciente.setPessoaId(1);

        when(pacienteDao.findByPessoa(1)).thenReturn(paciente);

        Paciente result = pacienteServiceImpl.getByPessoa(1);
        assertNotNull(result);
        assertEquals(1, result.getPessoaId());
    }
}