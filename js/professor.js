const apiUrlProfessor = 'http://localhost:3000/professores';

// リストを表示
function displayProfessor(professor) {
  const professorList = document.getElementById('professorList');
  professorList.innerHTML = '';
  professor.forEach(professor => {
    const professorElement = document.createElement('tr');
    professorElement.innerHTML = `
              <td>${professor.id_prof}</td>
              <td>${professor.nome_prof}</td>
              <td>${professor.cpf_prof}</td>
              <td>${professor.telefone_prof}</td>
              <td>${professor.email_consti_prof}</td>
              <td>${professor.email_pess_prof}</td>
              <td>${professor.nascimento_prof}</td>
              <td>${professor.endereco_prof}</td>
              <td>${professor.id_disciplina}</td>
              <td>${professor.id_escola}</td>
              <td>
                <button onclick="updateProfessor(${professor.id_prof})">Editar</button>
                <button onclick="deleteProfessor(${professor.id_prof})">Excluir</button>
              </td>
          `;
    professorList.appendChild(professorElement);
  });
}

// 取得
function getProfessor() {
  fetch(apiUrlProfessor)
    .then(response => response.json())
    .then(data => displayProfessor(data))
    .catch(error => console.error('Erro:', error));
}

// 追加
document.getElementById('addProfessorForm').addEventListener('submit', function (event) {
  event.preventDefault();
  const professorName = document.getElementById('professorName').value;
  // 他のフィールドを取得する必要があります

  fetch(apiUrlProfessor, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      nome_prof: professorName,
      // 他のフィールドを追加する必要があります
    })
  })
    .then(response => response.json())
    .then(data => {
      getProfessor();
      document.getElementById('addProfessorForm').reset();
    })
    .catch(error => console.error('Erro:', error));
});

// 更新
function updateProfessor(id) {
  fetch(`${apiUrlProfessor}/${id}`)
    .then(response => response.json())
    .then(data => {
      // フォームにデータをセットするための処理を追加する必要があります
    })
    .catch(error => console.error('Erro:', error));
}

// 実際に更新
document.getElementById('updateProfessorForm').addEventListener('submit', function (event) {
  event.preventDefault();
  const professorId = document.getElementById('editProfessorId').value;
  const professorName = document.getElementById('editProfessorName').value;
  // 他のフィールドを取得する必要があります

  fetch(`${apiUrlProfessor}/${professorId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      nome_prof: professorName,
      // 他のフィールドを追加する必要があります
    })
  })
    .then(response => response.json())
    .then(data => {
      getProfessor();
      document.getElementById('editProfessorForm').style.display = 'none';
    })
    .catch(error => console.error('Erro:', error));
});

// 削除ボタン
function deleteProfessor(id_prof) {
  fetch(`${apiUrlProfessor}/${id_prof}`, {
    method: 'DELETE'
  })
    .then(response => response.json())
    .then(data => getProfessor())
    .catch(error => console.error('Erro:', error));
}

getProfessor();
