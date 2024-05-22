document.getElementById("loginForm").addEventListener("submit", async function(event) {
  event.preventDefault();
  
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
      const response = await fetch("login.php", {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify({ email, password })
      });
      
      const data = await response.json();
      if (response.ok) {
          // Redirect user to appropriate page based on role
          if (data.role === "Professor") {
              window.location.href = `../prof/homeProf.html?id=${data.id}`;
          } else if (data.role === "Aluno") {
              window.location.href = `../alunos/home.html?id=${data.id}`;
          } else if (data.role === "Responsavel") {
              window.location.href = `../resp/homeResp.html?id=${data.id}`;
          }
      } else {
          document.getElementById("message").innerText = data.message;
      }
  } catch (error) {
      console.error("Error:", error);
  }
});
