-- Inserção de mais pessoas
INSERT INTO pessoa (telefone, nome, senha, data_nascimento, cpf, email)
VALUES
    ('11111111111', 'João Silva', 'senha123', '1985-06-15', '12345678900', 'joao@gmail.com'),
    ('22222222222', 'Maria Oliveira', 'senha456', '1990-10-05', '98765432100', 'maria@gmail.com'),
    ('33333333333', 'Carlos Souza', 'senha789', '1987-02-20', '11223344556', 'carlos@gmail.com'),
    ('44444444444', 'Ana Mendes', 'senha321', '1992-11-30', '99887766554', 'ana@gmail.com'),
    ('55555555555', 'Paulo Lima', 'senha654', '1980-04-10', '55667788900', 'paulo@gmail.com'),
    ('66666666666', 'Juliana Costa', 'senha987', '1995-03-22', '44332211000', 'juliana@gmail.com'),
    ('77777777777', 'Pedro Rocha', 'senhaabc', '1983-09-15', '33445566778', 'pedro@gmail.com'),
    ('88888888888', 'Fernanda Alves', 'senhadfgh', '1988-07-10', '66778899000', 'fernanda@gmail.com'),
    ('99999999999', 'Lucas Silva', 'senhaxyz', '1991-12-01', '77889900111', 'lucas@gmail.com'),
    ('10101010101', 'Isabela Nunes', 'senhamnb', '1985-08-19', '99001122334', 'isabela@gmail.com'),
    ('11111122222', 'Renato Gomes', 'senhaqwe', '1989-05-05', '88990077665', 'renato@gmail.com'),
    ('12121212121', 'Mariana Cardoso', 'senha1234', '1994-06-25', '34556677889', 'mariana@gmail.com');

-- Inserção de mais pacientes
INSERT INTO paciente (pessoa_id)
VALUES
    (1),
    (2),
    (3),
    (4),
    (5),
    (6),
    (7),
    (8),
    (9),
    (10),
    (11),
    (12);

-- Inserção de mais psicólogos
INSERT INTO psicologo (pessoa_id, crp, descricao)
VALUES
    (1, '123456', 'Psicólogo com experiência em terapia cognitivo-comportamental'),
    (2, '654321', 'Psicóloga especializada em terapia infantil'),
    (3, '112233', 'Experiência em psicologia clínica com foco em adolescentes'),
    (4, '223344', 'Especialista em psicologia do esporte'),
    (5, '334455', 'Atua com psicoterapia breve e intervenção em crises'),
    (6, '445566', 'Psicóloga focada em terapias integrativas e comunitárias'),
    (7, '556677', 'Experiência em psicologia escolar e educacional'),
    (8, '667788', 'Atua com psicologia organizacional e do trabalho'),
    (9, '778899', 'Psicóloga especializada em psicoterapia familiar'),
    (10, '889900', 'Experiência em psicologia social e psicoterapia de grupo'),
    (11, '990011', 'Especialista em neuropsicologia e TCC'),
    (12, '110022', 'Psicólogo clínico com enfoque em terapia humanista');

-- Inserção de mais públicos
INSERT INTO publico (psicologo_id, publico)
VALUES
    (1, 'Adulto'),
    (2, 'Infantil'),
    (3, 'Adolescentes'),
    (4, 'Atletas'),
    (5, 'Adulto'),
    (6, 'Comunidades carentes'),
    (7, 'Crianças e adolescentes'),
    (8, 'Adulto e idoso'),
    (9, 'Famílias'),
    (10, 'Grupos sociais'),
    (11, 'Adulto'),
    (12, 'Adulto');

-- Inserção de mais abordagens
INSERT INTO abordagem (psicologo_id, abordagem)
VALUES
    (1, 'Psicologia Cognitiva'),
    (2, 'Psicologia Psicanalítica'),
    (3, 'Terapia Sistêmica'),
    (4, 'Psicologia do Esporte'),
    (5, 'Psicoterapia Breve'),
    (6, 'Psicologia Comunitária'),
    (7, 'Psicologia Educacional'),
    (8, 'Psicologia Organizacional'),
    (9, 'Terapia Familiar'),
    (10, 'Terapia de Grupo'),
    (11, 'Neuropsicologia'),
    (12, 'Terapia Humanista');

-- Inserção de mais disponibilidades
INSERT INTO disponibilidade (psicologo_id, data_inicio, data_fim)
VALUES
    (1, '2024-09-01', '2024-09-30'),
    (2, '2024-09-01', '2024-09-15'),
    (3, '2024-09-01', '2024-09-30'),
    (4, '2024-09-10', '2024-09-25'),
    (5, '2024-09-01', '2024-09-20'),
    (6, '2024-09-05', '2024-09-28'),
    (7, '2024-09-03', '2024-09-15'),
    (8, '2024-09-08', '2024-09-30'),
    (9, '2024-09-12', '2024-09-27'),
    (10, '2024-09-15', '2024-09-29'),
    (11, '2024-09-10', '2024-09-22'),
    (12, '2024-09-05', '2024-09-18');

-- Inserção de mais agendamentos
INSERT INTO agendamento (data, paciente_id, disponibilidade_id, hora_inicio, hora_fim, status)
VALUES
    ('2024-09-10', 1, 1, '09:00', '10:00', 'Confirmado'),
    ('2024-09-12', 2, 2, '11:00', '12:00', 'Confirmado'),
    ('2024-09-11', 3, 3, '10:00', '11:00', 'Confirmado'),
    ('2024-09-13', 4, 4, '14:00', '15:00', 'Confirmado'),
    ('2024-09-14', 5, 5, '09:00', '10:00', 'Confirmado'),
    ('2024-09-16', 6, 6, '16:00', '17:00', 'Confirmado'),
    ('2024-09-18', 7, 7, '11:00', '12:00', 'Confirmado'),
    ('2024-09-19', 8, 8, '15:00', '16:00', 'Confirmado'),
    ('2024-09-21', 9, 9, '08:00', '09:00', 'Confirmado'),
    ('2024-09-23', 10, 10, '17:00', '18:00', 'Confirmado'),
    ('2024-09-24', 11, 11, '13:00', '14:00', 'Confirmado'),
    ('2024-09-26', 12, 12, '10:00', '11:00', 'Confirmado');

-- Inserção de mais turnos de dias
INSERT INTO dia (disponibilidade_id, turno, dia_semana, hora_inicio, hora_fim)
VALUES
    (1, 'matutino', 'segunda-feira', '08:00', '12:00'),
    (2, 'vespertino', 'terça-feira', '13:00', '17:00'),
    (3, 'matutino', 'quarta-feira', '08:00', '12:00'),
    (4, 'vespertino', 'quinta-feira', '13:00', '17:00'),
    (5, 'noturno', 'sexta-feira', '18:00', '22:00'),
    (6, 'matutino', 'segunda-feira', '09:00', '12:00'),
    (7, 'vespertino', 'terça-feira', '14:00', '18:00'),
    (8, 'matutino', 'quinta-feira', '08:00', '12:00'),
    (9, 'vespertino', 'sexta-feira', '13:00', '17:00'),
    (10, 'noturno', 'quarta-feira', '18:00', '22:00'),
    (11, 'matutino', 'segunda-feira', '09:00', '12:00'),
    (12, 'vespertino', 'terça-feira', '13:00', '17:00);


 -- Inserção de mais consultas
 INSERT INTO consulta (agenda_id, nota_paciente, comentario_paciente)
 VALUES
     (1, 5, 'Excelente atendimento'),
     (2, 4, 'Boa consulta, mas pode melhorar'),
     (3, 5, 'Atendimento muito bom, ajudou muito'),
     (4, 3, 'Senti que faltou algo'),
     (5, 4, 'Consulta produtiva'),
     (6, 5, 'Ótimo, gostei bastante da abordagem'),
     (7, 4, 'Achei bom, mas podia ser mais profundo'),
     (8, 5, 'Foi exatamente o que eu esperava'),
     (9, 3, 'Precisa melhorar o tempo de atendimento'),
     (10, 5, 'Muito bom, já sinto melhoras'),
     (11, 4, 'Profissional atencioso e competente'),
     (12, 5, 'Excelente, superou as expectativas');

 -- Inserção de mais psicólogo_especialidade
 INSERT INTO psicologo_especialidade (psicologo_id, especialidade_id)
 VALUES
     (1, 1), -- Psicologia clínica
     (2, 2), -- Psicologia educacional
     (3, 3), -- Psicologia organizacional e do trabalho
     (4, 4), -- Psicologia do desenvolvimento
     (5, 5), -- Psicologia da saúde
     (6, 6), -- Psicologia social
     (7, 7), -- Psicologia do esporte
     (8, 8), -- Psicologia forense
     (9, 9), -- Neuropsicologia
     (10, 10), -- Terapia cognitivo-comportamental (TCC)
     (11, 11), -- Terapia de casal e família
     (12, 12); -- Psicologia infantil

