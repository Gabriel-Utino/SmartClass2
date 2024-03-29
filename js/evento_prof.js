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
app.get('/evento_professors/:id_prof/:id_evento', (req, res) => {
  const professorID = parseInt(req.params.id_prof)
  const eventoID = parseInt(req.params.id_evento)
  const eventoProfessor = eventoProfessors.find((eventoProfessor) => eventoProfessor.id_prof === professorID && eventoProfessor.id_evento === eventoID)
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
    'INSERT INTO evento_professor (id_prof, id_evento) VALUES (?, ?)',
    [newEventoProfessor.id_prof, newEventoProfessor.id_evento],
    (err, result) => {
      if (err) {
        console.error('MySQLへのデータ追加エラー: ' + err)
        res.status(500).json({ message: 'evento_professorを追加できませんでした' })
      } else {
        newEventoProfessor.id_prof = result.insertId
        eventoProfessors.push(newEventoProfessor)
        res.status(201).json(newEventoProfessor)
      }
    }
  )
})

// 削除
app.delete('/evento_professors/:id_prof/:id_evento', (req, res) => {
  const professorID = parseInt(req.params.id_prof)
  const eventoID = parseInt(req.params.id_evento)
  const index = eventoProfessors.findIndex(eventoProfessor => eventoProfessor.id_prof === professorID && eventoProfessor.id_evento === eventoID)
  if (index !== -1) {
    connection.query('DELETE FROM evento_professor WHERE id_prof=? AND id_evento=?', [professorID, eventoID], err => {
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
