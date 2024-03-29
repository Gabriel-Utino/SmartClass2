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
app.get('/evento_alunos/:id_aluno/:id_evento', (req, res) => {
  const alunoID = parseInt(req.params.id_aluno)
  const eventoID = parseInt(req.params.id_evento)
  const eventoAluno = eventoAlunos.find((eventoAluno) => eventoAluno.id_aluno === alunoID && eventoAluno.id_evento === eventoID)
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
    [newEventoAluno.id_aluno, newEventoAluno.id_evento],
    (err, result) => {
      if (err) {
        console.error('MySQLへのデータ追加エラー: ' + err)
        res.status(500).json({ message: 'evento_alunoを追加できませんでした' })
      } else {
        newEventoAluno.id_aluno = result.insertId
        eventoAlunos.push(newEventoAluno)
        res.status(201).json(newEventoAluno)
      }
    }
  )
})

// 削除
app.delete('/evento_alunos/:id_aluno/:id_evento', (req, res) => {
  const alunoID = parseInt(req.params.id_aluno)
  const eventoID = parseInt(req.params.id_evento)
  const index = eventoAlunos.findIndex(eventoAluno => eventoAluno.id_aluno === alunoID && eventoAluno.id_evento === eventoID)
  if (index !== -1) {
    connection.query('DELETE FROM evento_aluno WHERE id_aluno=? AND id_evento=?', [alunoID, eventoID], err => {
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
