// Inicializando o EmailJS com a Public Key
emailjs.init("fkfztg7tnUIuYD5Xd");

// Referenciando os elementos do formulário
const formulario = document.getElementById("formulario");
const botaoEnviar = document.getElementById("enviar");

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

// Função para enviar o e-mail
function enviarEmail() {
    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const celular = document.getElementById("celular").value.trim();
    const mensagem = document.getElementById("mensagem").value.trim();

    emailjs.send("service_wuynxzi", "template_ndky8es", {
        nome: nome,
        email: email,
        celular: celular,
        mensagem: mensagem
    })
    .then(() => {
        alert("Mensagem enviada com sucesso!");
        formulario.reset(); // Limpa os campos do formulário
    })
    .catch((error) => {
        console.error("Erro ao enviar o e-mail:", error);
        alert("Erro ao enviar a mensagem. Tente novamente.");
    });
}

// Adicionando o evento de clique no botão
botaoEnviar.addEventListener("click", function () {
    if (validarFormulario()) {
        enviarEmail();
    }
});

// Adicionando o evento de envio ao pressionar Enter
formulario.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault(); // Impede o comportamento padrão de envio
        if (validarFormulario()) {
            enviarEmail();
        }
    }
});
