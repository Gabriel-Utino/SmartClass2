const apiUrl = 'http://localhost:3000/escolas'

// リストを表示
function displayEscola(escola) {
  const escolaList = document.getElementById('escolaList')
  escolaList.innerHTML = ''
  escola.forEach(escola => {
    const escolaElement = document.createElement('tr')
    escolaElement.innerHTML = `
              <td>${escola.id_escola}</td>
              <td>${escola.nome_escola}</td>
              <td>${escola.email_escola}</td>
              <td>
                <button onclick="updateEscola(${escola.id_escola})">Editar</button>
                <button onclick="deleteEscola(${escola.id_escola})">Excluir</button>
              </td>
          `
    escolaList.appendChild(escolaElement)
  })
}

// 取得
function getEscola() {
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => displayEscola(data))
    .catch(error => console.error('Erro:', error))
}

// 追加
document.getElementById('addEscolaForm').addEventListener('submit', function (event) {
  event.preventDefault()
  const escolaName = document.getElementById('escolaName').value
  const escolaEmail = document.getElementById('escolaEmail').value

  fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      nome_escola: escolaName,
      email_escola: escolaEmail
    })
  })
    .then(response => response.json())
    .then(data => {
      getEscola()
      document.getElementById('addEscolaForm').reset()
    })
    .catch(error => console.error('Erro:', error))
})

// 更新
function updateEscola(id) {
  fetch(`${apiUrl}/${id}`)
    .then(response => response.json())
    .then(data => {
      document.getElementById('editEscolaId').value = data.id_escola
      document.getElementById('editEscolaName').value = data.nome_escola
      document.getElementById('editEscolaEmail').value = data.email_escola
    })
    .catch(error => console.error('Erro:', error))
}

// 実際に更新
document.getElementById('updateEscolaForm').addEventListener('submit', function (event) {
  event.preventDefault()
  const escolaId = document.getElementById('editEscolaId').value
  const escolaName = document.getElementById('editEscolaName').value
  const escolaEmail = document.getElementById('editEscolaEmail').value

  fetch(`${apiUrl}/${escolaId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      nome_escola: escolaName,
      email_escola: escolaEmail
    })
  })
    .then(response => response.json())
    .then(data => {
      getEscola()
      document.getElementById('editEscolaForm').style.display = 'none'
    })
    .catch(error => console.error('Erro:', error))
})

// 削除ボタン
function deleteEscola(id_escola) {
  fetch(`${apiUrl}/${id_escola}`, {
    method: 'DELETE'
  })
    .then(response => response.json())
    .then(data => getEscola())
    .catch(error => console.error('Erro:', error))
}

getEscola()

function cancelEdit() {
  document.getElementById('updateEscolaForm').reset()
}
