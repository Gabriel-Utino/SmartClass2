// Disciplina_Alunoテーブルのデータ取得
connection.query('SELECT * FROM Disciplina_Aluno;', (err, results) => {
  if (err) {
    console.error('Disciplina_Alunoテーブルでエラー発生: ' + err)
  } else {
    disciplinaAlunos = results
  }
})

// リスト化
app.get('/disciplina_alunos', (req, res) => {
  res.json(disciplinaAlunos)
})

// 取得
app.get('/disciplina_alunos/:id_aluno/:id_disciplina', (req, res) => {
  const alunoID = parseInt(req.params.id_aluno)
  const disciplinaID = parseInt(req.params.id_disciplina)
  const disciplinaAluno = disciplinaAlunos.find((disciplinaAluno) => disciplinaAluno.id_aluno === alunoID && disciplinaAluno.id_disciplina === disciplinaID)
  if (disciplinaAluno) {
    res.json(disciplinaAluno)
  } else {
    res.status(404).json({ message: '見つかりません' })
  }
})

// 追加
app.post('/disciplina_alunos', (req, res) => {
  const newDisciplinaAluno = req.body
  connection.query(
    'INSERT INTO Disciplina_Aluno (id_aluno, id_disciplina) VALUES (?, ?)',
    [newDisciplinaAluno.id_aluno, newDisciplinaAluno.id_disciplina],
    (err, result) => {
      if (err) {
        console.error('MySQLへのデータ追加エラー: ' + err)
        res.status(500).json({ message: 'Disciplina_Alunoを追加できませんでした' })
      } else {
        newDisciplinaAluno.id_aluno = result.insertId
        disciplinaAlunos.push(newDisciplinaAluno)
        res.status(201).json(newDisciplinaAluno)
      }
    }
  )
})

// 削除
app.delete('/disciplina_alunos/:id_aluno/:id_disciplina', (req, res) => {
  const alunoID = parseInt(req.params.id_aluno)
  const disciplinaID = parseInt(req.params.id_disciplina)
  const index = disciplinaAlunos.findIndex(disciplinaAluno => disciplinaAluno.id_aluno === alunoID && disciplinaAluno.id_disciplina === disciplinaID)
  if (index !== -1) {
    connection.query('DELETE FROM Disciplina_Aluno WHERE id_aluno=? AND id_disciplina=?', [alunoID, disciplinaID], err => {
      if (err) {
        console.error('Disciplina_Alunoテーブル - MySQLからのデータ削除エラー: ' + err)
        res.status(500).json({ message: '削除できませんでした' })
      } else {
        const removedDisciplinaAluno = disciplinaAlunos.splice(index, 1)
        res.json(removedDisciplinaAluno[0])
      }
    })
  } else {
    res.status(404).json({ message: '見つかりませんでした' })
  }
})
