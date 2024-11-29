// Referenciando o formulário
const formulario = document.getElementById("formulario");

// Função para validar os campos
function validarFormulario() {
    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const mensagem = document.getElementById("mensagem").value.trim();

    if (!nome || !email || !mensagem) {
        alert("Por favor, preencha todos os campos obrigatórios!");
        return false;
    }
    return true;
}

// Função para enviar o formulário via fetch
function enviarFormulario() {
    if (validarFormulario()) {
        // Obtendo os valores dos campos
        const nome = document.getElementById("nome").value.trim();
        const email = document.getElementById("email").value.trim();
        const celular = document.getElementById("celular").value.trim();
        const mensagem = document.getElementById("mensagem").value.trim();

        // Enviando os dados para o backend
        fetch('http://localhost:3000/enviar-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nome: nome,
                email: email,
                celular: celular,
                mensagem: mensagem
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === "success") {
                alert("Mensagem enviada com sucesso!");
                formulario.reset(); // Limpa os campos do formulário
            } else {
                alert("Erro ao enviar a mensagem. Tente novamente.");
            }
        })
        .catch(error => {
            console.error("Erro:", error);
            alert("Erro ao enviar a mensagem. Tente novamente.");
        });
    }
}

// Adicionando evento de clique no botão de envio
const botaoEnviar = document.querySelector("input[type='submit']");
botaoEnviar.addEventListener("click", function(event) {
    event.preventDefault(); // Impede o envio automático do formulário
    enviarFormulario();
});
