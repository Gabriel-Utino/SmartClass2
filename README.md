##insatall
npm i express cors mysql body-parser

##DB tables
CREATE TABLE Responsavel (
    id_resp INT AUTO_INCREMENT PRIMARY KEY,
    nome_resp VARCHAR(255),
    cpf_resp VARCHAR(255) UNIQUE,
    endereco_resp VARCHAR(255),
    telefone_resp VARCHAR(255),
    email_resp VARCHAR(128) UNIQUE,
    senha_resp VARCHAR(128)
);

CREATE TABLE Turma (
    id_turma INT AUTO_INCREMENT PRIMARY KEY,
    nome_turma VARCHAR(255),
    ano YEAR,
    semestre INT
);

CREATE TABLE Aluno (
    id_aluno INT AUTO_INCREMENT PRIMARY KEY,
    nome_aluno VARCHAR(255),
    cpf_aluno VARCHAR(11),
    endereco_aluno VARCHAR(255),
    telefone_aluno VARCHAR(255),
    email_aluno VARCHAR(128),
    nascimento_aluno DATE,
    ra_aluno VARCHAR(255),
    data_matricula DATE,
    foto VARCHAR(255),
    senha VARCHAR(255),
    id_turma INT,
    FOREIGN KEY (id_turma) REFERENCES Turma(id_turma)
);

CREATE TABLE Responsavel_Aluno (
    id_resp_aluno INT AUTO_INCREMENT PRIMARY KEY,
    id_resp INT,
    id_aluno INT,
    FOREIGN KEY (id_resp) REFERENCES Responsavel(id_resp),
    FOREIGN KEY (id_aluno) REFERENCES Aluno(id_aluno)
);

CREATE TABLE Evento (
    id_evento INT AUTO_INCREMENT PRIMARY KEY,
    nome_evento VARCHAR(255),
    link_evento VARCHAR(255),
    data_evento DATE
);

CREATE TABLE Evento_aluno (
    id_evento_aluno INT AUTO_INCREMENT PRIMARY KEY,
    id_evento INT,
    id_aluno INT,
    FOREIGN KEY (id_evento) REFERENCES Evento(id_evento),
    FOREIGN KEY (id_aluno) REFERENCES Aluno(id_aluno)
);

CREATE TABLE Professor (
    id_prof INT AUTO_INCREMENT PRIMARY KEY,
    nome_prof VARCHAR(255),
    cpf_prof VARCHAR(11) UNIQUE,
    telefone_prof VARCHAR(255),
    email_consti_prof VARCHAR(128) UNIQUE,
    email_prof VARCHAR(128) UNIQUE,
    nascimento_prof DATE,
    endereco_prof VARCHAR(128),
    senha VARCHAR(255)
);

CREATE TABLE Evento_professor (
    id_evento_prof INT AUTO_INCREMENT PRIMARY KEY,
    id_evento INT,
    id_prof INT,
    FOREIGN KEY (id_evento) REFERENCES Evento(id_evento),
    FOREIGN KEY (id_prof) REFERENCES Professor(id_prof)
);

CREATE TABLE Disciplina (
    id_disciplina INT AUTO_INCREMENT PRIMARY KEY,
    disciplina VARCHAR(255),
    horario INT
);

CREATE TABLE Aluno_disciplina (
    id_aluno_disc INT AUTO_INCREMENT PRIMARY KEY,
    id_aluno INT,
    id_disciplina INT,
    FOREIGN KEY (id_aluno) REFERENCES Aluno(id_aluno),
    FOREIGN KEY (id_disciplina) REFERENCES Disciplina(id_disciplina)
);

CREATE TABLE Notas_faltas (
    id_notas_faltas INT AUTO_INCREMENT PRIMARY KEY,
    id_disciplina INT,
    id_aluno INT,
    N1 REAL,
    AI REAL,
    AP REAL,
    faltas INT,
    academic_year YEAR,
    data_matricula DATE,
    semestre INT,
    FOREIGN KEY (id_disciplina) REFERENCES Disciplina(id_disciplina),
    FOREIGN KEY (id_aluno) REFERENCES Aluno(id_aluno)
);

CREATE TABLE Prof_Disciplina (
    id_prof_disc INT AUTO_INCREMENT PRIMARY KEY,
    id_prof INT,
    id_disciplina INT,
    FOREIGN KEY (id_prof) REFERENCES Professor(id_prof),
    FOREIGN KEY (id_disciplina) REFERENCES Disciplina(id_disciplina)
);

CREATE TABLE Turma_Disciplina (
    id_turma_disc INT AUTO_INCREMENT PRIMARY KEY,
    id_turma INT,
    id_disciplina INT,
    FOREIGN KEY (id_turma) REFERENCES Turma(id_turma),
    FOREIGN KEY (id_disciplina) REFERENCES Disciplina(id_disciplina)
);








-- データの挿入
INSERT INTO Responsavel (nome_resp, cpf_resp, endereco_resp, telefone_resp, email_resp, senha_resp) VALUES
('John Doe', '12345678901', '123 Main St', '123-456-7890', 'john.doe@example.com', 'password123'),
('Jane Smith', '23456789012', '456 Oak Ave', '456-789-0123', 'jane.smith@example.com', 'pass123word'),
('Michael Johnson', '34567890123', '789 Elm St', '789-012-3456', 'michael.johnson@example.com', 'securepass'),
('Emily Davis', '45678901234', '101 Pine St', '987-654-3210', 'emily.davis@example.com', 'p@ssw0rd'),
('David Wilson', '56789012345', '202 Maple Ave', '876-543-2109', 'david.wilson@example.com', 'strongpassword');

INSERT INTO Professor (nome_prof, cpf_prof, telefone_prof, email_consti_prof, email_prof, nascimento_prof, endereco_prof, senha) VALUES
('John Smith', '12345678901', '123-456-7890', 'john.smith.const@example.com', 'john.smith@example.com', '1980-05-15', '123 Main St', 'password123'),
('Emily Johnson', '23456789012', '456-789-0123', 'emily.johnson.const@example.com', 'emily.johnson@example.com', '1975-10-20', '456 Oak Ave', 'pass123word'),
('Michael Davis', '34567890123', '789-012-3456', 'michael.davis.const@example.com', 'michael.davis@example.com', '1988-03-08', '789 Elm St', 'securepass'),
('Jane Wilson', '45678901234', '987-654-3210', 'jane.wilson.const@example.com', 'jane.wilson@example.com', '1992-12-18', '101 Pine St', 'p@ssw0rd'),
('David Brown', '56789012345', '876-543-2109', 'david.brown.const@example.com', 'david.brown@example.com', '1983-07-25', '202 Maple Ave', 'strongpassword');

INSERT INTO Turma (nome_turma, ano, semestre) VALUES
('Turma A', '2024', 1),
('Turma B', '2024', 1),
('Turma C', '2024', 2),
('Turma D', '2024', 2),
('Turma E', '2024', 1);

INSERT INTO Disciplina (disciplina, horario) VALUES
('Mathematics', 1),
('Science', 2),
('History', 3),
('Literature', 4),
('Computer Science', 5);

INSERT INTO Aluno (nome_aluno, cpf_aluno, endereco_aluno, telefone_aluno, email_aluno, nascimento_aluno, ra_aluno, data_matricula, foto, senha, id_turma) VALUES
('John Doe', '12345678901', '123 Main St', '123-456-7890', 'john.doe@example.com', '1998-05-15', 'A123456789', '2022-01-15', NULL, 'password123', 1),
('Jane Smith', '23456789012', '456 Oak Ave', '456-789-0123', 'jane.smith@example.com', '1999-03-20', 'B234567890', '2024-01-20', NULL, 'pass123word', 1),
('Michael Johnson', '34567890123', '789 Elm St', '789-012-3456', 'michael.johnson@example.com', '2000-07-08', 'C345678901', '2024-01-25', NULL, 'securepass', 2),
('Emily Davis', '45678901234', '101 Pine St', '987-654-3210', 'emily.davis@example.com', '2001-11-18', 'D456789012', '2024-01-30', NULL, 'p@ssw0rd', 2),
('David Wilson', '56789012345', '202 Maple Ave', '876-543-2109', 'david.wilson@example.com', '2002-09-25', 'E567890123', '2024-02-05', NULL, 'strongpassword', 3);

-- 仮のデータ
INSERT INTO Responsavel_Aluno (id_resp, id_aluno) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5);

-- 仮のデータ
INSERT INTO Evento (nome_evento, link_evento, data_evento) VALUES
('Conference', 'http://example.com/conference', '2024-05-10'),
('Workshop', 'http://example.com/workshop', '2024-06-15'),
('Seminar', 'http://example.com/seminar', '2024-07-20'),
('Training', 'http://example.com/training', '2024-08-25'),
('Symposium', 'http://example.com/symposium', '2024-09-30');

-- 仮のデータ
INSERT INTO Evento_aluno (id_evento, id_aluno) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5);

-- 仮のデータ
INSERT INTO Aluno_disciplina (id_aluno, id_disciplina) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5);

-- 仮のデータ
INSERT INTO Evento_professor (id_evento, id_prof) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5);

-- 仮のデータ
INSERT INTO Turma_Disciplina (id_turma, id_disciplina) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5);
INSERT INTO Turma_Disciplina (id_turma, id_disciplina) VALUES
(1, 2),
(1, 3),
(1, 4),
(1, 5),
(2, 3);

-- 仮のデータ
INSERT INTO Prof_Disciplina (id_prof, id_disciplina) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5);

-- 成績と欠席データを挿入するスクリプト
INSERT INTO Notas_faltas (id_disciplina, id_aluno, N1, AI, AP, faltas, academic_year, data_matricula, semestre) VALUES
 (1, 1, 8.5, 7.5, 9.0, 2, 2022, '2022-01-15', 1),
 (1, 2, 7.0, 6.5, 8.5, 2, 2022, '2022-02-05', 2),
 (1, 3, 7.0, 6.5, 8.5, 2, 2023, '2023-02-05', 1),
 (1, 4, 7.0, 6.5, 8.5, 2, 2023, '2023-02-05', 1),
 (1, 5, 7.0, 6.5, 8.5, 2, 2024, '2024-02-05', 1),
 (2, 1, 6.0, 7.5, 8.0, 1, 2024, '2024-01-15', 1),
 (2, 2, 7.0, 8.0, 6.5, 3, 2024, '2024-01-20', 1),
 (3, 2, 8.0, 9.0, 7.5, 2, 2024, '2024-01-20', 1),
 (3, 3, 9.0, 8.5, 7.0, 1, 2024, '2024-01-25', 1),
 (4, 4, 6.5, 7.0, 8.0, 4, 2024, '2024-01-30', 1),
 (5, 5, 8.0, 9.0, 8.5, 0, 2024, '2024-02-05', 1);

INSERT INTO Notas_faltas (id_disciplina, id_aluno, N1, AI, AP, faltas, academic_year, data_matricula, semestre) VALUES
 (1, 1, 11, 1, 12, 2, 2023, '2023-01-15', 2),
 (1, 2, 12, 1, 12, 2, 2023, '2023-02-05', 2),
 (1, 3, 13, 1, 13, 2, 2024, '2024-02-05', 1),
 (1, 5, 15, 1, 15, 0, 2024, '2024-02-05', 2);

