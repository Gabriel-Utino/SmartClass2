const apiUrl = 'http://localhost:3000/evento_alunos';

function displayEventoAluno(eventoAluno) {
  const eventoAlunoList = document.getElementById('eventoAlunoList');
  eventoAlunoList.innerHTML = '';
  eventoAluno.forEach(eventoAluno => {
    const eventoAlunoElement = document.createElement('tr');
    eventoAlunoElement.innerHTML = `
              <td>${eventoAluno.id_aluno}</td>
              <td>${eventoAluno.id_evento}</td>
              <td>
                <button onclick="deleteEventoAluno(${eventoAluno.id_aluno}, ${eventoAluno.id_evento})">Excluir</button>
              </td>
          `;
    eventoAlunoList.appendChild(eventoAlunoElement);
  });
}

function getEventoAlunos() {
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => displayEventoAluno(data))
    .catch(error => console.error('Erro:', error));
}

document.getElementById('addEventoAlunoForm').addEventListener('submit', function(event) {
  event.preventDefault();
  const alunoId1 = document.getElementById('eventoAlunoAlunoId').value;
  const id_aluno = parseInt(alunoId1)
  const eventoId1 = document.getElementById('eventoAlunoEventoId').value;
  const id_evento = parseInt(eventoId1)

  fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id_aluno: id_aluno,
      id_evento: id_evento
    })
  })
    .then(response => response.json())
    .then(data => {
      getEventoAlunos();
      document.getElementById('addEventoAlunoForm').reset();
    })
    .catch(error => console.error('Erro:', error));
});

function deleteEventoAluno(alunoId, eventoId) {
  fetch(`${apiUrl}/${alunoId}/${eventoId}`, {
    method: 'DELETE'
  })
    .then(response => response.json())
    .then(data => getEventoAlunos())
    .catch(error => console.error('Erro:', error));
}

getEventoAlunos();
