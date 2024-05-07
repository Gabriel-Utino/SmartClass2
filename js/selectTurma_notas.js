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

function populateAlunos() {
  const selectTurma = document.getElementById('selectTurma');
  const turmaId = selectTurma.value;

  if (!turmaId) {
    // もしTurmaが選択されていない場合は、何もしない
    return;
  }

  // Alunosリストを取得するためのAPIエンドポイント
  const apiUrlTurmaAlunos = `http://localhost:3000/turmas/${turmaId}/alunos`;

  fetch(apiUrlTurmaAlunos)
    .then(response => response.json())
    .then(alunos => {
      const alunosList = document.getElementById('alunosList');
      // リストをクリア
      alunosList.innerHTML = '';

      // 取得したAlunosをリストに追加
      alunos.forEach(aluno => {
        const listItem = document.createElement('li');
        listItem.classList.add('list-group-item');
        listItem.textContent = aluno.nome_aluno;
        alunosList.appendChild(listItem);
      });
    })
    .catch(error => console.error('Alunosの取得エラー:', error));
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

// Disciplinaが選択されたときに呼び出される関数
function populateNotas() {
  const disciplinaId = document.getElementById('selectDisciplina').value; // 選択されたDisciplinaのIDを取得
  const alunosList = document.getElementById('alunosList');

  // すでに表示されているAlunoリストをクリア
  alunosList.innerHTML = '';

  // サーバーからDisciplinaに関連するAlunoとそれぞれの成績を取得
  fetch(`http://localhost:3000/notas_faltas/disciplina/${disciplinaId}`)
    .then(response => response.json())
    .then(notas => {
      notas.forEach(nota => {
        // 各Alunoの成績入力フォームを作成
        const listItem = document.createElement('li');
        listItem.className = 'list-group-item';

        const form = document.createElement('form');
        form.id = `form-${nota.id_aluno}`;

        const alunoName = document.createElement('span');
        alunoName.textContent = nota.nome_aluno + ': ';
        form.appendChild(alunoName);

        const n1Input = createInput('N1', nota.N1, nota.id_notas_faltas);
        form.appendChild(n1Input);

        const aiInput = createInput('AI', nota.AI, nota.id_notas_faltas);
        form.appendChild(aiInput);

        const apInput = createInput('AP', nota.AP, nota.id_notas_faltas);
        form.appendChild(apInput);

        listItem.appendChild(form);
        alunosList.appendChild(listItem);
      });
    })
    .catch(error => console.error('Notasの取得エラー:', error));
}

// 入力フォームを作成する関数
function createInput(label, value, notaId) {
  const inputGroup = document.createElement('div');
  inputGroup.className = 'input-group mb-3';

  const inputLabel = document.createElement('span');
  inputLabel.className = 'input-group-text';
  inputLabel.textContent = label;

  const input = document.createElement('input');
  input.type = 'text';
  input.className = 'form-control';
  input.value = value;
  input.dataset.notaId = notaId;

  inputGroup.appendChild(inputLabel);
  inputGroup.appendChild(input);

  return inputGroup;
}



// Disciplinaが選択されたときにpopulateNotas()を呼び出すようにする
document.getElementById('selectDisciplina').addEventListener('change', populateNotas);
// Turmaが選択されたときにpopulateAlunos()を呼び出すようにする
document.getElementById('selectTurma').addEventListener('change', populateAlunos);
// ページが読み込まれたときに一度データを取得してセレクトボックスを初期化
document.addEventListener('DOMContentLoaded', populateDisciplina);
// ページ読み込み時にTurmaを取得して選択肢を追加
document.addEventListener('DOMContentLoaded', populateTurmas)
// Turmaを選択したときにAlunoを取得してリスト化
document.getElementById('selectTurma').addEventListener('change', populateAlunos);
