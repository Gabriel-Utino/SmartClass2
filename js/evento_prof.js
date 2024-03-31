const apiUrl = 'http://localhost:3000/evento_professors';

function displayEventoProfessor(eventoProfessor) {
  const eventoProfessorList = document.getElementById('eventoProfessorList');
  eventoProfessorList.innerHTML = '';
  eventoProfessor.forEach(eventoProfessor => {
    const eventoProfessorElement = document.createElement('tr');
    eventoProfessorElement.innerHTML = `
              <td>${eventoProfessor.id_prof}</td>
              <td>${eventoProfessor.id_evento}</td>
              <td>
                <button onclick="deleteEventoProfessor(${eventoProfessor.id_prof}, ${eventoProfessor.id_evento})">Excluir</button>
              </td>
          `;
    eventoProfessorList.appendChild(eventoProfessorElement);
  });
}

function getEventoProfessors() {
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => displayEventoProfessor(data))
    .catch(error => console.error('Erro:', error));
}

document.getElementById('addEventoProfessorForm').addEventListener('submit', function(event) {
  event.preventDefault();
  const professorId = document.getElementById('eventoProfessorProfessorId').value;
  const id_prof = parseInt(professorId)
  const eventoId = document.getElementById('eventoProfessorEventoId').value;
  const id_evento = parseInt(eventoId)

  fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id_prof: id_prof,
      id_evento: id_evento
    })
  })
    .then(response => response.json())
    .then(data => {
      getEventoProfessors();
      document.getElementById('addEventoProfessorForm').reset();
    })
    .catch(error => console.error('Erro:', error));
});

function deleteEventoProfessor(professorId, eventoId) {
  fetch(`${apiUrl}/${professorId}/${eventoId}`, {
    method: 'DELETE'
  })
    .then(response => response.json())
    .then(data => getEventoProfessors())
    .catch(error => console.error('Erro:', error));
}

getEventoProfessors();
