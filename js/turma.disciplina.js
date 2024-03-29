// turma_disciplinaテーブルのデータ取得
connection.query('SELECT * FROM turma_disciplina;', (err, results) => {
  if (err) {
    console.error('turma_disciplinaテーブルでエラー発生: ' + err)
  } else {
    turmaDisciplinas = results
  }
})

// リスト化
app.get('/turma_disciplinas', (req, res) => {
  res.json(turmaDisciplinas)
})

// 取得
app.get('/turma_disciplinas/:id_turma/:id_disciplina', (req, res) => {
  const turmaID = parseInt(req.params.id_turma)
  const disciplinaID = parseInt(req.params.id_disciplina)
  const turmaDisciplina = turmaDisciplinas.find((turmaDisciplina) => turmaDisciplina.id_turma === turmaID && turmaDisciplina.id_disciplina === disciplinaID)
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
        console.error('MySQLへのデータ追加エラー: ' + err)
        res.status(500).json({ message: 'turma_disciplinaを追加できませんでした' })
      } else {
        newTurmaDisciplina.id_turma = result.insertId
        turmaDisciplinas.push(newTurmaDisciplina)
        res.status(201).json(newTurmaDisciplina)
      }
    }
  )
})

// 削除
app.delete('/turma_disciplinas/:id_turma/:id_disciplina', (req, res) => {
  const turmaID = parseInt(req.params.id_turma)
  const disciplinaID = parseInt(req.params.id_disciplina)
  const index = turmaDisciplinas.findIndex(turmaDisciplina => turmaDisciplina.id_turma === turmaID && turmaDisciplina.id_disciplina === disciplinaID)
  if (index !== -1) {
    connection.query('DELETE FROM turma_disciplina WHERE id_turma=? AND id_disciplina=?', [turmaID, disciplinaID], err => {
      if (err) {
        console.error('turma_disciplinaテーブル - MySQLからのデータ削除エラー: ' + err)
        res.status(500).json({ message: '削除できませんでした' })
      } else {
        const removedTurmaDisciplina = turmaDisciplinas.splice(index, 1)
        res.json(removedTurmaDisciplina[0])
      }
    })
  } else {
    res.status(404).json({ message: '見つかりませんでした' })
  }
})
