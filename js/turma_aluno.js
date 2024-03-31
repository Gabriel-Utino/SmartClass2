const apiUrlTurmaAlunos = 'http://localhost:3000/turma_alunos';

// リストを表示
function displayTurmaAlunos(turmaAlunos) {
  const turmaAlunosList = document.getElementById('turmaAlunosList');
  turmaAlunosList.innerHTML = '';
  turmaAlunos.forEach(turmaAluno => {
    const turmaAlunoElement = document.createElement('tr');
    turmaAlunoElement.innerHTML = `
              <td>${turmaAluno.id_aluno}</td>
              <td>${turmaAluno.id_turma}</td>
              <td>
                <button onclick="deleteTurmaAluno(${turmaAluno.id_aluno}, ${turmaAluno.id_turma})">Excluir</button>
              </td>
          `;
    turmaAlunosList.appendChild(turmaAlunoElement);
  });
}

// 取得
function getTurmaAlunos() {
  fetch(apiUrlTurmaAlunos)
    .then(response => response.json())
    .then(data => displayTurmaAlunos(data))
    .catch(error => console.error('Erro:', error));
}

// 追加
document.getElementById('addTurmaAlunoForm').addEventListener('submit', function (event) {
  event.preventDefault();
  const id_aluno1 = document.getElementById('alunoId').value;
  id_aluno = parseInt(id_aluno1)
  const id_turma1 = document.getElementById('turmaId').value;
  id_turma = parseInt(id_turma1)

  fetch(apiUrlTurmaAlunos, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id_aluno: id_aluno,
      id_turma: id_turma
    })
  })
    .then(response => response.json())
    .then(data => {
      getTurmaAlunos();
      document.getElementById('addTurmaAlunoForm').reset();
    })
    .catch(error => console.error('Erro:', error));
});

// 削除
function deleteTurmaAluno(id_aluno, id_turma) {
  fetch(`${apiUrlTurmaAlunos}/${id_aluno}/${id_turma}`, {
    method: 'DELETE'
  })
    .then(response => response.json())
    .then(data => getTurmaAlunos())
    .catch(error => console.error('Erro:', error));
}

getTurmaAlunos();
