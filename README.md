### SmartClass
 
###dateBASE
-- Escolaテーブルを作成
CREATE TABLE Escola (
    id_escola INT AUTO_INCREMENT PRIMARY KEY,
    nome_escola VARCHAR(255),
    email_escola VARCHAR(255)
);


-- Professorテーブルを作成 all not null
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

-- Turmaテーブルを作成
CREATE TABLE Turma (
    id_turma INT AUTO_INCREMENT PRIMARY KEY,
    nome_turma VARCHAR(255) NOT NULL,
    periodo INT,
    id_prof INT,
    FOREIGN KEY (id_prof) REFERENCES Professor(id_prof)
);

-- Disciplinaテーブルを作成
CREATE TABLE Disciplina (
    id_disciplina INT AUTO_INCREMENT PRIMARY KEY,
    disciplina VARCHAR(255),
    id_prof INT,
    FOREIGN KEY (id_prof) REFERENCES Professor(id_prof)
);

-- Responsavelテーブルを作成
CREATE TABLE Responsavel (
    id_resp INT AUTO_INCREMENT PRIMARY KEY,
    nome_pesp VARCHAR(255),
    cpf_resp VARCHAR(255),
    endereco_pesp VARCHAR(255),
    telefone_pesp VARCHAR(20),
    email_pesp VARCHAR(255),
    id_escola INT,
    FOREIGN KEY (id_escola) REFERENCES escola(id_escola)
);

-- Alunoテーブルを作成
CREATE TABLE Aluno (
    id_aluno INT AUTO_INCREMENT PRIMARY KEY,
    nome_aluno  VARCHAR(255),
    cpf_aluno VARCHAR(255),
    endereco_aluno  VARCHAR(255),
    telefone_aluno  VARCHAR(255),
    email_aluno  VARCHAR(255),
    nascimento_aluno  date, 
    ra_aluno  VARCHAR(255), 
    date_matricula date
);

-- AlunoとResponsavelの多対多の関係を持つための関連テーブル
CREATE TABLE Aluno_Resp (
    id_aluno INT,
    id_resp INT,
    FOREIGN KEY (id_aluno) REFERENCES Aluno(id_aluno),
    FOREIGN KEY (id_resp) REFERENCES Responsavel(id_resp),
    PRIMARY KEY (id_aluno, id_resp)
);

-- AlunoとDisciplinaの多対多の関係を持つための関連テーブル + 成績等の管理
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
    periodo_letivo  VARCHAR(255)
);

-- Turma_Alunoの多対多の関係を持つための関連テーブル
CREATE TABLE Turma_Aluno (
    id_aluno INT,
    id_turma INT,
    FOREIGN KEY (id_aluno) REFERENCES aluno(id_aluno),
    FOREIGN KEY (id_turma) REFERENCES turma(id_turma),
    PRIMARY KEY (id_aluno, id_turma)
);

-- Eventoテーブルを作成
CREATE TABLE Evento (
    id_evento INT AUTO_INCREMENT PRIMARY KEY,
    nome_evento  VARCHAR(255),
    link_evento VARCHAR(255),
    date_evento date
);

-- Evento_Alunoの多対多の関係を持つための関連テーブル
CREATE TABLE evento_aluno (
    id_aluno INT,
    id_evento INT,
    FOREIGN KEY (id_aluno) REFERENCES aluno(id_aluno),
    FOREIGN KEY (id_evento) REFERENCES event(id_evento),
    PRIMARY KEY (id_aluno, id_evento)
);

-- Turma_Alunoの多対多の関係を持つための関連テーブル
CREATE TABLE Turma_Aluno (
    id_aluno INT,
    id_turma INT,
    FOREIGN KEY (id_aluno) REFERENCES aluno(id_aluno),
    FOREIGN KEY (id_turma) REFERENCES turma(id_turma),
    PRIMARY KEY (id_aluno, id_turma)
);

-- Evento_Professorの多対多の関係を持つための関連テーブル
CREATE TABLE evento_professor (
    id_professor INT,
    id_evento INT,
    FOREIGN KEY (id_professor) REFERENCES professor(id_professor),
    FOREIGN KEY (id_evento) REFERENCES event(id_evento),
    PRIMARY KEY (id_professor, id_evento)
);

-- turma_disciplinaの多対多の関係を持つための関連テーブル
CREATE TABLE turma_disciplina (
    id_turma INT,
    id_disciplina INT,
    FOREIGN KEY (id_turma) REFERENCES turma(id_turma),
    FOREIGN KEY (id_disciplina) REFERENCES disciplina(id_disciplina),
    PRIMARY KEY (id_turma, id_disciplina)
);