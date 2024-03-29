const apiUrlNotas = 'http://localhost:3000/notas';

// リストを表示
function displayNotas(notas) {
  const notasList = document.getElementById('notasList');
  notasList.innerHTML = '';
  notas.forEach(nota => {
    const notaElement = document.createElement('tr');
    notaElement.innerHTML = `
              <td>${nota.id_notas}</td>
              <td>${nota.id_aluno}</td>
              <td>${nota.id_disciplina}</td>
              <td>${nota.n1}</td>
              <td>${nota.AI}</td>
              <td>${nota.AP}</td>
              <td>${nota.faltas}</td>
              <td>${nota.periodo_letivo}</td>
              <td>
                <button onclick="deleteNota(${nota.id_notas})">Excluir</button>
              </td>
          `;
    notasList.appendChild(notaElement);
  });
}

// 取得
function getNotas() {
  fetch(apiUrlNotas)
    .then(response => response.json())
    .then(data => displayNotas(data))
    .catch(error => console.error('Erro:', error));
}

// 追加
document.getElementById('addNotaForm').addEventListener('submit', function (event) {
  event.preventDefault();
  const id_aluno = document.getElementById('alunoId').value;
  const id_disciplina = document.getElementById('disciplinaId').value;
  const n1 = document.getElementById('n1').value;
  const AI = document.getElementById('AI').value;
  const AP = document.getElementById('AP').value;
  const faltas = document.getElementById('faltas').value;
  const periodo_letivo = document.getElementById('periodo_letivo').value;

  fetch(apiUrlNotas, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id_aluno: id_aluno,
      id_disciplina: id_disciplina,
      n1: n1,
      AI: AI,
      AP: AP,
      faltas: faltas,
      periodo_letivo: periodo_letivo
    })
  })
    .then(response => response.json())
    .then(data => {
      getNotas();
      document.getElementById('addNotaForm').reset();
    })
    .catch(error => console.error('Erro:', error));
});

// 削除
function deleteNota(id_notas) {
  fetch(`${apiUrlNotas}/${id_notas}`, {
    method: 'DELETE'
  })
    .then(response => response.json())
    .then(data => getNotas())
    .catch(error => console.error('Erro:', error));
}

getNotas();
