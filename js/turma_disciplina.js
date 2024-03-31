const apiUrl = 'http://localhost:3000/turma_disciplinas';

function displayTurmaDisciplina(turmaDisciplina) {
  const turmaDisciplinaList = document.getElementById('turmaDisciplinaList');
  turmaDisciplinaList.innerHTML = '';
  turmaDisciplina.forEach(turmaDisciplina => {
    const turmaDisciplinaElement = document.createElement('tr');
    turmaDisciplinaElement.innerHTML = `
              <td>${turmaDisciplina.id_turma}</td>
              <td>${turmaDisciplina.id_disciplina}</td>
              <td>
                <button onclick="deleteTurmaDisciplina(${turmaDisciplina.id_turma}, ${turmaDisciplina.id_disciplina})">Excluir</button>
              </td>
          `;
    turmaDisciplinaList.appendChild(turmaDisciplinaElement);
  });
}

function getTurmaDisciplinas() {
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => displayTurmaDisciplina(data))
    .catch(error => console.error('Erro:', error));
}

document.getElementById('addTurmaDisciplinaForm').addEventListener('submit', function(event) {
  event.preventDefault();
  const turmaId = document.getElementById('turmaDisciplinaTurmaId').value;
  const id_turma = parseInt(turmaId)
  const disciplinaId = document.getElementById('turmaDisciplinaDisciplinaId').value;
  const id_disciplina = parseInt(disciplinaId)

  fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id_turma: id_turma,
      id_disciplina: id_disciplina
    })
  })
    .then(response => response.json())
    .then(data => {
      getTurmaDisciplinas();
      document.getElementById('addTurmaDisciplinaForm').reset();
    })
    .catch(error => console.error('Erro:', error));
});

function deleteTurmaDisciplina(turmaId, disciplinaId) {
  fetch(`${apiUrl}/${turmaId}/${disciplinaId}`, {
    method: 'DELETE'
  })
    .then(response => response.json())
    .then(data => getTurmaDisciplinas())
    .catch(error => console.error('Erro:', error));
}

getTurmaDisciplinas();
