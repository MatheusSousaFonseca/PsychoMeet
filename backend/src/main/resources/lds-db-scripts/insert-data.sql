-- DML para o schema
--Feito com ChatGPT
-- Insere dados na tabela pessoa
INSERT INTO pessoa (telefone, nome, senha, data_nascimento, cpf, email)
VALUES
    ('11111111111', 'João Silva', 'senha123', '1985-06-15', '12345678900', 'joao@gmail.com'),
    ('22222222222', 'Maria Oliveira', 'senha456', '1990-10-05', '98765432100', 'maria@gmail.com');


-- Insere dados na tabela paciente
INSERT INTO paciente (pessoa_id)
VALUES
    (1),
    (2);

-- Insere dados na tabela psicologo
INSERT INTO psicologo (pessoa_id, crp, descricao)
VALUES
    (1, '123456', 'Psicólogo com experiência em terapia cognitivo-comportamental'),
    (2, '654321', 'Psicóloga especializada em terapia infantil');

-- Insere dados na tabela publico
INSERT INTO publico (psicologo_id, publico)
VALUES
    (1, 'Adulto'),
    (2, 'Infantil');

-- Insere dados na tabela abordagem
INSERT INTO abordagem (psicologo_id, abordagem)
VALUES
    (1, 'Psicologia Cognitiva'),
    (2, 'Psicologia Psicanalítica');

-- Insere dados na tabela especialidade
INSERT INTO especialidade (descricao)
VALUES
    ('Terapia Cognitivo-Comportamental'),
    ('Psicoterapia Infantil');

-- Insere dados na tabela disponibilidade
INSERT INTO disponibilidade (psicologo_id, data_inicio, data_fim)
VALUES
    (1, '2024-09-01', '2024-09-30'),
    (2, '2024-09-01', '2024-09-15');

-- Insere dados na tabela agendamento
INSERT INTO agendamento (data, paciente_id, disponibilidade_id, hora_inicio, hora_fim, status)
VALUES
    ('2024-09-10', 1, 1, '09:00', '10:00', 'Confirmado'),
    ('2024-09-12', 2, 2, '11:00', '12:00', 'Confirmado');

-- Insere dados na tabela dia
INSERT INTO dia (disponibilidade_id, turno, dia_semana, hora_inicio, hora_fim)
VALUES
    (1, 'matutino', 'segunda-feira', '08:00', '12:00'),
    (2, 'vespertino', 'terça-feira', '13:00', '17:00');

-- Insere dados na tabela consulta
INSERT INTO consulta (agenda_id, nota_paciente, comentario_paciente)
VALUES
    (1, 5, 'Excelente atendimento'),
    (2, 4, 'Boa consulta, mas pode melhorar');

-- Insere dados na tabela psicologo_especialidade
INSERT INTO psicologo_especialidade (psicologo_id, especialidade_id)
VALUES
    (1, 1),
    (2, 2);
