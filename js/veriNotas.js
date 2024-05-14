const apiUrlNotasFaltas = 'http://localhost:3000/notas_faltas'
const apiUrlDisciplina = 'http://localhost:3000/disciplinas'
const apiUrlAluno = 'http://localhost:3000/alunos'

function displayNota(nota) {
  const notaList = document.getElementById('notaList')
  notaList.innerHTML = ''
  nota.forEach(nota => {
    // Escolaの情報を取得
    fetch(`${apiUrlDisciplina}/${nota.id_disciplina}`)
      .then(response => response.json())
      .then(disciplina => {
        const notaElement = document.createElement('tr')
        notaElement.innerHTML = `
              <td>${nota.id_notas_faltas}</td>
              <td>${disciplina.disciplina}</td>
              <td>${nota.N1}</td>
              <td>${nota.AI}</td>
              <td>${nota.AP}</td>
              <td>${nota.academic_year}</td>
              <td>${nota.semestre}</td>
          `
        notaList.appendChild(notaElement)
      })
      .catch(error => console.error('Erro:', error))
  })
}

function getNotasByAluno() {
  // ログインした生徒のIDを取得する処理が必要 loginUserID
  const id_aluno = 1
  fetch(`${apiUrlAluno}/${id_aluno}`)
    .then(response => response.json())
    .then(aluno => {
      // ログインした生徒のIDを使用して、その生徒の成績や欠席情報を取得するリクエストを送信
      fetch(`${apiUrlAluno}/${id_aluno}/notas_faltas`)
        .then(response => response.json())
        .then(data => {
          notas = data;
          displayNota(notas)
          console.log(notas)
        })
        .catch(error => console.error('Erro:', error))
    })
    .catch(error => console.error('Erro:', error))
}

// ラジオボタンの変更時にリストをソートする関数
function sortList() {
  const sortValue = document.querySelector('input[name="sort"]:checked').value
  const sortedNotas = notas.sort((a, b) => {
    if (sortValue === 'disciplina') {
      // 数値として比較
      return a.id_disciplina - b.id_disciplina;
    } else {
      // その他の場合は文字列として比較
      return a[sortValue] - b[sortValue];
    }
  })
  displayNota(sortedNotas)
}


// ラジオボタンの変更イベントを監視し、ソートする関数を呼び出す
const radioButtons = document.querySelectorAll('input[name="sort"]')
radioButtons.forEach(button => {
  button.addEventListener('change', sortList)
})

getNotasByAluno()

/* function getNotas() {
  fetch(apiUrlNotasFaltas)
    .then(response => response.json())
    .then(data => displayNota(data))
    .catch(error => console.error('Erro:', error));
} 
getNotas()*/

// 日付のフォーマット関数
function formatDate(dateString) {
  const date = new Date(dateString)
  const year = date.getUTCFullYear()
  const month = String(date.getUTCMonth() + 1).padStart(2, '0')
  const day = String(date.getUTCDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}
