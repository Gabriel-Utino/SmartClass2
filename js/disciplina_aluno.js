const apiUrl = 'http://localhost:3000/disciplina_alunos';

function displayDisciplinaAluno(disciplinaAluno) {
  const disciplinaAlunoList = document.getElementById('disciplinaAlunoList');
  disciplinaAlunoList.innerHTML = '';
  disciplinaAluno.forEach(disciplinaAluno => {
    const disciplinaAlunoElement = document.createElement('tr');
    disciplinaAlunoElement.innerHTML = `
              <td>${disciplinaAluno.id_aluno}</td>
              <td>${disciplinaAluno.id_disciplina}</td>
              <td>
                <button onclick="deleteDisciplinaAluno(${disciplinaAluno.id_aluno}, ${disciplinaAluno.id_disciplina})">Excluir</button>
              </td>
          `;
    disciplinaAlunoList.appendChild(disciplinaAlunoElement);
  });
}

function getDisciplinaAlunos() {
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => displayDisciplinaAluno(data))
    .catch(error => console.error('Erro:', error));
}

document.getElementById('addDisciplinaAlunoForm').addEventListener('submit', function(event) {
  event.preventDefault();
  const alunoId = document.getElementById('disciplinaAlunoAlunoId').value;
  const id_aluno = parseInt(alunoId)
  const disciplinaId = document.getElementById('disciplinaAlunoDisciplinaId').value;
  const id_disciplina = parseInt(disciplinaId)

  fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id_aluno: id_aluno,
      id_disciplina: id_disciplina
    })
  })
    .then(response => response.json())
    .then(data => {
      getDisciplinaAlunos();
      document.getElementById('addDisciplinaAlunoForm').reset();
    })
    .catch(error => console.error('Erro:', error));
});

function deleteDisciplinaAluno(alunoId, disciplinaId) {
  fetch(`${apiUrl}/${alunoId}/${disciplinaId}`, {
    method: 'DELETE'
  })
    .then(response => response.json())
    .then(data => getDisciplinaAlunos())
    .catch(error => console.error('Erro:', error));
}

getDisciplinaAlunos();
