// Initialize datepicker
$(document).ready(function () {
  $('#professorBirthdate').datepicker({
    format: 'yyyy-mm-dd', // データベースに保存する形式に合わせて適切なフォーマットに設定します
    autoclose: true
  })
})
$(document).ready(function () {
  $('#editProfessorBirthdate').datepicker({
    format: 'yyyy-mm-dd', // データベースに保存する形式に合わせて適切なフォーマットに設定します
    autoclose: true
  })
})


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
  const professorName = document.getElementById('professorName').value
  const professorCPF = document.getElementById('professorCPF').value
  const professorPhone = document.getElementById('professorPhone').value
  const professorEmail = document.getElementById('professorEmail').value
  const professorPersonalEmail = document.getElementById('professorPersonalEmail').value
  const professorBirthdate = document.getElementById('professorBirthdate').value
  const professorAddress = document.getElementById('professorAddress').value
  const professorDisciplina = document.getElementById('professorDisciplina').value
  const professorEscola = document.getElementById('professorEscola').value


  fetch(apiUrlProfessor, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      nome_prof: professorName,
      cpf_prof : professorCPF,
      telefone_prof  : professorPhone,
      email_consti_prof: professorEmail,
      email_pess_prof: professorPersonalEmail,
      nascimento_prof: professorBirthdate,
      email_pass: professorAddress,
      endereco_prof: professorAddress,
      id_disciplina: professorDisciplina,
      id_escola: professorEscola
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
      document.getElementById('editProfessorId').value = data.id_prof
      document.getElementById('editProfessorName').value = data.nome_prof
      document.getElementById('editProfessorCPF').value = data.cpf_prof
      document.getElementById('editProfessorPhone').value = data.telefone_prof
      document.getElementById('editProfessorEmail').value = data.email_consti_prof
      document.getElementById('editProfessorPersonalEmail').value = data.email_pess_prof
      
      document.getElementById('editProfessorBirthdate').value = data.nascimento_prof
      document.getElementById('editProfessorAddress').value = data.endereco_prof
      document.getElementById('editProfessorDisciplina').value = data.id_disciplina
      document.getElementById('editProfessorEscola').value = data.id_escola
    })
    .catch(error => console.error('Erro:', error));
}

// 実際に更新
document.getElementById('updateProfessorForm').addEventListener('submit', function (event) {
  event.preventDefault();
  const professorId = document.getElementById('editProfessorId').value
  const professorName = document.getElementById('editProfessorName').value
  const professorCPF = document.getElementById('editProfessorCPF').value
  const professorPhone = document.getElementById('editProfessorPhone').value
  const professorEmail = document.getElementById('editProfessorEmail').value
  const professorPersonalEmail = document.getElementById('editProfessorPersonalEmail').value
  const professorBirthdate = document.getElementById('editProfessorBirthdate').value
  const professorAddress = document.getElementById('editProfessorAddress').value
  const professorDisciplina = document.getElementById('editProfessorDisciplina').value
  const professorEscola = document.getElementById('editProfessorEscola').value
  // 他のフィールドを取得する必要があります

  fetch(`${apiUrlProfessor}/${professorId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      nome_prof: professorName,
      cpf_prof : professorCPF,
      telefone_prof  : professorPhone,
      email_consti_prof: professorEmail,
      email_pess_prof: professorPersonalEmail,
      nascimento_prof: professorBirthdate,
      email_pass: professorAddress,
      endereco_prof: professorAddress,
      id_disciplina: professorDisciplina,
      id_escola: professorEscola
    })
  })
    .then(response => response.json())
    .then(data => {
      getProfessor();
      cancelEdit();
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


function cancelEdit() {
  document.getElementById('updateProfessorForm').reset()
}
