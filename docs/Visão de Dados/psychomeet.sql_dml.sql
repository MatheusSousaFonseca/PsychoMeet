begin;

create table pessoa (
    id serial primary key,
    telefone varchar(15) not null unique,
    nome varchar(100) not null,
    senha varchar(50) not null,
    data_nascimento date not null,
    cpf varchar(14) not null unique,
    email varchar(100) not null unique
);

create table foto (
    id serial primary key,
    pessoa_id int not null,
    foto bytea not null,
    constraint fk_pessoa_foto foreign key (pessoa_id) references pessoa(id) on update cascade on delete no action,
    constraint uk_pessoa_foto unique (pessoa_id, foto)
);

create table paciente (
    id serial primary key,
    pessoa_id int not null unique,
    constraint fk_pessoa_id foreign key (pessoa_id) references pessoa(id) on update cascade on delete no action
);

create table psicologo (
    id serial primary key,
    pessoa_id int not null unique,
    crp varchar(20) not null unique,
    descricao text not null,
    constraint fk_pessoa_psicologo foreign key (pessoa_id) references pessoa(id) on update cascade on delete no action,
    constraint uk_psicologo_crp unique (crp)
);

create table publico (
    id serial primary key,
    psicologo_id int not null,
    publico text not null,
    constraint fk_psicologo_publico foreign key (psicologo_id) references psicologo(id) on update cascade on delete no action,
    constraint uk_psicologo_publico unique (psicologo_id, publico),
    constraint ck_publico check(publico in('Infantil', 'Juvenil', 'Adulto', 'Terceira idade'))
);

create table abordagem (
    id serial primary key,
    psicologo_id int not null,
    abordagem text not null,
    constraint fk_psicologo_abordagem foreign key (psicologo_id) references psicologo(id) on update cascade on delete no action,
    constraint uk_psicologo_abordagem unique (psicologo_id, abordagem),
    constraint ck_abordagem check(abordagem in ('Psicologia Psicanalítica', 'Psicologia Comportamental', 'Psicologia Cognitiva', 'Psicologia Humanista', 'Psicologia Gestalt', 'Psicologia Evolutiva', 'Psicologia Social', 'Psicologia Positiva', 'Psicologia Biológica', 'Psicologia Clínico-Comportamental', 'Psicologia Ambiental', 'Psicologia da Saúde', 'Psicologia Forense', 'Psicologia Educacional', 'Psicologia Organizacional', 'Psicologia do Desenvolvimento', 'Psicologia Transcultural', 'Psicologia Existencial', 'Psicologia de Diferenças Individuais', 'Psicologia Aplicada', 'Psicologia da Personalidade', 'Psicologia do Trabalho e das Organizações', 'Psicologia Intercultural', 'Psicologia da Família', 'Psicologia do Esporte', 'Psicologia da Memória', 'Psicologia da Aprendizagem', 'Psicologia da Percepção', 'Psicologia da Motivação', 'Psicologia do Desenvolvimento Moral'))

);

create table especialidade (
    id serial primary key,
    descricao text not null,
    constraint uk_especialidade_descricao unique (descricao)
);

create table disponibilidade (
    id serial primary key,
    psicologo_id int not null,
    data_fim date not null,
    data_inicio date not null,
    constraint fk_psicologo_disponibilidade foreign key (psicologo_id) references psicologo(id) on update cascade on delete no action,
    unique (psicologo_id, data_inicio),
    unique (psicologo_id, data_fim)
);

create table agendamento (
    id serial primary key,
    data date not null,
    paciente_id int not null,
    disponibilidade_id int not null,
    hora_inicio time not null,
    hora_fim time not null,
    status varchar(50) not null,
    constraint uk_agenda_data_hora unique (data, hora_inicio, hora_fim),
    constraint fk_paciente_id foreign key (paciente_id) references paciente(id) on update cascade on delete no action,
    constraint fk_disponibilidade_id foreign key (disponibilidade_id) references disponibilidade(id) on update cascade on delete no action,

);

create table dia (
    id serial primary key,
    disponibilidade_id int not null,
    turno varchar(50) not null check (turno in ('matutino', 'vespertino', 'noturno')),
    dia_semana varchar(15) not null,
    hora_inicio time not null,
    hora_fim time not null,
    constraint fk_disponibilidade_dia foreign key (disponibilidade_id) references disponibilidade(id) on update cascade on delete no action,
    constraint ck_dia_semana check (dia_semana in ('segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado', 'domingo')),
    constraint uk_dia_disponibilidade_turno_dia_semana unique (disponibilidade_id, turno, dia_semana)
);



create table consulta (
    id serial primary key,
    agenda_id int not null unique,
    nota_paciente int not null,
    comentario_paciente text,
    constraint fk_agenda_consulta foreign key (agenda_id) references agendamento(id) on update cascade on delete no action,
    constraint uk_consulta_agenda_id unique (agenda_id)
);

create table psicologo_especialidade (
    id serial primary key,
    psicologo_id int not null,
    especialidade_id int not null,
    constraint fk_psicologo_especialidade_psicologo foreign key (psicologo_id) references psicologo(id) on update cascade on delete no action,
    constraint fk_psicologo_especialidade_especialidade foreign key (especialidade_id) references especialidade(id) on update cascade on delete no action,
    unique (psicologo_id, especialidade_id)
);

commit;


INSERT INTO pessoa (telefone, nome, senha, data_nascimento, cpf, email) VALUES
('1234567890', 'Ana Silva', 'senha123', '1990-01-15', '123.456.789-00', 'ana.silva@example.com'),
('2345678901', 'Carlos Souza', 'senha456', '1985-05-20', '234.567.890-11', 'carlos.souza@example.com'),
('3456789012', 'Fernanda Lima', 'senha789', '1992-08-25', '345.678.901-22', 'fernanda.lima@example.com'),
('4567890123', 'Jorge Santos', 'senha101', '1988-12-30', '456.789.012-33', 'jorge.santos@example.com'),
('5678901234', 'Juliana Costa', 'senha202', '1991-07-17', '567.890.123-44', 'juliana.costa@example.com'),
('6789012345', 'Luís Almeida', 'senha303', '1994-03-10', '678.901.234-55', 'luis.almeida@example.com'),
('7890123456', 'Mariana Rocha', 'senha404', '1987-11-05', '789.012.345-66', 'mariana.rocha@example.com'),
('8901234567', 'Pedro Oliveira', 'senha505', '1993-09-15', '890.123.456-77', 'pedro.oliveira@example.com'),
('9012345678', 'Raquel Pereira', 'senha606', '1995-02-20', '901.234.567-88', 'raquel.pereira@example.com'),
('0123456789', 'Tiago Fernandes', 'senha707', '1996-06-25', '012.345.678-99', 'tiago.fernandes@example.com');

INSERT INTO foto (pessoa_id, foto) VALUES
(1, 'imagem_1'),
(2, 'imagem_2'),
(3, 'imagem_3'),
(4, 'imagem_4'),
(5, 'imagem_5'),
(6, 'imagem_6'),
(7, 'imagem_7'),
(8, 'imagem_8'),
(9, 'imagem_9'),
(10, 'imagem_10');

INSERT INTO paciente (pessoa_id) VALUES
(1), (2), (3), (4), (5), (6), (7), (8), (9), (10);

INSERT INTO psicologo (pessoa_id, crp, descricao) VALUES
(1, 'CRP-01', 'Psicólogo clínico com experiência em terapia cognitivo-comportamental.'),
(2, 'CRP-02', 'Psicólogo organizacional especializado em coaching e desenvolvimento de líderes.'),
(3, 'CRP-03', 'Psicólogo com foco em psicologia infantil e apoio familiar.'),
(4, 'CRP-04', 'Psicólogo especialista em psicologia positiva e bem-estar.'),
(5, 'CRP-05', 'Psicólogo clínico com experiência em psicologia da saúde.'),
(6, 'CRP-06', 'Psicólogo com atuação em psicologia do esporte e performance.'),
(7, 'CRP-07', 'Psicólogo forense com atuação em avaliações e perícias.'),
(8, 'CRP-08', 'Psicólogo educacional especializado em orientação vocacional.'),
(9, 'CRP-09', 'Psicólogo com experiência em psicologia da memória e aprendizagem.'),
(10, 'CRP-10', 'Psicólogo com atuação em psicologia clínica e desenvolvimento pessoal.');

INSERT INTO publico (psicologo_id, publico) VALUES
(1, 'Adulto'), (2, 'Infantil'), (3, 'Infantil'), (4, 'Adulto'), (5, 'Juvenil'), (6, 'Juvenil'), (7, 'Terceira idade'), (8, 'Infantil'), (9, 'Adulto'), (10, 'Terceira idade');

INSERT INTO abordagem (psicologo_id, abordagem) VALUES
(1, 'Psicologia Cognitiva'), (2, 'Psicologia Psicanalítica'), (3, 'Psicologia Comportamental'), (4, 'Psicologia Evolutiva'), (5, 'Psicologia Gestalt'), (6, 'Psicologia Social'), (7, 'Psicologia Biológica'), (8, 'Psicologia Clínico-Comportamental'), (9, 'Psicologia da Memória'), (10, 'Psicologia da Personalidade');

INSERT INTO especialidade (descricao) VALUES
('Terapia Cognitivo-Comportamental'), ('Coaching e Desenvolvimento de Líderes'), ('Psicologia Infantil'), ('Psicologia Positiva'), ('Psicologia da Saúde'), ('Psicologia do Esporte'), ('Psicologia Forense'), ('Orientação Vocacional'), ('Psicologia da Memória'), ('Desenvolvimento Pessoal');

INSERT INTO disponibilidade (psicologo_id, data_inicio, data_fim) VALUES
(1, '2024-01-01', '2024-12-31'), (2, '2024-01-01', '2024-12-31'), (3, '2024-01-01', '2024-12-31'), (4, '2024-01-01', '2024-12-31'), (5, '2024-01-01', '2024-12-31'),
(6, '2024-01-01', '2024-12-31'), (7, '2024-01-01', '2024-12-31'), (8, '2024-01-01', '2024-12-31'), (9, '2024-01-01', '2024-12-31'), (10, '2024-01-01', '2024-12-31');

INSERT INTO agendamento (data, paciente_id, disponibilidade_id, hora_inicio, hora_fim, status) VALUES
('2024-08-01', 1, 1, '09:00:00', '10:00:00', 'Confirmado'), 
('2024-08-02', 2, 2, '10:00:00', '11:00:00', 'Confirmado'),
('2024-08-03', 3, 3, '11:00:00', '12:00:00', 'Pendente'),
('2024-08-04', 4, 4, '14:00:00', '15:00:00', 'Cancelado'),
('2024-08-05', 5, 5, '15:00:00', '16:00:00', 'Confirmado'),
('2024-08-06', 6, 6, '09:00:00', '10:00:00', 'Confirmado'),
('2024-08-07', 7, 7, '10:00:00', '11:00:00', 'Pendente'),
('2024-08-08', 8, 8, '11:00:00', '12:00:00', 'Confirmado'),
('2024-08-09', 9, 9, '14:00:00', '15:00:00', 'Cancelado'),
('2024-08-10', 10, 10, '15:00:00', '16:00:00', 'Confirmado');

INSERT INTO dia (disponibilidade_id, turno, dia_semana, hora_inicio, hora_fim) VALUES
(1, 'matutino', 'segunda-feira', '09:00:00', '12:00:00'),
(1, 'vespertino', 'terça-feira', '13:00:00', '16:00:00'),
(1, 'noturno', 'quarta-feira', '18:00:00', '21:00:00'),
(2, 'matutino', 'quinta-feira', '09:00:00', '12:00:00'),
(2, 'vespertino', 'sexta-feira', '13:00:00', '16:00:00'),
(2, 'noturno', 'sábado', '18:00:00', '21:00:00'),
(3, 'matutino', 'domingo', '09:00:00', '12:00:00'),
(3, 'vespertino', 'segunda-feira', '13:00:00', '16:00:00'),
(3, 'noturno', 'terça-feira', '18:00:00', '21:00:00'),
(4, 'matutino', 'quarta-feira', '09:00:00', '12:00:00');

INSERT INTO consulta (agenda_id, nota_paciente, comentario_paciente) VALUES
(1, 5, 'Ótima consulta, muito atencioso.'),
(2, 4, 'Boa sessão, mas poderia ter sido mais detalhada.'),
(3, 3, 'Consulta ok, mas tive dificuldades em entender algumas explicações.'),
(4, 2, 'A consulta foi cancelada.'),
(5, 5, 'Excelente, superou minhas expectativas.'),
(6, 4, 'Boa consulta, porém o tempo foi curto.'),
(7, 3, 'Consulta intermediária, ainda há pontos a melhorar.'),
(8, 5, 'Muito bom, o psicólogo foi bastante esclarecedor.'),
(9, 2, 'A consulta foi cancelada por problemas de agenda.'),
(10, 4, 'Consulta produtiva, mas a sala estava um pouco desconfortável.');

INSERT INTO psicologo_especialidade (psicologo_id, especialidade_id) VALUES
(1, 1), (2, 2), (3, 3), (4, 4), (5, 5),
(6, 6), (7, 7), (8, 8), (9, 9), (10, 10);

