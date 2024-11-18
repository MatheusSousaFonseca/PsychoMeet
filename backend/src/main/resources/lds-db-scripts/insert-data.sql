-- DML para o schema
--Feito com ChatGPT
-- Insere dados na tabela pessoa
INSERT INTO pessoa (telefone, nome, senha, data_nascimento, cpf, email)
VALUES
    ('11111111111', 'João Silva', 'senha123', '1985-06-15', '12345678900', 'joao@gmail.com', 'PSICOLOGO'),
    ('22222222222', 'Maria Oliveira', 'senha456', '1990-10-05', '98765432100', 'maria@gmail.com', 'PSICOLOGO');


-- Insere dados na tabela paciente
INSERT INTO paciente (pessoa_id)
VALUES
    (1),  -- João Silva
    (2); -- Maria Oliveira

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
    ('Psicologia clínica'),
    ('Psicologia educacional'),
    ('Psicologia organizacional e do trabalho'),
    ('Psicologia do desenvolvimento'),
    ('Psicologia da saúde'),
    ('Psicologia social'),
    ('Psicologia do esporte'),
    ('Psicologia forense'),
    ('Neuropsicologia'),
    ('Terapia cognitivo-comportamental (TCC)'),
    ('Terapia de casal e família'),
    ('Psicologia infantil'),
    ('Psicologia geriátrica'),
    ('Psicologia comunitária'),
    ('Psicologia positiva'),
    ('Psicologia do trânsito'),
    ('Psicologia ambiental'),
    ('Psicologia do luto'),
    ('Psicologia da religião e espiritualidade'),
    ('Psicologia do consumo'),
    ('Psicologia da arte'),
    ('Psicologia da sexualidade'),
    ('Psicologia da personalidade'),
    ('Psicologia de emergência e desastres'),
    ('Psicologia da criatividade'),
    ('Psicologia intercultural'),
    ('Psicologia da intervenção em crises'),
    ('Psicologia da comunicação'),
    ('Psicologia do desenvolvimento organizacional'),
    ('Psicologia da justiça restaurativa');

-- Insere dados na tabela disponibilidade
INSERT INTO disponibilidade (psicologo_id, data, hora_intervalo)
VALUES
    (1, '2024-09-01', '09:00-10:00'),  -- Disponibilidade de João Silva
    (2, '2024-09-01', '11:00-12:00');  -- Disponibilidade de Maria Oliveira


-- Insere dados na tabela agendamento
INSERT INTO agendamento (paciente_id, disponibilidade_id, data_agendamento, status)
VALUES
    (1, 1, '2024-08-10', 'pendente'),  -- João Silva com disponibilidade 1, aguardando confirmação
    (2, 2, '2024-08-12', 'pendente');  -- Maria Oliveira com disponibilidade 2, aguardando confirmação


-- Insere dados na tabela consulta
INSERT INTO consulta (agenda_id, nota_paciente, comentario_paciente)
VALUES
    (1, 5, 'Excelente atendimento'),  -- Consulta para o agendamento 1 (João Silva)
    (2, 4, 'Boa consulta, mas pode melhorar');  -- Consulta para o agendamento 2 (Maria Oliveira)


-- Insere dados na tabela psicologo_especialidade
INSERT INTO psicologo_especialidade (psicologo_id, especialidade_id)
VALUES
    (1, 1),  -- João Silva com especialidade Psicologia Clínica
    (2, 2);  -- Maria Oliveira com especialidade Psicologia Educacional
