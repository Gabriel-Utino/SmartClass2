const apiUrlAlunoResp = 'http://localhost:3000/aluno_resps';

// リストを表示
function displayAlunoResp(alunoResp) {
  const alunoRespList = document.getElementById('alunoRespList');
  alunoRespList.innerHTML = '';
  alunoResp.forEach(alunoResp => {
    const alunoRespElement = document.createElement('tr');
    alunoRespElement.innerHTML = `
              <td>${alunoResp.id_aluno}</td>
              <td>${alunoResp.id_resp}</td>
              <td>
                <button onclick="deleteAlunoResp(${alunoResp.id_aluno}, ${alunoResp.id_resp})">Excluir</button>
              </td>
          `;
    alunoRespList.appendChild(alunoRespElement);
  });
}

// 取得
function getAlunoResp() {
  fetch(apiUrlAlunoResp)
    .then(response => response.json())
    .then(data => displayAlunoResp(data))
    .catch(error => console.error('Erro:', error));
}

// 追加
document.getElementById('addAlunoRespForm').addEventListener('submit', function (event) {
  event.preventDefault();
  const alunoId1 = document.getElementById('alunoId').value;
  alunoId = parseInt(alunoId1)
  const respId1 = document.getElementById('respId').value;
  respId = parseInt(respId1)
  fetch(apiUrlAlunoResp, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id_aluno: alunoId,
      id_resp: respId
    })
  })
    .then(response => response.json())
    .then(data => {
      getAlunoResp();
      document.getElementById('addAlunoRespForm').reset();
    })
    .catch(error => console.error('Erro:', error));
});

// 削除
function deleteAlunoResp(alunoId, respId) {
  fetch(`${apiUrlAlunoResp}/${alunoId}/${respId}`, {
    method: 'DELETE'
  })
    .then(response => response.json())
    .then(data => getAlunoResp())
    .catch(error => console.error('Erro:', error));
}

getAlunoResp();
