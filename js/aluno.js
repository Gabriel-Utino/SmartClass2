const apiUrlAluno = 'http://localhost:3000/alunos'

// リストを表示
function displayAluno(aluno) {
  const alunoList = document.getElementById('alunoList')
  alunoList.innerHTML = ''
  aluno.forEach(aluno => {
    const alunoElement = document.createElement('tr')
    alunoElement.innerHTML = `
              <td>${aluno.id_aluno}</td>
              <td>${aluno.nome_aluno}</td>
              <td>${aluno.cpf_aluno}</td>
              <td>${aluno.endereco_aluno}</td>
              <td>${aluno.telefone_aluno}</td>
              <td>${aluno.email_aluno}</td>
              <td>${formatDate(aluno.nascimento_aluno)}</td>
              <td>${aluno.ra_aluno}</td>
              <td>${formatDate(aluno.date_matricula)}</td>
              <td>
                <button onclick="updateAluno(${aluno.id_aluno})">Editar</button>
                <button onclick="deleteAluno(${aluno.id_aluno})">Excluir</button>
              </td>
          `
    alunoList.appendChild(alunoElement)
  })
}

// 取得
function getAluno() {
  fetch(apiUrlAluno)
    .then(response => response.json())
    .then(data => displayAluno(data))
    .catch(error => console.error('Erro:', error))
}

// 追加
document.getElementById('addAlunoForm').addEventListener('submit', function (event) {
  event.preventDefault()
  const alunoName = document.getElementById('alunoName').value
  const alunoCpf = document.getElementById('alunoCpf').value
  const alunoEndereco = document.getElementById('alunoEndereco').value
  const alunoTelefone = document.getElementById('alunoTelefone').value
  const alunoEmail = document.getElementById('alunoEmail').value
  const alunoNascimento = document.getElementById('alunoNascimento').value
  const alunoRa = document.getElementById('alunoRa').value
  const alunoDateMatricula = document.getElementById('alunoDateMatricula').value

  fetch(apiUrlAluno, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      nome_aluno: alunoName,
      cpf_aluno: alunoCpf,
      endereco_aluno: alunoEndereco,
      telefone_aluno: alunoTelefone,
      email_aluno: alunoEmail,
      nascimento_aluno: alunoNascimento,
      ra_aluno: alunoRa,
      date_matricula: alunoDateMatricula
    })
  })
    .then(response => response.json())
    .then(data => {
      getAluno()
      document.getElementById('addAlunoForm').reset()
    })
    .catch(error => console.error('Erro:', error))
})

// 更新
function updateAluno(id) {
  fetch(`${apiUrlAluno}/${id}`)
    .then(response => response.json())
    .then(data => {

      // 日付のフォーマット
      const formattedBirthDate = formatDate(data.nascimento_aluno)
      const formattedMatricDate = formatDate(data.date_matricula)

      // フォームにデータを設定
      document.getElementById('editAlunoId').value = data.id_aluno
      document.getElementById('editAlunoName').value = data.nome_aluno
      document.getElementById('editAlunoCpf').value = data.cpf_aluno
      document.getElementById('editAlunoEndereco').value = data.endereco_aluno
      document.getElementById('editAlunoTelefone').value = data.telefone_aluno
      document.getElementById('editAlunoEmail').value = data.email_aluno
      document.getElementById('editAlunoNascimento').value = formattedBirthDate
      document.getElementById('editAlunoRa').value = data.ra_aluno
      document.getElementById('editAlunoDateMatricula').value = formattedMatricDate
    })
    .catch(error => console.error('Erro:', error))
}

// 実際に更新
document.getElementById('updateAlunoForm').addEventListener('submit', function (event) {
  event.preventDefault()
  const alunoId = document.getElementById('editAlunoId').value
  const alunoName = document.getElementById('editAlunoName').value
  const alunoCpf = document.getElementById('editAlunoCpf').value
  const alunoEndereco = document.getElementById('editAlunoEndereco').value
  const alunoTelefone = document.getElementById('editAlunoTelefone').value
  const alunoEmail = document.getElementById('editAlunoEmail').value
  const alunoNascimento = document.getElementById('editAlunoNascimento').value
  const alunoRa = document.getElementById('editAlunoRa').value
  const alunoDateMatricula = document.getElementById('editAlunoDateMatricula').value

  // 日付のフォーマット
  const formattedNascimento = formatDate(alunoNascimento)
  const formattedDateMatricula = formatDate(alunoDateMatricula)

  fetch(`${apiUrlAluno}/${alunoId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      nome_aluno: alunoName,
      cpf_aluno: alunoCpf,
      endereco_aluno: alunoEndereco,
      telefone_aluno: alunoTelefone,
      email_aluno: alunoEmail,
      nascimento_aluno: formattedNascimento,
      ra_aluno: alunoRa,
      date_matricula: formattedDateMatricula
    })
  })
    .then(response => response.json())
    .then(data => {
      getAluno() // データを再読み込み
      document.getElementById('editAlunoForm').style.display = 'none' // フォームを非表示にする
    })
    .catch(error => console.error('Erro:', error))
})

// 削除ボタン
function deleteAluno(id_aluno) {
  fetch(`${apiUrlAluno}/${id_aluno}`, {
    method: 'DELETE'
  })
    .then(response => response.json())
    .then(data => getAluno())
    .catch(error => console.error('Erro:', error))
}

// 日付のフォーマット関数
function formatDate(dateString) {
  const date = new Date(dateString)
  const year = date.getUTCFullYear()
  const month = String(date.getUTCMonth() + 1).padStart(2, '0')
  const day = String(date.getUTCDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

getAluno()

// 編集キャンセル
function cancelEdit() {
  document.getElementById('updateAlunoForm').reset()
}
