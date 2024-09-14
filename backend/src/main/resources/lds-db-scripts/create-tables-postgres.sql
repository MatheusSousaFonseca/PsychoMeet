-- Dropping tables if they exist
DROP TABLE IF EXISTS consulta;
DROP TABLE IF EXISTS dia;
DROP TABLE IF EXISTS agendamento;
DROP TABLE IF EXISTS disponibilidade;
DROP TABLE IF EXISTS psicologo_especialidade;
DROP TABLE IF EXISTS especialidade;
DROP TABLE IF EXISTS abordagem;
DROP TABLE IF EXISTS publico;
DROP TABLE IF EXISTS psicologo;
DROP TABLE IF EXISTS paciente;
DROP TABLE IF EXISTS pessoa;

-- Creating tables
CREATE TABLE pessoa (
                        id serial PRIMARY KEY,
                        telefone varchar(15) NOT NULL UNIQUE,
                        nome varchar(100) NOT NULL,
                        senha varchar(50) NOT NULL,
                        data_nascimento date NOT NULL,
                        cpf varchar(14) NOT NULL UNIQUE,
                        email varchar(100) NOT NULL UNIQUE
);

CREATE TABLE paciente (
                          id serial PRIMARY KEY,
                          pessoa_id int NOT NULL UNIQUE,
                          CONSTRAINT fk_paciente_pessoa FOREIGN KEY (pessoa_id) REFERENCES pessoa(id) ON UPDATE CASCADE ON DELETE NO ACTION
);

CREATE TABLE psicologo (
                           id serial PRIMARY KEY,
                           pessoa_id int NOT NULL UNIQUE,
                           crp varchar(20) NOT NULL UNIQUE,
                           descricao text NOT NULL,
                           CONSTRAINT fk_psicologo_pessoa FOREIGN KEY (pessoa_id) REFERENCES pessoa(id) ON UPDATE CASCADE ON DELETE NO ACTION
);

CREATE TABLE publico (
                         id serial PRIMARY KEY,
                         psicologo_id int NOT NULL,
                         publico text NOT NULL,
                         CONSTRAINT fk_psicologo_publico FOREIGN KEY (psicologo_id) REFERENCES psicologo(id) ON UPDATE CASCADE ON DELETE NO ACTION,
                         CONSTRAINT uk_psicologo_publico UNIQUE (psicologo_id, publico),
                         CONSTRAINT ck_publico CHECK(publico IN('Infantil', 'Juvenil', 'Adulto', 'Terceira idade'))
);

CREATE TABLE abordagem (
                           id serial PRIMARY KEY,
                           psicologo_id int NOT NULL,
                           abordagem text NOT NULL,
                           CONSTRAINT fk_psicologo_abordagem FOREIGN KEY (psicologo_id) REFERENCES psicologo(id) ON UPDATE CASCADE ON DELETE NO ACTION,
                           CONSTRAINT uk_psicologo_abordagem UNIQUE (psicologo_id, abordagem),
                           CONSTRAINT ck_abordagem CHECK(abordagem IN ('Psicologia Psicanalítica', 'Psicologia Comportamental', 'Psicologia Cognitiva', 'Psicologia Humanista', 'Psicologia Gestalt', 'Psicologia Evolutiva', 'Psicologia Social', 'Psicologia Positiva', 'Psicologia Biológica', 'Psicologia Clínico-Comportamental', 'Psicologia Ambiental', 'Psicologia da Saúde', 'Psicologia Forense', 'Psicologia Educacional', 'Psicologia Organizacional', 'Psicologia do Desenvolvimento', 'Psicologia Transcultural', 'Psicologia Existencial', 'Psicologia de Diferenças Individuais', 'Psicologia Aplicada', 'Psicologia da Personalidade', 'Psicologia do Trabalho e das Organizações', 'Psicologia Intercultural', 'Psicologia da Família', 'Psicologia do Esporte', 'Psicologia da Memória', 'Psicologia da Aprendizagem', 'Psicologia da Percepção', 'Psicologia da Motivação', 'Psicologia do Desenvolvimento Moral'))
);

CREATE TABLE especialidade (
                               id serial PRIMARY KEY,
                               descricao text NOT NULL UNIQUE
);

CREATE TABLE disponibilidade (
                                 id serial PRIMARY KEY,
                                 psicologo_id int NOT NULL,
                                 data_fim date NOT NULL,
                                 data_inicio date NOT NULL,
                                 CONSTRAINT fk_psicologo_disponibilidade FOREIGN KEY (psicologo_id) REFERENCES psicologo(id) ON UPDATE CASCADE ON DELETE NO ACTION,
                                 CONSTRAINT uk_disponibilidade UNIQUE (psicologo_id, data_inicio, data_fim)
);

CREATE TABLE agendamento (
                             id serial PRIMARY KEY,
                             data date NOT NULL,
                             paciente_id int NOT NULL,
                             disponibilidade_id int NOT NULL,
                             hora_inicio time NOT NULL,
                             hora_fim time NOT NULL,
                             status varchar(50) NOT NULL,
                             CONSTRAINT uk_agenda_data_hora UNIQUE (data, hora_inicio, hora_fim),
                             CONSTRAINT fk_agendamento_paciente FOREIGN KEY (paciente_id) REFERENCES paciente(id) ON UPDATE CASCADE ON DELETE NO ACTION,
                             CONSTRAINT fk_agendamento_disponibilidade FOREIGN KEY (disponibilidade_id) REFERENCES disponibilidade(id) ON UPDATE CASCADE ON DELETE NO ACTION
);

CREATE TABLE dia (
                     id serial PRIMARY KEY,
                     disponibilidade_id int NOT NULL,
                     turno varchar(50) NOT NULL CHECK (turno IN ('matutino', 'vespertino', 'noturno')),
                     dia_semana varchar(15) NOT NULL,
                     hora_inicio time NOT NULL,
                     hora_fim time NOT NULL,
                     CONSTRAINT fk_dia_disponibilidade FOREIGN KEY (disponibilidade_id) REFERENCES disponibilidade(id) ON UPDATE CASCADE ON DELETE NO ACTION,
                     CONSTRAINT ck_dia_semana CHECK (dia_semana IN ('segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado', 'domingo')),
                     CONSTRAINT uk_dia_disponibilidade_turno_dia_semana UNIQUE (disponibilidade_id, turno, dia_semana)
);

CREATE TABLE consulta (
                          id serial PRIMARY KEY,
                          agenda_id int NOT NULL UNIQUE,
                          nota_paciente int NOT NULL,
                          comentario_paciente text,
                          CONSTRAINT fk_consulta_agenda FOREIGN KEY (agenda_id) REFERENCES agendamento(id) ON UPDATE CASCADE ON DELETE NO ACTION
);

CREATE TABLE psicologo_especialidade (
                                         id serial PRIMARY KEY,
                                         psicologo_id int NOT NULL,
                                         especialidade_id int NOT NULL,
                                         CONSTRAINT fk_psicologo_especialidade_psicologo FOREIGN KEY (psicologo_id) REFERENCES psicologo(id) ON UPDATE CASCADE ON DELETE NO ACTION,
                                         CONSTRAINT fk_psicologo_especialidade_especialidade FOREIGN KEY (especialidade_id) REFERENCES especialidade(id) ON UPDATE CASCADE ON DELETE NO ACTION,
                                         CONSTRAINT uk_psicologo_especialidade UNIQUE (psicologo_id, especialidade_id)
);
