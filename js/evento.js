// Eventテーブルのデータ取得
connection.query('SELECT * FROM Evento;', (err, results) => {
  if (err) {
    console.error('Eventテーブルでエラー発生: ' + err)
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
  const evento = eventos.find((evento) => evento.id_evento === eventoID)
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
    'INSERT INTO Evento (nome_evento, link_evento, date_evento) VALUES (?, ?, ?)',
    [newEvento.nome_evento, newEvento.link_evento, newEvento.date_evento],
    (err, result) => {
      if (err) {
        console.error('MySQLへのデータ追加エラー: ' + err)
        res.status(500).json({ message: 'Eventを追加できませんでした' })
      } else {
        newEvento.id_evento = result.insertId
        eventos.push(newEvento)
        res.status(201).json(newEvento)
      }
    }
  )
})

// 更新
app.put("/eventos/:id_evento", (req, res) => {
  const id_evento = parseInt(req.params.id_evento)
  const updatedEvento = req.body
  const index = eventos.findIndex((evento) => evento.id_evento === id_evento)
  if (index !== -1) {
    connection.query(
      "UPDATE Evento SET nome_evento=?, link_evento=?, date_evento=? WHERE id_evento=?",
      [updatedEvento.nome_evento, updatedEvento.link_evento, updatedEvento.date_evento, id_evento],
      (err) => {
        if (err) {
          console.error("MySQLでデータ更新エラー: " + err)
          res.status(500).json({ message: "Eventを更新できませんでした" })
        } else {
          eventos[index] = { ...eventos[index], ...updatedEvento }
          res.json(eventos[index])
        }
      }
    )
  } else {
    res.status(404).json({ message: "Eventが見つかりません" })
  }
})

// 削除
app.delete('/eventos/:id_evento', (req, res) => {
  const id_evento = parseInt(req.params.id_evento)
  const index = eventos.findIndex(evento => evento.id_evento === id_evento)
  if (index !== -1) {
    connection.query('DELETE FROM Evento WHERE id_evento=?', [id_evento], err => {
      if (err) {
        console.error('MySQLからのデータ削除エラー: ' + err)
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
