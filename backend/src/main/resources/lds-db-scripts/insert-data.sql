INSERT INTO pessoa (telefone, nome, senha, data_nascimento, cpf, email)
VALUES
    ('11111111111', 'João Silva', 'senha123', '1985-06-15', '12345678900', 'joao@gmail.com'),
    ('22222222222', 'Maria Oliveira', 'senha456', '1990-10-05', '98765432100', 'maria@gmail.com');


INSERT INTO paciente (pessoa_id)
VALUES
    (1),
    (2);

INSERT INTO psicologo (pessoa_id, crp, descricao)
VALUES
    (1, '123456', 'Psicólogo com experiência em terapia cognitivo-comportamental'),
    (2, '654321', 'Psicóloga especializada em terapia infantil');


INSERT INTO publico (psicologo_id, publico)
VALUES
    (1, 'Adulto'),
    (2, 'Infantil');


INSERT INTO abordagem (psicologo_id, abordagem)
VALUES
    (1, 'Psicologia Cognitiva'),
    (2, 'Psicologia Psicanalítica');


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


INSERT INTO disponibilidade (psicologo_id, data_inicio, data_fim)
VALUES
    (1, '2024-09-01', '2024-09-30'),
    (2, '2024-09-01', '2024-09-15');


INSERT INTO agendamento (data, paciente_id, disponibilidade_id, hora_inicio, hora_fim, status)
VALUES
    ('2024-09-10', 1, 1, '09:00', '10:00', 'Confirmado'),
    ('2024-09-12', 2, 2, '11:00', '12:00', 'Confirmado');


INSERT INTO dia (disponibilidade_id, turno, dia_semana, hora_inicio, hora_fim)
VALUES
    (1, 'matutino', 'segunda-feira', '08:00', '12:00'),
    (2, 'vespertino', 'terça-feira', '13:00', '17:00');


INSERT INTO consulta (agenda_id, nota_paciente, comentario_paciente)
VALUES
    (1, 5, 'Excelente atendimento'),
    (2, 4, 'Boa consulta, mas pode melhorar');


INSERT INTO psicologo_especialidade (psicologo_id, especialidade_id)
VALUES
    (1, 1),
    (2, 2);
