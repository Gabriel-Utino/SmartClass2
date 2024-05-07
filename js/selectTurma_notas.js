const apiUrlTurma = 'http://localhost:3000/turmas'
const apiUrlDisciplina = 'http://localhost:3000/disciplinas'
const apiUrlAluno = 'http://localhost:3000/alunos'


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

// Turmaが選択されたときに呼び出される関数
function populateAlunos() {
  const turmaId = document.getElementById('selectTurma').value; // 選択されたTurmaのIDを取得

  // サーバーからAlunoを取得
  fetch(`http://localhost:3000/alunos/turma/${turmaId}`)
    .then(response => response.json())
    .then(alunos => {
      const alunosList = document.getElementById('alunosList');

      // 一旦リストをクリア
      alunosList.innerHTML = '';

      // 取得したAlunoをリストとして表示
      alunos.forEach(aluno => {
        const listItem = document.createElement('li');
        listItem.className = 'list-group-item';
        listItem.textContent = aluno.nome_aluno;
        alunosList.appendChild(listItem);
      });
    })
    .catch(error => console.error('Alunosの取得エラー:', error));
}

function populateDisciplina() {
  const turmaId = document.getElementById('selectTurma').value; // 選択されたTurmaのIDを取得

  // 選択されたTurmaに関連するDisciplinaを取得
  fetch(`http://localhost:3000/turmas/${turmaId}/disciplinas`)
    .then(response => response.json())
    .then(disciplinas => {
      const selectDisciplina = document.getElementById('selectDisciplina');

      // セレクトボックスの選択肢をリセット
      selectDisciplina.innerHTML = '<option value="" disabled selected>Escolha a Disciplina</option>';

      // 取得したDisciplinaをセレクトボックスの選択肢として追加
      disciplinas.forEach(disciplina => {
        const option = document.createElement('option');
        option.value = disciplina.id_disciplina;
        option.textContent = disciplina.disciplina;
        selectDisciplina.appendChild(option);
      });
    })
    .catch(error => console.error('データ取得エラー:', error));
}







// Turmaが選択されたときにpopulateAlunos()を呼び出すようにする
document.getElementById('selectTurma').addEventListener('change', populateAlunos);
// ページが読み込まれたときに一度データを取得してセレクトボックスを初期化
document.addEventListener('DOMContentLoaded', populateDisciplina);
// ページ読み込み時にTurmaを取得して選択肢を追加
document.addEventListener('DOMContentLoaded', populateTurmas)
// Turmaを選択したときにAlunoを取得してリスト化
document.getElementById('selectTurma').addEventListener('change', populateAlunos);
