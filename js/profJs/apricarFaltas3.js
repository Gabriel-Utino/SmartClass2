const apiUrlTurma = 'http://localhost:3000/turmas'

document.addEventListener('DOMContentLoaded', function () {
  // セレクト要素の取得
  const turmaSelect = document.getElementById('turmaSelect')
  const disciplinaSelect = document.getElementById('disciplinaSelect')

  // Turmaの取得
  fetch(`${apiUrlTurma}`)
    .then(response => response.json())
    .then(data => {
      // 取得したTurmaをセレクトボックスに追加
      data.forEach(turma => {
        const option = document.createElement('option')
        option.value = turma.id_turma
        option.textContent = `${turma.nome_turma} - ${turma.ano} - Semestre ${turma.semestre}`
        turmaSelect.appendChild(option)
      })
    })
    .catch(error => console.error('Turmaデータの取得エラー:', error))

  // Turmaが選択されたときに関連するDisciplinaを取得
  turmaSelect.addEventListener('change', function () {
    const selectedTurmaId = turmaSelect.value
    disciplinaSelect.innerHTML = '<option value="" disabled selected>Escolha a Disciplina</option>' // デフォルトオプションを追加

    if (selectedTurmaId) {
      // 選択されたTurmaに関連するDisciplinaを取得
      fetch(`/turma_disciplinas?id_turma=${selectedTurmaId}`)
        .then(response => response.json())
        .then(data => {
          data.forEach(turmaDisciplina => {
            // 選択されたTurmaに関連するDisciplinaをセレクトボックスに追加
            const option = document.createElement('option')
            option.value = turmaDisciplina.id_disciplina
            option.textContent = turmaDisciplina.disciplina
            disciplinaSelect.appendChild(option)
          })
        })
        .catch(error => console.error('TurmaのDisciplinaデータの取得エラー:', error))
    }
  })
})
