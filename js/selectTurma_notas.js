const apiUrlTurma = 'http://localhost:3000/turmas'
const apiUrlDisciplina = 'http://localhost:3000/disciplinas'


// Turmaの選択肢を追加する関数
function populateTurmas() {
  // リクエストを送信してTurmaを取得
  fetch(apiUrlTurma)
    .then(response => response.json())
    .then(turmas => {
      const selectTurma = document.getElementById('selectTurma')

      // すでに選択肢があればクリア
      selectTurma.innerHTML = '<option value="" disabled selected>Escolha a Turma</option>'

      // 取得したTurmaを選択肢として追加
      turmas.forEach(turma => {
        const option = document.createElement('option')
        option.value = turma.id_turma
        option.textContent = `${turma.nome_turma} - Ano ${turma.ano} - Semestre ${turma.semestre}`
        selectTurma.appendChild(option)
      })
    })
    .catch(error => console.error('Turmasの取得エラー:', error))
}

function populateDisciplina() {
  fetch(apiUrlDisciplina)
    .then(response => response.json())
    .then(data => {
      // セレクトボックスの選択肢をリセット
      const selectElement = document.getElementById('selectDisciplina');
      selectElement.innerHTML = '<option value="" disabled selected>Escolha a Disciplina</option>';

      // 取得したデータをセレクトボックスに追加
      data.forEach(disciplina => {
        const option = document.createElement('option');
        option.value = disciplina.id_disciplina;
        option.textContent = `Nome ${disciplina.disciplina} - Horas ${disciplina.horario}`
        selectElement.appendChild(option);
      });
    })
    .catch(error => console.error('データ取得エラー:', error));
}


// ページが読み込まれたときに一度データを取得してセレクトボックスを初期化
document.addEventListener('DOMContentLoaded', populateDisciplina);
// ページ読み込み時にTurmaを取得して選択肢を追加
document.addEventListener('DOMContentLoaded', populateTurmas)
