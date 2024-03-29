const apiUrlResponsavel = 'http://localhost:3000/responsaveis';

// リストを表示
function displayResponsavel(responsavel) {
  const responsavelList = document.getElementById('responsavelList');
  responsavelList.innerHTML = '';
  responsavel.forEach(responsavel => {
    const responsavelElement = document.createElement('tr');
    responsavelElement.innerHTML = `
              <td>${responsavel.id_resp}</td>
              <td>${responsavel.nome_pesp}</td>
              <td>${responsavel.cpf_resp}</td>
              <td>${responsavel.endereco_pesp}</td>
              <td>${responsavel.telefone_pesp}</td>
              <td>${responsavel.email_pesp}</td>
              <td>${responsavel.id_escola}</td>
              <td>
                <button onclick="updateResponsavel(${responsavel.id_resp})">Editar</button>
                <button onclick="deleteResponsavel(${responsavel.id_resp})">Excluir</button>
              </td>
          `;
    responsavelList.appendChild(responsavelElement);
  });
}

// 取得
function getResponsavel() {
  fetch(apiUrlResponsavel)
    .then(response => response.json())
    .then(data => displayResponsavel(data))
    .catch(error => console.error('Erro:', error));
}

// 追加
document.getElementById('addResponsavelForm').addEventListener('submit', function (event) {
  event.preventDefault();
  const responsavelName = document.getElementById('responsavelName').value;
  const responsavelCpf = document.getElementById('responsavelCpf').value;
  const responsavelEndereco = document.getElementById('responsavelEndereco').value;
  const responsavelTelefone = document.getElementById('responsavelTelefone').value;
  const responsavelEmail = document.getElementById('responsavelEmail').value;
  const responsavelIdEscola = document.getElementById('responsavelIdEscola').value;

  fetch(apiUrlResponsavel, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      nome_pesp: responsavelName,
      cpf_resp: responsavelCpf,
      endereco_pesp: responsavelEndereco,
      telefone_pesp: responsavelTelefone,
      email_pesp: responsavelEmail,
      id_escola: responsavelIdEscola
    })
  })
    .then(response => response.json())
    .then(data => {
      getResponsavel();
      document.getElementById('addResponsavelForm').reset();
    })
    .catch(error => console.error('Erro:', error));
});

// 更新
function updateResponsavel(id) {
  fetch(`${apiUrlResponsavel}/${id}`)
    .then(response => response.json())
    .then(data => {
      document.getElementById('editResponsavelId').value = data.id_resp;
      document.getElementById('editResponsavelName').value = data.nome_pesp;
      document.getElementById('editResponsavelCpf').value = data.cpf_resp;
      document.getElementById('editResponsavelEndereco').value = data.endereco_pesp;
      document.getElementById('editResponsavelTelefone').value = data.telefone_pesp;
      document.getElementById('editResponsavelEmail').value = data.email_pesp;
      document.getElementById('editResponsavelIdEscola').value = data.id_escola;
    })
    .catch(error => console.error('Erro:', error));
}

// 実際に更新
document.getElementById('updateResponsavelForm').addEventListener('submit', function (event) {
  event.preventDefault();
  const responsavelId = document.getElementById('editResponsavelId').value;
  const responsavelName = document.getElementById('editResponsavelName').value;
  const responsavelCpf = document.getElementById('editResponsavelCpf').value;
  const responsavelEndereco = document.getElementById('editResponsavelEndereco').value;
  const responsavelTelefone = document.getElementById('editResponsavelTelefone').value;
  const responsavelEmail = document.getElementById('editResponsavelEmail').value;
  const responsavelIdEscola = document.getElementById('editResponsavelIdEscola').value;

  fetch(`${apiUrlResponsavel}/${responsavelId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      nome_pesp: responsavelName,
      cpf_resp: responsavelCpf,
      endereco_pesp: responsavelEndereco,
      telefone_pesp: responsavelTelefone,
      email_pesp: responsavelEmail,
      id_escola: responsavelIdEscola
    })
  })
    .then(response => response.json())
    .then(data => {
      getResponsavel();
      document.getElementById('editResponsavelForm').style.display = 'none';
    })
    .catch(error => console.error('Erro:', error));
});

// 削除ボタン
function deleteResponsavel(id_resp) {
  fetch(`${apiUrlResponsavel}/${id_resp}`, {
    method: 'DELETE'
  })
    .then(response => response.json())
    .then(data => getResponsavel())
    .catch(error => console.error('Erro:', error));
}

getResponsavel();
