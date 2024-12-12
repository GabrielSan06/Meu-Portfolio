document.getElementById("formulario").addEventListener("submit", function(event) {
    event.preventDefault(); // Impede o envio do formulário, para validação

    // Captura os valores dos campos
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const mensagem = document.getElementById("mensagem").value;

    // Validação de nome, email e mensagem obrigatórios
    if (!nome || !email || !mensagem) {
        alert("Nome, E-mail e Mensagem são obrigatórios!");
        return;
    }

    // Envia os dados para o backend
    fetch("http://localhost:3001/save", {  // Aqui está a URL do backend
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email, mensagem })
    }).then(response => response.json())
      .then(data => {
          // Exibe a mensagem de sucesso
          document.getElementById("mensagem-sucesso").textContent = "Formulário enviado com sucesso!";
          document.getElementById("mensagem-sucesso").style.display = "block";
          document.getElementById("mensagem-erro").style.display = "none"; // Caso tenha erro anterior, oculta o erro

          // Limpa o formulário
          document.getElementById("formulario").reset();
      }).catch(error => {
          console.error("Erro ao enviar os dados:", error);
          // Exibe a mensagem de erro
          document.getElementById("mensagem-erro").textContent = "Ocorreu um erro ao enviar o formulário. Tente novamente.";
          document.getElementById("mensagem-erro").style.display = "block";
          document.getElementById("mensagem-sucesso").style.display = "none";
      });
});
