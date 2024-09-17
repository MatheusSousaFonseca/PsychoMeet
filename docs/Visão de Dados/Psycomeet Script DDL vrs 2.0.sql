drop database if exists psychomeet;
create database psychomeet;

\c psychomeet;

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
