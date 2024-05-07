const express = require('express')
const cors = require('cors')
const mysql = require('mysql')
//
const app = express()
const port = 3000
app.use(express.json())
app.use(cors())
// MySQL接続設定
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'smartclass'
})
connection.connect(err => {
  if (err) {
    console.error('MySQL connection failed: ' + err.stack)
    return
  }
  console.log('Connected to MySQL database')
})

// 商品の配列をMySQLから読み込む
let alunos = []
let disciplinaAlunos = []
let disciplinas = []
let eventos = []
let eventoProfessors = []
let eventoAlunos =[]
let notas = []
let professores = []
let profDisciplinas = []
let responsaveis = []
let alunoResps = []
let turmas = []
let turmaDisciplinas = []



// Professorのサーバー管理に関わる部分
// Professorテーブルのデータ取得
connection.query('SELECT * FROM Professor;', (err, results) => {
  if (err) {
    console.error('Professorテーブルでエラー発生: ' + err)
  } else {
    professores = results
  }
})
// リスト化
app.get('/professores', (req, res) => {
  res.json(professores)
})
// 取得
app.get('/professores/:id_prof', (req, res) => {
  const professorID = parseInt(req.params.id_prof)
  const professor = professores.find(professor => professor.id_prof === professorID)
  if (professor) {
    res.json(professor)
  } else {
    res.status(404).json({ message: '見つかりません' })
  }
})
// 追加
app.post('/professores', (req, res) => {
  const newProfessor = req.body
  connection.query(
    'INSERT INTO Professor (nome_prof, cpf_prof, telefone_prof, email_consti_prof, email_prof, nascimento_prof, endereco_prof, senha) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [
      newProfessor.nome_prof,
      newProfessor.cpf_prof,
      newProfessor.telefone_prof,
      newProfessor.email_consti_prof,
      newProfessor.email_prof,
      newProfessor.nascimento_prof,
      newProfessor.endereco_prof,
      newProfessor.senha
    ],
    (err, result) => {
      if (err) {
        console.error('Error adding data to MySQL: ' + err)
        res.status(500).json({ message: 'Professorを追加できませんでした' })
      } else {
        newProfessor.id_prof = result.insertId
        professores.push(newProfessor)
        res.status(201).json(newProfessor)
      }
    }
  )
})
// 更新
app.put('/professores/:id_prof', (req, res) => {
  const id_prof = parseInt(req.params.id_prof)
  const updatedProfessor = req.body
  const index = professores.findIndex(professor => professor.id_prof === id_prof)
  if (index !== -1) {
    connection.query(
      'UPDATE Professor SET nome_prof=?, cpf_prof=?, telefone_prof=?, email_consti_prof=?, email_prof=?, nascimento_prof=?, endereco_prof=?, senha=? WHERE id_prof=?',
      [
        updatedProfessor.nome_prof,
        updatedProfessor.cpf_prof,
        updatedProfessor.telefone_prof,
        updatedProfessor.email_consti_prof,
        updatedProfessor.email_prof,
        updatedProfessor.nascimento_prof,
        updatedProfessor.endereco_prof,
        updatedProfessor.senha,
        id_prof
      ],
      err => {
        if (err) {
          console.error('Error updating data in MySQL: ' + err)
          res.status(500).json({ message: 'Professorを更新できませんでした' })
        } else {
          professores[index] = { ...professores[index], ...updatedProfessor }
          res.json(professores[index])
        }
      }
    )
  } else {
    res.status(404).json({ message: 'Professorが見つかりません' })
  }
})
// 削除
app.delete('/professores/:id_prof', (req, res) => {
  const id_prof = parseInt(req.params.id_prof)
  const index = professores.findIndex(professor => professor.id_prof === id_prof)
  if (index !== -1) {
    connection.query('DELETE FROM Professor WHERE id_prof=?', [id_prof], err => {
      if (err) {
        console.error('Professorテーブル - MySQLからのデータ削除エラー: ' + err)
        res.status(500).json({ message: '削除できませんでした' })
      } else {
        const removedProfessor = professores.splice(index, 1)
        res.json(removedProfessor[0])
      }
    })
  } else {
    res.status(404).json({ message: '見つかりませんでした' })
  }
})

// Turmaのサーバー管理に関わる部分
// Turmaテーブルのデータ取得
connection.query('SELECT * FROM Turma;', (err, results) => {
  if (err) {
    console.error('Turmaテーブルでエラー発生: ' + err)
  } else {
    turmas = results
  }
})
// リスト化
app.get('/turmas', (req, res) => {
  res.json(turmas)
})
// 取得
app.get('/turmas/:id_turma', (req, res) => {
  const turmaID = parseInt(req.params.id_turma)
  const turma = turmas.find(turma => turma.id_turma === turmaID)
  if (turma) {
    res.json(turma)
  } else {
    res.status(404).json({ message: '見つかりません' })
  }
})
// 追加
app.post('/turmas', (req, res) => {
  const newTurma = req.body
  connection.query(
    'INSERT INTO Turma (nome_turma, Ano, periodo) VALUES (?, ?, ?)',
    [newTurma.nome_turma, newTurma.Ano, newTurma.periodo],
    (err, result) => {
      if (err) {
        console.error('Error adding data to MySQL: ' + err)
        res.status(500).json({ message: 'Turmaを追加できませんでした' })
      } else {
        newTurma.id_turma = result.insertId
        turmas.push(newTurma)
        res.status(201).json(newTurma)
      }
    }
  )
})
// 更新
app.put('/turmas/:id_turma', (req, res) => {
  const id_turma = parseInt(req.params.id_turma)
  const updatedTurma = req.body
  const index = turmas.findIndex(turma => turma.id_turma === id_turma)
  if (index !== -1) {
    connection.query(
      'UPDATE Turma SET nome_turma=?, Ano=?, periodo=? WHERE id_turma=?',
      [updatedTurma.nome_turma, updatedTurma.Ano, updatedTurma.periodo, id_turma],
      err => {
        if (err) {
          console.error('Error updating data in MySQL: ' + err)
          res.status(500).json({ message: 'Turmaを更新できませんでした' })
        } else {
          turmas[index] = { ...turmas[index], ...updatedTurma }
          res.json(turmas[index])
        }
      }
    )
  } else {
    res.status(404).json({ message: 'Turmaが見つかりません' })
  }
})
// 削除
app.delete('/turmas/:id_turma', (req, res) => {
  const id_turma = parseInt(req.params.id_turma)
  const index = turmas.findIndex(turma => turma.id_turma === id_turma)
  if (index !== -1) {
    connection.query('DELETE FROM Turma WHERE id_turma=?', [id_turma], err => {
      if (err) {
        console.error('Turmaテーブル - MySQLからのデータ削除エラー: ' + err)
        res.status(500).json({ message: '削除できませんでした' })
      } else {
        const removedTurma = turmas.splice(index, 1)
        res.json(removedTurma[0])
      }
    })
  } else {
    res.status(404).json({ message: '見つかりませんでした' })
  }
})

// Disciplinaのサーバー管理に関わる部分
// Disciplinaテーブルのデータ取得
connection.query('SELECT * FROM Disciplina;', (err, results) => {
  if (err) {
    console.error('Disciplinaテーブルでエラー発生: ' + err)
  } else {
    disciplinas = results
  }
})
// リスト化
app.get('/disciplinas', (req, res) => {
  res.json(disciplinas)
})
// 取得
app.get('/disciplinas/:id_disciplina', (req, res) => {
  const disciplinaID = parseInt(req.params.id_disciplina)
  const disciplina = disciplinas.find(disciplina => disciplina.id_disciplina === disciplinaID)
  if (disciplina) {
    res.json(disciplina)
  } else {
    res.status(404).json({ message: '見つかりません' })
  }
})
// 追加
app.post('/disciplinas', (req, res) => {
  const newDisciplina = req.body
  connection.query(
    'INSERT INTO Disciplina (disciplina, horario) VALUES (?, ?)',
    [newDisciplina.disciplina, newDisciplina.horario],
    (err, result) => {
      if (err) {
        console.error('Error adding data to MySQL: ' + err)
        res.status(500).json({ message: 'Disciplinaを追加できませんでした' })
      } else {
        newDisciplina.id_disciplina = result.insertId
        disciplinas.push(newDisciplina)
        res.status(201).json(newDisciplina)
      }
    }
  )
})
// 更新
app.put('/disciplinas/:id_disciplina', (req, res) => {
  const id_disciplina = parseInt(req.params.id_disciplina)
  const updatedDisciplina = req.body
  const index = disciplinas.findIndex(disciplina => disciplina.id_disciplina === id_disciplina)
  if (index !== -1) {
    connection.query(
      'UPDATE Disciplina SET disciplina=?, horario=? WHERE id_disciplina=?',
      [updatedDisciplina.disciplina, updatedDisciplina.horario, id_disciplina],
      err => {
        if (err) {
          console.error('Error updating data in MySQL: ' + err)
          res.status(500).json({ message: 'Disciplinaを更新できませんでした' })
        } else {
          disciplinas[index] = { ...disciplinas[index], ...updatedDisciplina }
          res.json(disciplinas[index])
        }
      }
    )
  } else {
    res.status(404).json({ message: 'Disciplinaが見つかりません' })
  }
})
// 削除
app.delete('/disciplinas/:id_disciplina', (req, res) => {
  const id_disciplina = parseInt(req.params.id_disciplina)
  const index = disciplinas.findIndex(disciplina => disciplina.id_disciplina === id_disciplina)
  if (index !== -1) {
    connection.query('DELETE FROM Disciplina WHERE id_disciplina=?', [id_disciplina], err => {
      if (err) {
        console.error('Disciplinaテーブル - MySQLからのデータ削除エラー: ' + err)
        res.status(500).json({ message: '削除できませんでした' })
      } else {
        const removedDisciplina = disciplinas.splice(index, 1)
        res.json(removedDisciplina[0])
      }
    })
  } else {
    res.status(404).json({ message: '見つかりませんでした' })
  }
})

// Responsavelのサーバー管理に関わる部分
// Responsavelテーブルのデータ取得
connection.query('SELECT * FROM Responsavel;', (err, results) => {
  if (err) {
    console.error('Responsavelテーブルでエラー発生: ' + err)
  } else {
    responsaveis = results
  }
})
// リスト化
app.get('/responsaveis', (req, res) => {
  res.json(responsaveis)
})
// 取得
app.get('/responsaveis/:id_resp', (req, res) => {
  const responsavelID = parseInt(req.params.id_resp)
  const responsavel = responsaveis.find(responsavel => responsavel.id_resp === responsavelID)
  if (responsavel) {
    res.json(responsavel)
  } else {
    res.status(404).json({ message: '見つかりません' })
  }
})
// 追加
app.post('/responsaveis', (req, res) => {
  const newResponsavel = req.body
  connection.query(
    'INSERT INTO Responsavel (nome_resp, cpf_resp, endereco_resp, telefone_resp, email_resp, senha_resp) VALUES (?, ?, ?, ?, ?, ?)',
    [
      newResponsavel.nome_resp,
      newResponsavel.cpf_resp,
      newResponsavel.endereco_resp,
      newResponsavel.telefone_resp,
      newResponsavel.email_resp,
      newResponsavel.senha_resp
    ],
    (err, result) => {
      if (err) {
        console.error('Error adding data to MySQL: ' + err)
        res.status(500).json({ message: 'Responsavelを追加できませんでした' })
      } else {
        newResponsavel.id_resp = result.insertId
        responsaveis.push(newResponsavel)
        res.status(201).json(newResponsavel)
      }
    }
  )
})
// 更新
app.put('/responsaveis/:id_resp', (req, res) => {
  const id_resp = parseInt(req.params.id_resp)
  const updatedResponsavel = req.body
  const index = responsaveis.findIndex(responsavel => responsavel.id_resp === id_resp)
  if (index !== -1) {
    connection.query(
      'UPDATE Responsavel SET nome_resp=?, cpf_resp=?, endereco_resp=?, telefone_resp=?, email_resp=?, senha_resp=? WHERE id_resp=?',
      [
        updatedResponsavel.nome_resp,
        updatedResponsavel.cpf_resp,
        updatedResponsavel.endereco_resp,
        updatedResponsavel.telefone_resp,
        updatedResponsavel.email_resp,
        updatedResponsavel.senha_resp,
        id_resp
      ],
      err => {
        if (err) {
          console.error('Error updating data in MySQL: ' + err)
          res.status(500).json({ message: 'Responsavelを更新できませんでした' })
        } else {
          responsaveis[index] = { ...responsaveis[index], ...updatedResponsavel }
          res.json(responsaveis[index])
        }
      }
    )
  } else {
    res.status(404).json({ message: 'Responsavelが見つかりません' })
  }
})
// 削除
app.delete('/responsaveis/:id_resp', (req, res) => {
  const id_resp = parseInt(req.params.id_resp)
  const index = responsaveis.findIndex(responsavel => responsavel.id_resp === id_resp)
  if (index !== -1) {
    connection.query('DELETE FROM Responsavel WHERE id_resp=?', [id_resp], err => {
      if (err) {
        console.error('Responsavelテーブル - MySQLからのデータ削除エラー: ' + err)
        res.status(500).json({ message: '削除できませんでした' })
      } else {
        const removedResponsavel = responsaveis.splice(index, 1)
        res.json(removedResponsavel[0])
      }
    })
  } else {
    res.status(404).json({ message: '見つかりませんでした' })
  }
})

// Alunoのサーバー管理に関わる部分
// Alunoテーブルのデータ取得
connection.query('SELECT * FROM Aluno;', (err, results) => {
  if (err) {
    console.error('Alunoテーブルでエラー発生: ' + err)
  } else {
    alunos = results
  }
})
// リスト化
app.get('/alunos', (req, res) => {
  res.json(alunos)
})
// 取得
app.get('/alunos/:id_aluno', (req, res) => {
  const alunoID = parseInt(req.params.id_aluno)
  const aluno = alunos.find(aluno => aluno.id_aluno === alunoID)
  if (aluno) {
    res.json(aluno)
  } else {
    res.status(404).json({ message: '見つかりません' })
  }
})
// 追加
app.post('/alunos', (req, res) => {
  const newAluno = req.body
  connection.query(
    'INSERT INTO Aluno (nome_aluno, cpf_aluno, endereco_aluno, telefone_aluno, email_aluno, nascimento_aluno, ra_aluno, data_matricula, foto, senha, id_turma) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [
      newAluno.nome_aluno,
      newAluno.cpf_aluno,
      newAluno.endereco_aluno,
      newAluno.telefone_aluno,
      newAluno.email_aluno,
      newAluno.nascimento_aluno,
      newAluno.ra_aluno,
      newAluno.data_matricula,
      newAluno.foto,
      newAluno.senha,
      newAluno.id_turma
    ],
    (err, result) => {
      if (err) {
        console.error('Error adding data to MySQL: ' + err)
        res.status(500).json({ message: 'Alunoを追加できませんでした' })
      } else {
        newAluno.id_aluno = result.insertId
        alunos.push(newAluno)
        res.status(201).json(newAluno)
      }
    }
  )
})
// 更新
app.put('/alunos/:id_aluno', (req, res) => {
  const id_aluno = parseInt(req.params.id_aluno)
  const updatedAluno = req.body
  const index = alunos.findIndex(aluno => aluno.id_aluno === id_aluno)
  if (index !== -1) {
    connection.query(
      'UPDATE Aluno SET nome_aluno=?, cpf_aluno=?, endereco_aluno=?, telefone_aluno=?, email_aluno=?, nascimento_aluno=?, ra_aluno=?, data_matricula=?, foto=?, senha=?, id_turma=? WHERE id_aluno=?',
      [
        updatedAluno.nome_aluno,
        updatedAluno.cpf_aluno,
        updatedAluno.endereco_aluno,
        updatedAluno.telefone_aluno,
        updatedAluno.email_aluno,
        updatedAluno.nascimento_aluno,
        updatedAluno.ra_aluno,
        updatedAluno.data_matricula,
        updatedAluno.foto,
        updatedAluno.senha,
        updatedAluno.id_turma,
        id_aluno
      ],
      err => {
        if (err) {
          console.error('Error updating data in MySQL: ' + err)
          res.status(500).json({ message: 'Alunoを更新できませんでした' })
        } else {
          alunos[index] = { ...alunos[index], ...updatedAluno }
          res.json(alunos[index])
        }
      }
    )
  } else {
    res.status(404).json({ message: 'Alunoが見つかりません' })
  }
})
// 削除
app.delete('/alunos/:id_aluno', (req, res) => {
  const id_aluno = parseInt(req.params.id_aluno)
  const index = alunos.findIndex(aluno => aluno.id_aluno === id_aluno)
  if (index !== -1) {
    connection.query('DELETE FROM Aluno WHERE id_aluno=?', [id_aluno], err => {
      if (err) {
        console.error('Alunoテーブル - MySQLからのデータ削除エラー: ' + err)
        res.status(500).json({ message: '削除できませんでした' })
      } else {
        const removedAluno = alunos.splice(index, 1)
        res.json(removedAluno[0])
      }
    })
  } else {
    res.status(404).json({ message: '見つかりませんでした' })
  }
})

// Responsavel_Alunoのサーバー管理に関わる部分
// Responsavel_Alunoテーブルのデータ取得
connection.query('SELECT * FROM Responsavel_Aluno;', (err, results) => {
  if (err) {
    console.error('Aluno_Respテーブルでエラー発生: ' + err)
  } else {
    alunoResps = results
  }
})
// リスト化
app.get('/resps_aluno', (req, res) => {
  res.json(alunoResps)
})
// 取得
app.get('/resps_aluno/:id_resp_aluno', (req, res) => {
  const resps_alunoID = parseInt(req.params.id_resp_aluno)
  const alunoResp = alunoResps.find(alunoResp => alunoResp.id_resp_aluno === resps_alunoID)
  if (alunoResp) {
    res.json(alunoResp)
  } else {
    res.status(404).json({ message: '見つかりません' })
  }
})
// 追加
app.post('/resps_aluno', (req, res) => {
  const newAlunoResp = req.body
  connection.query(
    'INSERT INTO Responsavel_Aluno  (id_resp, id_aluno) VALUES (?, ?)',
    [newAlunoResp.id_resp, newAlunoResp.id_aluno],
    (err, result) => {
      if (err) {
        console.error('Error adding data to MySQL: ' + err)
        res.status(500).json({ message: 'Aluno_Respを追加できませんでした' })
      } else {
        /* newAlunoResp.id_aluno = result.insertId */
        alunoResps.push(newAlunoResp)
        res.status(201).json(newAlunoResp)
      }
    }
  )
})

// 削除
app.delete('/resps_aluno/:id_resp_aluno', (req, res) => {
  const alunoID = parseInt(req.params.id_resp_aluno)
  const index = alunoResps.findIndex(alunoResp => alunoResp.id_resp_aluno === id_resp_aluno)
  if (index !== -1) {
    connection.query('DELETE FROM Responsavel_Aluno WHERE id_resp_aluno=?', [alunoID, respID], err => {
      if (err) {
        console.error('Aluno_Respテーブル - MySQLからのデータ削除エラー: ' + err)
        res.status(500).json({ message: '削除できませんでした' })
      } else {
        const removedAlunoResp = alunoResps.splice(index, 1)
        res.json(removedAlunoResp[0])
      }
    })
  } else {
    res.status(404).json({ message: '見つかりませんでした' })
  }
})


// Notasのサーバー管理に関わる部分
// Notasテーブルのデータ取得
connection.query('SELECT * FROM Notas_faltas;', (err, results) => {
  if (err) {
    console.error('Notasテーブルでエラー発生: ' + err)
  } else {
    notas = results
  }
})
// リスト化
app.get('/notas_faltas', (req, res) => {
  res.json(notas)
})
// 取得
app.get('/notas_faltas/:id_notas_faltas', (req, res) => {
  const notasID = parseInt(req.params.id_notas_faltas )
  const nota = notas.find(nota => nota.id_notas_faltas  === notasID)
  if (nota) {
    res.json(nota)
  } else {
    res.status(404).json({ message: '見つかりません' })
  }
})
// 追加
app.post('/notas_faltas', (req, res) => {
  const newNota = req.body
  connection.query(
    'INSERT INTO Notas_faltas (id_disciplina, id_aluno, n1, AI, AP, faltas, academic_year, data_matricula, semestre) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [
      newNota.id_disciplina ,
      newNota.id_aluno,
      newNota.n1,
      newNota.AI,
      newNota.AP,
      newNota.faltas,
      newNota.academic_year,
      newNota.data_matricula,
      newNota.semestre
    ],
    (err, result) => {
      if (err) {
        console.error('Error adding data to MySQL: ' + err)
        res.status(500).json({ message: 'Notasを追加できませんでした' })
      } else {
        newNota.id_notas_faltas = result.insertId
        notas.push(newNota)
        res.status(201).json(newNota)
      }
    }
  )
})
// 更新
app.put('/notas_faltas/:id_notas_faltas', (req, res) => {
  const id_notas_faltas  = parseInt(req.params.id_notas_faltas )
  const updatedNota = req.body
  const index = notas.findIndex(nota => nota.id_notas_faltas  === id_notas_faltas )
  if (index !== -1) {
    connection.query(
      'UPDATE Notas_faltas SET id_disciplina=?, id_aluno=?, n1=?, AI=?, AP=?, faltas=?, academic_year=?, data_matricula=?, semestre=? WHERE id_notas_faltas=?',
      [
        updatedNota.id_disciplina,
        updatedNota.id_aluno,
        updatedNota.n1,
        updatedNota.AI,
        updatedNota.AP,
        updatedNota.faltas,
        updatedNota.academic_year,
        updatedNota.data_matricula,
        updatedNota.semestre,
        id_notas_faltas
      ],
      err => {
        if (err) {
          console.error('Error updating data in MySQL: ' + err)
          res.status(500).json({ message: 'Notasを更新できませんでした' })
        } else {
          notas[index] = { ...notas[index], ...updatedNota }
          res.json(notas[index])
        }
      }
    )
  } else {
    res.status(404).json({ message: 'Notasが見つかりません' })
  }
})
// 削除
app.delete('/notas_faltas/:id_notas_faltas', (req, res) => {
  const id_notas_faltas  = parseInt(req.params.id_notas)
  const index = notas.findIndex(nota => nota.id_notas_faltas  === id_notas_faltas )
  if (index !== -1) {
    connection.query('DELETE FROM Notas_faltas WHERE id_notas_faltas=?', [id_notas_faltas], err => {
      if (err) {
        console.error('Notasテーブル - MySQLからのデータ削除エラー: ' + err)
        res.status(500).json({ message: '削除できませんでした' })
      } else {
        const removedNota = notas.splice(index, 1)
        res.json(removedNota[0])
      }
    })
  } else {
    res.status(404).json({ message: '見つかりませんでした' })
  }
})

// Eventoのサーバー管理に関わる部分
// Eventoテーブルのデータ取得
connection.query('SELECT * FROM Evento;', (err, results) => {
  if (err) {
    console.error('Eventoテーブルでエラー発生: ' + err)
  } else {
    eventos = results
  }
})
// リスト化
app.get('/eventos', (req, res) => {
  res.json(eventos)
})
// 取得
app.get('/eventos/:id_evento', (req, res) => {
  const eventoID = parseInt(req.params.id_evento)
  const evento = eventos.find(evento => evento.id_evento === eventoID)
  if (evento) {
    res.json(evento)
  } else {
    res.status(404).json({ message: '見つかりません' })
  }
})
// 追加
app.post('/eventos', (req, res) => {
  const newEvento = req.body
  connection.query(
    'INSERT INTO Evento (nome_evento, link_evento, data_evento) VALUES (?, ?, ?)',
    [newEvento.nome_evento, newEvento.link_evento, newEvento.data_evento],
    (err, result) => {
      if (err) {
        console.error('Error adding data to MySQL: ' + err)
        res.status(500).json({ message: 'Eventoを追加できませんでした' })
      } else {
        newEvento.id_evento = result.insertId
        eventos.push(newEvento)
        res.status(201).json(newEvento)
      }
    }
  )
})
// 更新
app.put('/eventos/:id_evento', (req, res) => {
  const id_evento = parseInt(req.params.id_evento)
  const updatedEvento = req.body
  const index = eventos.findIndex(evento => evento.id_evento === id_evento)
  if (index !== -1) {
    connection.query(
      'UPDATE Evento SET nome_evento=?, link_evento=?, date_evento=? WHERE id_evento=?',
      [updatedEvento.nome_evento, updatedEvento.link_evento, updatedEvento.date_evento, id_evento],
      err => {
        if (err) {
          console.error('Error updating data in MySQL: ' + err)
          res.status(500).json({ message: 'Eventoを更新できませんでした' })
        } else {
          eventos[index] = { ...eventos[index], ...updatedEvento }
          res.json(eventos[index])
        }
      }
    )
  } else {
    res.status(404).json({ message: 'Eventoが見つかりません' })
  }
})
// 削除
app.delete('/eventos/:id_evento', (req, res) => {
  const id_evento = parseInt(req.params.id_evento)
  const index = eventos.findIndex(evento => evento.id_evento === id_evento)
  if (index !== -1) {
    connection.query('DELETE FROM Evento WHERE id_evento=?', [id_evento], err => {
      if (err) {
        console.error('Eventoテーブル - MySQLからのデータ削除エラー: ' + err)
        res.status(500).json({ message: '削除できませんでした' })
      } else {
        const removedEvento = eventos.splice(index, 1)
        res.json(removedEvento[0])
      }
    })
  } else {
    res.status(404).json({ message: '見つかりませんでした' })
  }
})

// evento_alunoのサーバー管理に関わる部分
// evento_alunoテーブルのデータ取得
connection.query('SELECT * FROM evento_aluno;', (err, results) => {
  if (err) {
    console.error('evento_alunoテーブルでエラー発生: ' + err)
  } else {
    eventoAlunos = results
  }
})
// リスト化
app.get('/evento_alunos', (req, res) => {
  res.json(eventoAlunos)
})
// 取得
app.get('/evento_alunos/:id_evento_aluno', (req, res) => {
  const id_evento_alunoID = parseInt(req.params.id_evento_aluno)
  const eventoAluno = eventoAlunos.find(
    eventoAluno =>  eventoAluno.id_evento_aluno === id_evento_alunoID
  )
  if (eventoAluno) {
    res.json(eventoAluno)
  } else {
    res.status(404).json({ message: '見つかりません' })
  }
})
// 追加
app.post('/evento_alunos', (req, res) => {
  const newEventoAluno = req.body
  connection.query(
    'INSERT INTO evento_aluno (id_aluno, id_evento) VALUES (?, ?)',
    [newEventoAluno.id_evento, newEventoAluno.id_aluno],
    (err, result) => {
      if (err) {
        console.error('Error adding data to MySQL: ' + err)
        res.status(500).json({ message: 'evento_alunoを追加できませんでした' })
      } else {
        newEventoAluno.id_evento_aluno = result.insertId
        eventoAlunos.push(newEventoAluno)
        res.status(201).json(newEventoAluno)
      }
    }
  )
})
// 更新
app.put('/eventos/:id_evento_aluno', (req, res) => {
  const id_evento_aluno = parseInt(req.params.id_evento_aluno)
  const updatedEventoAluno = req.body
  const index = eventoAlunos.findIndex(evento => evento.id_evento_aluno === id_evento_aluno)
  if (index !== -1) {
    connection.query(
      'UPDATE Evento SET id_evento=?, id_aluno=? WHERE id_evento_aluno=?',
      [updatedEventoAluno.id_evento, updatedEventoAluno.id_aluno, id_evento_aluno],
      err => {
        if (err) {
          console.error('Error updating data in MySQL: ' + err)
          res.status(500).json({ message: 'EventoAlunoを更新できませんでした' })
        } else {
          eventoAlunos[index] = { ...eventoAlunos[index], ...updatedEventoAluno }
          res.json(eventoAlunos[index])
        }
      }
    )
  } else {
    res.status(404).json({ message: 'Eventoが見つかりません' })
  }
})
// 削除
app.delete('/evento_alunos/:id_evento_aluno', (req, res) => {
  const id_evento_aluno = parseInt(req.params.id_evento_aluno)
  const index = eventoAlunos.findIndex(
    eventoAluno => eventoAluno.id_evento_aluno === id_evento_aluno
  )
  if (index !== -1) {
    connection.query('DELETE FROM evento_aluno WHERE id_evento_aluno=?', [id_evento_aluno], err => {
      if (err) {
        console.error('evento_alunoテーブル - MySQLからのデータ削除エラー: ' + err)
        res.status(500).json({ message: '削除できませんでした' })
      } else {
        const removedEventoAluno = eventoAlunos.splice(index, 1)
        res.json(removedEventoAluno[0])
      }
    })
  } else {
    res.status(404).json({ message: '見つかりませんでした' })
  }
})


// Disciplina_Alunoのサーバー管理に関わる部分
// Disciplina_Alunoテーブルのデータ取得
connection.query('SELECT * FROM Aluno_disciplina;', (err, results) => {
  if (err) {
    console.error('Disciplina_Alunoテーブルでエラー発生: ' + err)
  } else {
    disciplinaAlunos = results
  }
})
// リスト化
app.get('/Aluno_disciplina', (req, res) => {
  res.json(disciplinaAlunos)
})
// 取得
app.get('/Aluno_disciplina/:id_aluno_disc', (req, res) => {
  const id_aluno_discID = parseInt(req.params.id_aluno_disc)
  const disciplinaAluno = disciplinaAlunos.find(
    disciplinaAluno => disciplinaAluno.id_aluno_disc === id_aluno_discID
  )
  if (disciplinaAluno) {
    res.json(disciplinaAluno)
  } else {
    res.status(404).json({ message: '見つかりません' })
  }
})
// 追加
app.post('/Aluno_disciplina', (req, res) => {
  const newDisciplinaAluno = req.body
  connection.query(
    'INSERT INTO Aluno_disciplina (id_aluno, id_disciplina) VALUES (?, ?)',
    [newDisciplinaAluno.id_aluno, newDisciplinaAluno.id_disciplina],
    (err, result) => {
      if (err) {
        console.error('Error adding data to MySQL: ' + err)
        res.status(500).json({ message: 'Disciplina_Alunoを追加できませんでした' })
      } else {
        newDisciplinaAluno.id_aluno_disc = result.insertId
        disciplinaAlunos.push(newDisciplinaAluno)
        res.status(201).json(newDisciplinaAluno)
      }
    }
  )
})
// 削除
app.delete('/Aluno_disciplina/:id_aluno_disc', (req, res) => {
  const id_aluno_discID = parseInt(req.params.id_aluno_disc)
  const index = disciplinaAlunos.findIndex(
    disciplinaAluno => disciplinaAluno.id_aluno_disc === id_aluno_discID
  )
  if (index !== -1) {
    connection.query(
      'DELETE FROM Aluno_disciplina WHERE id_aluno_disc=?',
      [id_aluno_discID],
      err => {
        if (err) {
          console.error('Aluno_disciplinaテーブル - MySQLからのデータ削除エラー: ' + err)
          res.status(500).json({ message: '削除できませんでした' })
        } else {
          const removedDisciplinaAluno = disciplinaAlunos.splice(index, 1)
          res.json(removedDisciplinaAluno[0])
        }
      }
    )
  } else {
    res.status(404).json({ message: '見つかりませんでした' })
  }
})

// evento_professorのサーバー管理に関わる部分
// evento_professorテーブルのデータ取得
connection.query('SELECT * FROM evento_professor;', (err, results) => {
  if (err) {
    console.error('evento_professorテーブルでエラー発生: ' + err)
  } else {
    eventoProfessors = results
  }
})
// リスト化
app.get('/evento_professors', (req, res) => {
  res.json(eventoProfessors)
})
// 取得
app.get('/evento_professors/:id_evento_prof', (req, res) => {
  const id_evento_profID = parseInt(req.params.id_evento_prof)
  const eventoProfessor = eventoProfessors.find(
    eventoProfessor =>  eventoProfessor.id_evento_prof === id_evento_profID
  )
  if (eventoProfessor) {
    res.json(eventoProfessor)
  } else {
    res.status(404).json({ message: '見つかりません' })
  }
})
// 追加
app.post('/evento_professors', (req, res) => {
  const newEventoProfessor = req.body
  connection.query(
    'INSERT INTO evento_professor (id_evento, id_prof) VALUES (?, ?)',
    [newEventoProfessor.id_evento, newEventoProfessor.id_prof],
    (err, result) => {
      if (err) {
        console.error('Error adding data to MySQL: ' + err)
        res.status(500).json({ message: 'evento_professorを追加できませんでした' })
      } else {
        newEventoProfessor.id_evento_prof = result.insertId
        eventoProfessors.push(newEventoProfessor)
        res.status(201).json(newEventoProfessor)
      }
    }
  )
})
// 削除
app.delete('/evento_professors/:id_evento_prof', (req, res) => {
  const id_evento_profID = parseInt(req.params.id_evento_prof)
  const index = eventoProfessors.findIndex(
    eventoProfessor => eventoProfessor.id_evento_prof === id_evento_profID
  )
  if (index !== -1) {
    connection.query('DELETE FROM evento_professor WHERE id_evento_prof=?', [id_evento_profID], err => {
      if (err) {
        console.error('evento_professorテーブル - MySQLからのデータ削除エラー: ' + err)
        res.status(500).json({ message: '削除できませんでした' })
      } else {
        const removedEventoProfessor = eventoProfessors.splice(index, 1)
        res.json(removedEventoProfessor[0])
      }
    })
  } else {
    res.status(404).json({ message: '見つかりませんでした' })
  }
})

// turma_disciplinaのサーバー管理に関わる部分
// turma_disciplinaテーブルのデータ取得
connection.query('SELECT * FROM turma_disciplina;', (err, results) => {
  if (err) {
    console.error('turma_disciplinaテーブルでエラー発生: ' + err)
  } else {
    turmaDisciplinas = results;
  }
})
// リスト化
app.get('/turma_disciplinas', (req, res) => {
  res.json(turmaDisciplinas)
})
// 取得
app.get('/turma_disciplinas/:id_turma_disc', (req, res) => {
  const id_turma_discID = parseInt(req.params.id_turma_disc)
  const turmaDisciplina = turmaDisciplinas.find(
    turmaDisciplina => turmaDisciplina.id_turma_disc === id_turma_discID
  )
  if (turmaDisciplina) {
    res.json(turmaDisciplina)
  } else {
    res.status(404).json({ message: '見つかりません' })
  }
})
// 追加
app.post('/turma_disciplinas', (req, res) => {
  const newTurmaDisciplina = req.body
  connection.query(
    'INSERT INTO turma_disciplina (id_turma, id_disciplina) VALUES (?, ?)',
    [newTurmaDisciplina.id_turma, newTurmaDisciplina.id_disciplina],
    (err, result) => {
      if (err) {
        console.error('Error adding data to MySQL: ' + err)
        res.status(500).json({ message: 'turma_disciplinaを追加できませんでした' })
      } else {
        newTurmaDisciplina.id_turma_disc = result.insertId
        turmaDisciplinas.push(newTurmaDisciplina)
        res.status(201).json(newTurmaDisciplina)
      }
    }
  )
})
// 削除
app.delete('/turma_disciplinas/:id_turma_disc', (req, res) => {
  const id_turma_discID = parseInt(req.params.id_turma_disc)
  const index = turmaDisciplinas.findIndex(
    turmaDisciplina => turmaDisciplina.id_turma_disc === id_turma_discID
  )
  if (index !== -1) {
    connection.query(
      'DELETE FROM turma_disciplina WHERE id_turma_disc=?',
      [id_turma_discID],
      err => {
        if (err) {
          console.error('turma_disciplinaテーブル - MySQLからのデータ削除エラー: ' + err)
          res.status(500).json({ message: '削除できませんでした' })
        } else {
          const removedTurmaDisciplina = turmaDisciplinas.splice(index, 1)
          res.json(removedTurmaDisciplina[0])
        }
      }
    )
  } else {
    res.status(404).json({ message: '見つかりませんでした' })
  }
})


// prof_disciplinaのサーバー管理に関わる部分
// prof_disciplinaテーブルのデータ取得
connection.query('SELECT * FROM prof_disciplina;', (err, results) => {
  if (err) {
    console.error('prof_disciplinaテーブルでエラーが発生しました: ' + err);
  } else {
    profDisciplinas = results;
  }
});
// リスト化
app.get('/prof_disciplinas', (req, res) => {
  res.json(profDisciplinas);
});
// 取得
app.get('/prof_disciplinas/:id_prof_disc', (req, res) => {
  const id_prof_discID = parseInt(req.params.id_prof_disc);
  const profDisciplina = profDisciplinas.find(
    profDisciplina => profDisciplina.id_prof_disc === id_prof_discID
  );
  if (profDisciplina) {
    res.json(profDisciplina);
  } else {
    res.status(404).json({ message: '見つかりません' });
  }
});
// 追加
app.post('/prof_disciplinas', (req, res) => {
  const newProfDisciplina = req.body;
  connection.query(
    'INSERT INTO prof_disciplina (id_prof, id_disciplina) VALUES (?, ?)',
    [newProfDisciplina.id_prof, newProfDisciplina.id_disciplina],
    (err, result) => {
      if (err) {
        console.error('MySQLにデータを追加する際にエラーが発生しました: ' + err);
        res.status(500).json({ message: 'prof_disciplinaを追加できませんでした' });
      } else {
        newProfDisciplina.id_prof_disc = result.insertId;
        profDisciplinas.push(newProfDisciplina);
        res.status(201).json(newProfDisciplina);
      }
    }
  );
});
// 削除
app.delete('/prof_disciplinas/:id_prof_disc', (req, res) => {
  const id_prof_discID = parseInt(req.params.id_prof_disc);
  const index = profDisciplinas.findIndex(
    profDisciplina => profDisciplina.id_prof_disc === id_prof_discID
  );
  if (index !== -1) {
    connection.query(
      'DELETE FROM prof_disciplina WHERE id_prof_disc=?',
      [id_prof_discID],
      err => {
        if (err) {
          console.error('prof_disciplinaテーブル - MySQLからのデータ削除エラー: ' + err);
          res.status(500).json({ message: '削除できませんでした' });
        } else {
          const removedProfDisciplina = profDisciplinas.splice(index, 1);
          res.json(removedProfDisciplina[0]);
        }
      }
    );
  } else {
    res.status(404).json({ message: '見つかりませんでした' });
  }
});

// サーバーサイドのルートを変更
app.get('/alunos/turma/:id_turma', (req, res) => {
  const turmaID = parseInt(req.params.id_turma);
  const alunosTurma = alunos.filter(aluno => aluno.id_turma === turmaID); // 特定のTurmaに関連するAlunoをフィルタリング
  res.json(alunosTurma);
});

// サーバーサイドのルートを変更
app.get('/turmas/:id_turma/disciplinas', (req, res) => {
  const turmaID = parseInt(req.params.id_turma);
  // TurmaとDisciplinaを結合して、特定のTurmaに関連するDisciplinaを取得
  const query = `SELECT Disciplina.id_disciplina, Disciplina.disciplina FROM Disciplina 
                 INNER JOIN Turma_Disciplina ON Disciplina.id_disciplina = Turma_Disciplina.id_disciplina 
                 WHERE Turma_Disciplina.id_turma = ?`;
  connection.query(query, [turmaID], (err, results) => {
    if (err) {
      console.error('Turmaに関連するDisciplinaの取得エラー:', err);
      res.status(500).json({ message: 'Turmaに関連するDisciplinaを取得できませんでした' });
    } else {
      res.json(results);
    }
  });
});

// サーバーサイドのルートを変更
app.get('/notas_faltas/disciplina/:id_disciplina', (req, res) => {
  const disciplinaID = parseInt(req.params.id_disciplina);
  const notasDisciplina = notas.filter(nota => nota.id_disciplina === disciplinaID); // 特定のDisciplinaに関連するNotas_faltasをフィルタリング
  res.json(notasDisciplina);
});


app.listen(port, () => {
  console.log(`ポート${port}でサーバーが開始されました / Servidor iniciado na porta ${port}`)
})
