const apiUrlTurma = 'http://localhost:3000/turmas'
const apiUrlDisciplina = 'http://localhost:3000/disciplinas'
const apiUrlAluno = 'http://localhost:3000/alunos'

// サーバーからTurmaのリストを取得する関数
function getTurmas() {
  fetch(apiUrlTurma)
    .then(response => response.json())
    .then(data => {
      const selectTurma = document.getElementById('selectTurma');
      // 取得したTurmaリストをセレクトボックスに追加
      data.forEach(turma => {
        const option = document.createElement('option');
        option.value = turma.id_turma;
        option.textContent = `${turma.nome_turma} - Ano ${turma.ano} - Semestre ${turma.semestre}`;
        selectTurma.appendChild(option);
      });
    })
    .catch(error => console.error('Turmaの取得中にエラーが発生しました:', error));
}

// Turmaが選択されたときの処理
document.getElementById('selectTurma').addEventListener('change', function() {
  const selectedTurmaId = this.value;
  if (!selectedTurmaId) return; // 選択されたTurmaがない場合は何もしない

  // 選択されたTurmaに関連するDisciplinaを取得する関数
  function getDisciplinas(selectedTurmaId) {
    fetch(`http://localhost:3000/turmas/${selectedTurmaId}/disciplinas`)
      .then(response => response.json())
      .then(data => {
        const selectDisciplina = document.getElementById('selectDisciplina');
        // セレクトボックスをクリア
        selectDisciplina.innerHTML = '';
        // 取得したDisciplinaリストをセレクトボックスに追加
        data.forEach(disciplina => {
          const option = document.createElement('option');
          option.value = disciplina.id_disciplina;
          option.textContent = disciplina.disciplina;
          selectDisciplina.appendChild(option);
        });
      })
      .catch(error => console.error('Disciplinaの取得中にエラーが発生しました:', error));
  }

  // 選択されたTurmaに関連するDisciplinaを取得
  getDisciplinas(selectedTurmaId);
});

// Turmaが選択されたときの処理
document.getElementById('selectTurma').addEventListener('change', function() {
  const selectedTurmaId = this.value;
  if (!selectedTurmaId) return; // 選択されたTurmaがない場合は何もしない

  // 選択されたTurmaに関連するAlunoを取得する関数
  function getAlunos(selectedTurmaId) {
    fetch(`http://localhost:3000/turmas/${selectedTurmaId}/alunos`)
      .then(response => response.json())
      .then(data => {
        // 取得したAlunoリストを使って何かを行う（例：リスト表示など）
        console.log('Alunos:', data);
      })
      .catch(error => console.error('Alunoの取得中にエラーが発生しました:', error));
  }

  // 選択されたTurmaに関連するAlunoを取得
  getAlunos(selectedTurmaId);
});

// Disciplinaが選択されたときの処理
document.getElementById('selectDisciplina').addEventListener('change', function() {
  const selectedTurmaId = document.getElementById('selectTurma').value;
  const selectedDisciplinaId = this.value;
  if (!selectedTurmaId || !selectedDisciplinaId) return; // 選択されたTurmaまたはDisciplinaがない場合は何もしない

  // 選択されたTurmaとDisciplinaに関連するNotas_faltasを取得する関数
  function getNotasFaltas(selectedTurmaId, selectedDisciplinaId) {
    fetch(`http://localhost:3000/turmas/${selectedTurmaId}/disciplinas/${selectedDisciplinaId}/notas_faltas`)
      .then(response => response.json())
      .then(data => {
        // 取得したNotas_faltasを使って何かを行う（例：入力フィールドを表示など）
        console.log('Notas_faltas:', data);
      })
      .catch(error => console.error('Notas_faltasの取得中にエラーが発生しました:', error));
  }

  // 選択されたTurmaとDisciplinaに関連するNotas_faltasを取得
  getNotasFaltas(selectedTurmaId, selectedDisciplinaId);
});


// ページ読み込み時にTurmaのリストを取得
document.addEventListener('DOMContentLoaded', getTurmas);




