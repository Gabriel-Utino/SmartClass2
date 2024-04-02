### SmartClass

###dateBASE
-- Escola テーブルを作成
CREATE TABLE Escola (
    id_escola INT AUTO_INCREMENT PRIMARY KEY,
    nome_escola VARCHAR(255) NOT NULL,
    email_escola VARCHAR(255) NOT NULL UNIQUE
);


-- Professor テーブルを作成
CREATE TABLE Professor (
    id_prof INT AUTO_INCREMENT PRIMARY KEY,
    nome_prof VARCHAR(255) NOT NULL,
    cpf_prof VARCHAR(11) NOT NULL UNIQUE,
    telefone_prof VARCHAR(255) NOT NULL UNIQUE,
    email_consti_prof VARCHAR(255) NOT NULL UNIQUE,
    email_pess_prof VARCHAR(255) NOT NULL UNIQUE,
    nascimento_prof DATE NOT NULL,
    endereco_prof VARCHAR(255) NOT NULL,
    id_disciplina INT NOT NULL,
    id_escola INT NOT NULL,
    CONSTRAINT nome_prof_formato_check CHECK (nome_prof REGEXP '^[A-Za-z ]+$'),
    CONSTRAINT cpf_prof_formato_check CHECK (cpf_prof REGEXP '^[0-9]+$'),
    CONSTRAINT telefone_prof_formato_check CHECK (telefone_prof REGEXP '^[0-9]+$'),
    CONSTRAINT email_consti_prof_formato_check CHECK (email_consti_prof REGEXP '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'),
    CONSTRAINT email_pess_prof_formato_check CHECK (email_pess_prof REGEXP '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')
);


-- Turma テーブルを作成
CREATE TABLE Turma (
    id_turma INT AUTO_INCREMENT PRIMARY KEY,
    nome_turma VARCHAR(255) NOT NULL,
    Ano DATE NOT NULL,
    id_prof INT NOT NULL,
    FOREIGN KEY (id_prof) REFERENCES Professor(id_prof)
);

-- Disciplina テーブルを作成
CREATE TABLE Disciplina (
    id_disciplina INT AUTO_INCREMENT PRIMARY KEY,
    disciplina VARCHAR(255) NOT NULL,
    id_prof INT NOT NULL,
    FOREIGN KEY (id_prof) REFERENCES Professor(id_prof)
);


-- Responsavel テーブルを作成
CREATE TABLE Responsavel (
    id_resp INT AUTO_INCREMENT PRIMARY KEY,
    nome_pesp VARCHAR(255) NOT NULL,
    cpf_resp VARCHAR(255) NOT NULL UNIQUE,
    endereco_pesp VARCHAR(255) NOT NULL,
    telefone_pesp VARCHAR(20) NOT NULL UNIQUE,
    email_pesp VARCHAR(255) NOT NULL UNIQUE,
    id_escola INT NOT NULL,
    FOREIGN KEY (id_escola) REFERENCES Escola(id_escola),
    CONSTRAINT nome_pesp_formato_check CHECK (nome_pesp REGEXP '^[A-Za-z ]+$'),
    CONSTRAINT cpf_resp_formato_check CHECK (cpf_resp REGEXP '^[0-9]+$'),
    CONSTRAINT telefone_pesp_formato_check CHECK (telefone_pesp REGEXP '^[0-9]+$'),
    CONSTRAINT email_pesp_formato_check CHECK (email_pesp REGEXP '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')
);


-- Aluno テーブルを作成
CREATE TABLE Aluno (
    id_aluno INT AUTO_INCREMENT PRIMARY KEY,
    nome_aluno VARCHAR(255) NOT NULL,
    cpf_aluno VARCHAR(255) NOT NULL UNIQUE,
    endereco_aluno VARCHAR(255) NOT NULL,
    telefone_aluno VARCHAR(255) NOT NULL UNIQUE,
    email_aluno VARCHAR(255) NOT NULL UNIQUE,
    nascimento_aluno DATE NOT NULL,
    ra_aluno VARCHAR(255) NOT NULL UNIQUE,
    date_matricula DATE NOT NULL,
    CONSTRAINT nome_formato_check CHECK (nome_aluno REGEXP '^[A-Za-z ]+$'),
    CONSTRAINT cpf_formato_check CHECK (cpf_aluno REGEXP '^[0-9]+$'),
    CONSTRAINT telefone_formato_check CHECK (telefone_aluno REGEXP '^[0-9]+$'),
    CONSTRAINT email_formato_check CHECK (email_aluno REGEXP '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'),
    CONSTRAINT ra_formato_check CHECK (ra_aluno REGEXP '^[0-9]+$')
);


-- Aluno と Responsavel の多対多の関係を持つための関連テーブル
CREATE TABLE Aluno_Resp (
id_aluno INT,
id_resp INT,
FOREIGN KEY (id_aluno) REFERENCES Aluno(id_aluno),
FOREIGN KEY (id_resp) REFERENCES Responsavel(id_resp),
PRIMARY KEY (id_aluno, id_resp)
);

-- Aluno と Disciplina の多対多の関係を持つための関連テーブル + 成績等の管理
CREATE TABLE Notas (
id_notas INT AUTO_INCREMENT PRIMARY KEY,
id_aluno INT,
id_disciplina INT,
FOREIGN KEY (id_aluno) REFERENCES aluno(id_aluno),
FOREIGN KEY (id_disciplina) REFERENCES Disciplina(id_disciplina),
n1 REAL,
AI REAL,
AP REAL,
faltas INT,
periodo_letivo VARCHAR(255)
);

-- Turma_Aluno の多対多の関係を持つための関連テーブル
CREATE TABLE Turma_Aluno (
id_aluno INT,
id_turma INT,
FOREIGN KEY (id_aluno) REFERENCES Aluno(id_aluno),
FOREIGN KEY (id_turma) REFERENCES Turma(id_turma),
PRIMARY KEY (id_aluno, id_turma)
);

-- Evento テーブルを作成
CREATE TABLE Evento (
    id_evento INT AUTO_INCREMENT PRIMARY KEY,
    nome_evento VARCHAR(255) NOT NULL,
    link_evento VARCHAR(255) NOT NULL,
    date_evento DATE NOT NULL
);


-- Evento_Aluno の多対多の関係を持つための関連テーブル
CREATE TABLE evento_aluno (
id_aluno INT,
id_evento INT,
FOREIGN KEY (id_aluno) REFERENCES Aluno(id_aluno),
FOREIGN KEY (id_evento) REFERENCES Evento(id_evento),
PRIMARY KEY (id_aluno, id_evento)
);

-- Aluno と Disciplina の多対多の関係を持つための関連テーブル + 成績等の管理
CREATE TABLE Disciplina_Aluno (
id_aluno INT,
id_disciplina INT,
FOREIGN KEY (id_aluno) REFERENCES aluno(id_aluno),
FOREIGN KEY (id_disciplina) REFERENCES Disciplina(id_disciplina),
PRIMARY KEY (id_aluno, id_disciplina)
);

-- Evento_Professor の多対多の関係を持つための関連テーブル
CREATE TABLE evento_professor (
id_prof INT,
id_evento INT,
FOREIGN KEY (id_prof) REFERENCES professor(id_prof),
FOREIGN KEY (id_evento) REFERENCES evento(id_evento),
PRIMARY KEY (id_prof, id_evento)
);

-- turma_disciplina の多対多の関係を持つための関連テーブル
CREATE TABLE turma_disciplina (
id_turma INT,
id_disciplina INT,
FOREIGN KEY (id_turma) REFERENCES turma(id_turma),
FOREIGN KEY (id_disciplina) REFERENCES disciplina(id_disciplina),
PRIMARY KEY (id_turma, id_disciplina)
);

##テスト用の中身
-- Escola テーブルの中身を挿入
INSERT INTO Escola (nome_escola, email_escola) VALUES
('Escola 1', 'school1@example.com'),
('Escola 2', 'school2@example.com'),
('Escola 3', 'school3@example.com'),
('Escola 4', 'school4@example.com'),
('Escola 5', 'school5@example.com');

-- Professor テーブルの中身を挿入
INSERT INTO Professor (nome_prof, cpf_prof, telefone_prof, email_consti_prof, email_pess_prof, nascimento_prof, endereco_prof, id_disciplina, id_escola) VALUES
('Professor1', '12345678901', '123-456-7890', 'consti_prof1@example.com', 'pess_prof1@example.com', '1980-01-01', 'endereço 1', 1, 1),
('Professor2', '23456789012', '234-567-8901', 'consti_prof2@example.com', 'pess_prof2@example.com', '1975-02-02', 'endereço 2', 2, 2),
('Professor3', '34567890123', '345-678-9012', 'consti_prof3@example.com', 'pess_prof3@example.com', '1988-03-03', 'endereço 3', 3, 3),
('Professor4', '45678901234', '456-789-0123', 'consti_prof4@example.com', 'pess_prof4@example.com', '1990-04-04', 'endereço 4', 4, 4),
('Professor5', '56789012345', '567-890-1234', 'consti_prof5@example.com', 'pess_prof5@example.com', '1982-05-05', 'endereço 5', 5, 5);

-- Turma テーブルの中身を挿入
INSERT INTO Turma (nome_turma, periodo, id_prof) VALUES
('Turma1', 1, 1),
('Turma2', 2, 2),
('Turma3', 3, 3),
('Turma4', 4, 4),
('Turma5', 5, 5);

-- Disciplina テーブルの中身を挿入
INSERT INTO Disciplina (disciplina, id_prof) VALUES
('Disciplina1', 1),
('Disciplina2', 2),
('Disciplina3', 3),
('Disciplina4', 4),
('Disciplina5', 5);

-- Responsavel テーブルの中身を挿入
INSERT INTO Responsavel (nome_pesp, cpf_resp, endereco_pesp, telefone_pesp, email_pesp, id_escola) VALUES
('Responsavel', '12345678901', 'Endereço do Responsavel 1', '111-222-3333', 'resp1@example.com', 1),
('Responsave2', '23456789012', 'Endereço do Responsavel 2', '222-333-4444', 'resp2@example.com', 2),
('Responsave3', '34567890123', 'Endereço do Responsavel 3', '333-444-5555', 'resp3@example.com', 3),
('Responsave4', '45678901234', 'Endereço do Responsavel 4', '444-555-6666', 'resp4@example.com', 4),
('Responsave5', '56789012345', 'Endereço do Responsavel 5', '555-666-7777', 'resp5@example.com', 5);

-- Aluno テーブルの中身を挿入
INSERT INTO Aluno (nome_aluno, cpf_aluno, endereco_aluno, telefone_aluno, email_aluno, nascimento_aluno, ra_aluno, date_matricula) VALUES
('Aluno1', '12345678901', 'Endereço do aluno 1', '999-888-7777', 'aluno1@example.com', '2005-01-01', 'RA1', '2022-01-01'),
('Aluno2', '23456789012', 'Endereço do aluno 2', '888-777-6666', 'aluno2@example.com', '2006-02-02', 'RA2', '2022-01-02'),
('Aluno3', '34567890123', 'Endereço do aluno 3', '777-666-5555', 'aluno3@example.com', '2007-03-03', 'RA3', '2022-01-03'),
('Aluno4', '45678901234', 'Endereço do aluno 4', '666-555-4444', 'aluno4@example.com', '2008-04-04', 'RA4', '2022-01-04'),
('Aluno5', '56789012345', 'Endereço do aluno 5', '555-444-3333', 'aluno5@example.com', '2009-05-05', 'RA5', '2022-01-05');

-- Aluno_Resp テーブルの中身を挿入
INSERT INTO Aluno_Resp (id_aluno, id_resp) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5);

-- Notas テーブルの中身を挿入
INSERT INTO Notas (id_aluno, id_disciplina, n1, AI, AP, faltas, periodo_letivo) VALUES
(1, 1, 85, 75, 90, 5, '第 1 期'),
(2, 2, 80, 70, 85, 3, '第 1 期'),
(3, 3, 75, 80, 88, 2, '第 1 期'),
(4, 4, 90, 85, 95, 0, '第 1 期'),
(5, 5, 88, 90, 92, 1, '第 1 期');

-- Turma_Aluno テーブルの中身を挿入 (続き)
INSERT INTO Turma_Aluno (id_aluno, id_turma) VALUES
(5, 5),
(1, 2),
(2, 3),
(3, 4),
(4, 5);

-- Evento テーブルの中身を挿入
INSERT INTO Evento (nome_evento, link_evento, date_evento) VALUES
('イベント 1', 'http://evento1.com', '2024-04-01'),
('イベント 2', 'http://evento2.com', '2024-04-05'),
('イベント 3', 'http://evento3.com', '2024-04-10'),
('イベント 4', 'http://evento4.com', '2024-04-15'),
('イベント 5', 'http://evento5.com', '2024-04-20');

-- Evento_Aluno テーブルの中身を挿入
INSERT INTO evento_aluno (id_aluno, id_evento) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5);

-- Disciplina_Aluno テーブルの中身を挿入
INSERT INTO Disciplina_Aluno (id_aluno, id_disciplina) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5);

-- Evento_Professor テーブルの中身を挿入
INSERT INTO evento_professor (id_prof, id_evento) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5);

-- turma_disciplina テーブルの中身を挿入
INSERT INTO turma_disciplina (id_turma, id_disciplina) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5);
