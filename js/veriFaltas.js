const apiUrlNotasFaltas = 'http://localhost:3000/notas_faltas';
const apiUrlDisciplina = 'http://localhost:3000/disciplinas';
const apiUrlAluno = 'http://localhost:3000/alunos';

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
              <td>${nota.id_aluno}</td>
              <td>${nota.faltas}</td>
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
  const id_aluno = 1;
  fetch(`${apiUrlAluno}/${id_aluno}`)
    .then(response => response.json())
    .then(aluno => {
      // ログインした生徒のIDを使用して、その生徒の成績や欠席情報を取得するリクエストを送信
      fetch(`${apiUrlAluno}/${id_aluno}/notas_faltas`)
        .then(response => response.json())
        .then(data => displayNota(data))
        .catch(error => console.error('Erro:', error));
    })
    .catch(error => console.error('Erro:', error));
}


// セレクトボックスの要素を取得
const sortCriteriaSelect = document.getElementById('sortCriteria');

// セレクトボックスの選択肢が変更されたときに呼び出される関数
sortCriteriaSelect.addEventListener('change', () => {
  // 選択されたソート基準を取得
  const sortCriteria = sortCriteriaSelect.value;
  // 選択された基準でリストをソートする関数を呼び出す
  sortNotasByCriteria(sortCriteria);
});

// リストを指定された基準でソートする関数
function sortNotasByCriteria(criteria) {
  const sortedNotas = nota.slice().sort((a, b) => {
    // 数値であるかどうかをチェックし、ソートを行う
    return isFinite(a[criteria]) && isFinite(b[criteria]) ? a[criteria] - b[criteria] : 0;
  });
  // ソートされたリストを表示する
  displayNota(sortedNotas);
}



getNotasByAluno();

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
