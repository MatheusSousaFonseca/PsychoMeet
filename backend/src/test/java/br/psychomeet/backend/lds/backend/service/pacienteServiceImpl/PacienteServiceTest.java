package br.psychomeet.backend.lds.backend.service.pacienteServiceImpl;

import br.psychomeet.backend.lds.backend.main.domain.Paciente;
import br.psychomeet.backend.lds.backend.main.port.dao.paciente.PacienteDao;
import br.psychomeet.backend.lds.backend.main.service.paciente.PacienteServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class PacienteServiceTest {

    private static final int VALID_PACIENTE_ID = 1;
    private static final int INVALID_PACIENTE_ID = -1;

    @InjectMocks
    private PacienteServiceImpl pacienteServiceImpl;

    @Mock
    private PacienteDao pacienteDao;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void shouldReturnZero_whenCreatingNullPaciente() {
        int result = pacienteServiceImpl.create(null);
        assertEquals(0, result, "Expected result to be 0 for null patient");
    }

    @Test
    void shouldReturnId_whenCreatingValidPaciente() {
        Paciente paciente = new Paciente();
        paciente.setPessoaId(VALID_PACIENTE_ID);

        when(pacienteDao.add(any(Paciente.class))).thenReturn(VALID_PACIENTE_ID);

        int result = pacienteServiceImpl.create(paciente);
        assertEquals(VALID_PACIENTE_ID, result, "Expected valid patient ID to be returned");
    }

    @Test
    void shouldReturnNull_whenFindingByNegativeId() {
        Paciente result = pacienteServiceImpl.findById(INVALID_PACIENTE_ID);
        assertNull(result, "Expected null result for negative ID");
    }

    @Test
    void shouldReturnPaciente_whenFindingByValidId() {
        Paciente paciente = new Paciente();
        paciente.setPessoaId(VALID_PACIENTE_ID);

        when(pacienteDao.readById(VALID_PACIENTE_ID)).thenReturn(paciente);

        Paciente result = pacienteServiceImpl.findById(VALID_PACIENTE_ID);
        assertNotNull(result, "Expected non-null result for valid ID");
        assertEquals(VALID_PACIENTE_ID, result.getPessoaId(), "Expected matching patient ID");
    }


    @Test
    void shouldReturnListOfPacientes_whenPacientesExist() {
        List<Paciente> pacientes = List.of(new Paciente(), new Paciente());
        when(pacienteDao.readAll()).thenReturn(pacientes);

        List<Paciente> result = pacienteServiceImpl.findAll();
        assertEquals(2, result.size(), "Expected list size to match number of patients");
    }

    @Test
    void shouldReturnEmptyList_whenNoPacientesExist() {
        when(pacienteDao.readAll()).thenReturn(new ArrayList<>());

        List<Paciente> result = pacienteServiceImpl.findAll();
        assertTrue(result.isEmpty(), "Expected empty list when no patients exist");
    }

    @Test
    void shouldNotCallUpdateInformation_whenPacienteNotFound() {
        when(pacienteDao.readById(VALID_PACIENTE_ID)).thenReturn(null);

        pacienteServiceImpl.update(VALID_PACIENTE_ID, new Paciente());
        verify(pacienteDao, never()).updateInformation(anyInt(), any(Paciente.class));
    }

    @Test
    void shouldCallUpdateInformation_whenPacienteFound() {
        Paciente existingPaciente = new Paciente();
        existingPaciente.setPessoaId(VALID_PACIENTE_ID);

        when(pacienteDao.readById(VALID_PACIENTE_ID)).thenReturn(existingPaciente);

        Paciente updatedPaciente = new Paciente();
        pacienteServiceImpl.update(VALID_PACIENTE_ID, updatedPaciente);

        verify(pacienteDao, times(1)).updateInformation(VALID_PACIENTE_ID, updatedPaciente);
    }

    @Test
    void shouldReturnPaciente_whenFindingByPessoa() {
        Paciente paciente = new Paciente();
        paciente.setPessoaId(VALID_PACIENTE_ID);

        when(pacienteDao.findByPessoa(VALID_PACIENTE_ID)).thenReturn(paciente);

        Paciente result = pacienteServiceImpl.getByPessoa(VALID_PACIENTE_ID);
        assertNotNull(result, "Expected non-null result for valid person ID");
        assertEquals(VALID_PACIENTE_ID, result.getPessoaId(), "Expected matching patient ID");
    }

    @Test
    void shouldReturnNull_whenNoPacienteFoundByPessoa() {
        when(pacienteDao.findByPessoa(VALID_PACIENTE_ID)).thenReturn(null);

        Paciente result = pacienteServiceImpl.getByPessoa(VALID_PACIENTE_ID);
        assertNull(result, "Expected null result when no patient found by person ID");
    }
}