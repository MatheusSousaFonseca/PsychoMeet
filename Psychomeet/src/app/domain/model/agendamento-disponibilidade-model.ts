export interface AgendamentoDisponibilidade {
    consultaId: number;              
    agendaId: number;                
    pacienteId: number;              
    pessoaIdPaciente: number;        
    notaPaciente: number;            
    comentarioPaciente: string;      
    status: string;                  
    dataDisponibilidade: string;     
    horaIntervalo: string;           
    psicologoId: number;             
    pessoaIdPsicologo: number;       
    nomePsicologo: string;           
    id?: number;
  }