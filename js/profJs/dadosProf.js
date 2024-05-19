const apiUrlAluno = 'http://localhost:3000/alunos'

document.addEventListener("DOMContentLoaded", function () {
  const id_aluno = 1; // 表示したい学生のID
  const url = `${apiUrlAluno}/${id_aluno}`;

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(aluno => {
      // 取得したデータをHTMLに表示する
      document.getElementById('aluno-name').textContent = aluno.nome_aluno;
      document.getElementById('aluno-cpf').textContent = aluno.cpf_aluno;
      document.getElementById('aluno-address').textContent = aluno.endereco_aluno;
      document.getElementById('aluno-phone').textContent = aluno.telefone_aluno;
      document.getElementById('aluno-email').textContent = aluno.email_aluno;
      document.getElementById('aluno-dob').textContent = formatDate(aluno.nascimento_aluno);
      document.getElementById('aluno-ra').textContent = aluno.ra_aluno;
      document.getElementById('aluno-registration-date').textContent = formatDate(aluno.data_matricula);

      // 画像の表示
      const img = document.createElement('img');
      img.src = `data:image/jpeg;base64,${aluno.foto.toString('base64')}`;
      img.classList.add('img-fluid', 'rounded', 'mx-auto', 'd-block');
      img.alt = 'Aluno Photo';
      document.getElementById('aluno-photo').appendChild(img);
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
});

// 日付のフォーマット関数
function formatDate(dateString) {
  const date = new Date(dateString)
  const year = date.getUTCFullYear()
  const month = String(date.getUTCMonth() + 1).padStart(2, '0')
  const day = String(date.getUTCDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}