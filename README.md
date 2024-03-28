### SmartClass

###dateBASE
-- Escola テーブルを作成
CREATE TABLE Escola (
id_escola INT AUTO_INCREMENT PRIMARY KEY,
nome_escola VARCHAR(255),
email_escola VARCHAR(255)
);

-- Professor テーブルを作成
CREATE TABLE Professor (
id_prof INT AUTO_INCREMENT PRIMARY KEY,
nome_prof VARCHAR(255) NOT NULL,
cpf_prof VARCHAR(11) NOT NULL,
telefone_prof VARCHAR(255) NOT NULL,
email_consti_prof VARCHAR(255) NOT NULL,
email_pess_prof VARCHAR(255),
nascimento_prof VARCHAR(255),
endereco_prof VARCHAR(255),
id_disciplina INT,
id_escola INT,
UNIQUE(cpf_prof),
UNIQUE(telefone_prof)
);

-- Turma テーブルを作成
CREATE TABLE Turma (
id_turma INT AUTO_INCREMENT PRIMARY KEY,
nome_turma VARCHAR(255) NOT NULL,
periodo INT,
id_prof INT,
FOREIGN KEY (id_prof) REFERENCES Professor(id_prof)
);

-- Disciplina テーブルを作成
CREATE TABLE Disciplina (
id_disciplina INT AUTO_INCREMENT PRIMARY KEY,
disciplina VARCHAR(255),
id_prof INT,
FOREIGN KEY (id_prof) REFERENCES Professor(id_prof)
);

-- Responsavel テーブルを作成
CREATE TABLE Responsavel (
id_resp INT AUTO_INCREMENT PRIMARY KEY,
nome_pesp VARCHAR(255),
cpf_resp VARCHAR(255),
endereco_pesp VARCHAR(255),
telefone_pesp VARCHAR(20),
email_pesp VARCHAR(255),
id_escola INT,
FOREIGN KEY (id_escola) REFERENCES Escola(id_escola)
);

-- Aluno テーブルを作成
CREATE TABLE Aluno (
id_aluno INT AUTO_INCREMENT PRIMARY KEY,
nome_aluno VARCHAR(255),
cpf_aluno VARCHAR(255),
endereco_aluno VARCHAR(255),
telefone_aluno VARCHAR(255),
email_aluno VARCHAR(255),
nascimento_aluno date,
ra_aluno VARCHAR(255),
date_matricula date
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
nome_evento VARCHAR(255),
link_evento VARCHAR(255),
date_evento date
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
('学校1', 'school1@example.com'),
('学校2', 'school2@example.com'),
('学校3', 'school3@example.com'),
('学校4', 'school4@example.com'),
('学校5', 'school5@example.com');

-- Professor テーブルの中身を挿入
INSERT INTO Professor (nome_prof, cpf_prof, telefone_prof, email_consti_prof, email_pess_prof, nascimento_prof, endereco_prof, id_disciplina, id_escola) VALUES
('教授1', '12345678901', '123-456-7890', 'consti_prof1@example.com', 'pess_prof1@example.com', '1980-01-01', '住所1', 1, 1),
('教授2', '23456789012', '234-567-8901', 'consti_prof2@example.com', 'pess_prof2@example.com', '1975-02-02', '住所2', 2, 2),
('教授3', '34567890123', '345-678-9012', 'consti_prof3@example.com', 'pess_prof3@example.com', '1988-03-03', '住所3', 3, 3),
('教授4', '45678901234', '456-789-0123', 'consti_prof4@example.com', 'pess_prof4@example.com', '1990-04-04', '住所4', 4, 4),
('教授5', '56789012345', '567-890-1234', 'consti_prof5@example.com', 'pess_prof5@example.com', '1982-05-05', '住所5', 5, 5);

-- Turma テーブルの中身を挿入
INSERT INTO Turma (nome_turma, periodo, id_prof) VALUES
('クラス1', 1, 1),
('クラス2', 2, 2),
('クラス3', 3, 3),
('クラス4', 4, 4),
('クラス5', 5, 5);

-- Disciplina テーブルの中身を挿入
INSERT INTO Disciplina (disciplina, id_prof) VALUES
('科目1', 1),
('科目2', 2),
('科目3', 3),
('科目4', 4),
('科目5', 5);

-- Responsavel テーブルの中身を挿入
INSERT INTO Responsavel (nome_pesp, cpf_resp, endereco_pesp, telefone_pesp, email_pesp, id_escola) VALUES
('保護者1', '12345678901', '保護者住所1', '111-222-3333', 'resp1@example.com', 1),
('保護者2', '23456789012', '保護者住所2', '222-333-4444', 'resp2@example.com', 2),
('保護者3', '34567890123', '保護者住所3', '333-444-5555', 'resp3@example.com', 3),
('保護者4', '45678901234', '保護者住所4', '444-555-6666', 'resp4@example.com', 4),
('保護者5', '56789012345', '保護者住所5', '555-666-7777', 'resp5@example.com', 5);

-- Aluno テーブルの中身を挿入
INSERT INTO Aluno (nome_aluno, cpf_aluno, endereco_aluno, telefone_aluno, email_aluno, nascimento_aluno, ra_aluno, date_matricula) VALUES
('生徒1', '12345678901', '生徒住所1', '999-888-7777', 'aluno1@example.com', '2005-01-01', 'RA1', '2022-01-01'),
('生徒2', '23456789012', '生徒住所2', '888-777-6666', 'aluno2@example.com', '2006-02-02', 'RA2', '2022-01-02'),
('生徒3', '34567890123', '生徒住所3', '777-666-5555', 'aluno3@example.com', '2007-03-03', 'RA3', '2022-01-03'),
('生徒4', '45678901234', '生徒住所4', '666-555-4444', 'aluno4@example.com', '2008-04-04', 'RA4', '2022-01-04'),
('生徒5', '56789012345', '生徒住所5', '555-444-3333', 'aluno5@example.com', '2009-05-05', 'RA5', '2022-01-05');

-- Aluno_Resp テーブルの中身を挿入
INSERT INTO Aluno_Resp (id_aluno, id_resp) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5);

-- Notas テーブルの中身を挿入
INSERT INTO Notas (id_aluno, id_disciplina, n1, AI, AP, faltas, periodo_letivo) VALUES
(1, 1, 85, 75, 90, 5, '第1期'),
(2, 2, 80, 70, 85, 3, '第1期'),
(3, 3, 75, 80, 88, 2, '第1期'),
(4, 4, 90, 85, 95, 0, '第1期'),
(5, 5, 88, 90, 92, 1, '第1期');

-- Turma_Aluno テーブルの中身を挿入 (続き)
INSERT INTO Turma_Aluno (id_aluno, id_turma) VALUES
(5, 5),
(1, 2),
(2, 3),
(3, 4),
(4, 5);

-- Evento テーブルの中身を挿入
INSERT INTO Evento (nome_evento, link_evento, date_evento) VALUES
('イベント1', 'http://evento1.com', '2024-04-01'),
('イベント2', 'http://evento2.com', '2024-04-05'),
('イベント3', 'http://evento3.com', '2024-04-10'),
('イベント4', 'http://evento4.com', '2024-04-15'),
('イベント5', 'http://evento5.com', '2024-04-20');

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
