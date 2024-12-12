const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();  // Carrega variáveis do .env

const app = express();
app.use(cors({ origin: 'http://localhost:5500' }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header("X-Frame-Options", "DENY");
    res.header("X-XSS-Protection", "1; mode=block");
    res.header("X-Content-Type-Options", "nosniff");
    res.header("Referrer-Policy", "no-referrer");
    next();
});


app.get("/", (req, res) => {
    res.send("Servidor está funcionando!");
});

let formularioData = [];

app.post("/save", (req, res) => {
    const { nome, email, mensagem } = req.body;

    if (!nome || !email || !mensagem) {
        console.log("Erro: Campos obrigatórios estão faltando.");
        return res.status(400).json({ message: "Nome, E-mail e Mensagem são obrigatórios!" });
    }

    console.log("Dados recebidos:", { nome, email, mensagem });

    formularioData.push({ nome, email, mensagem });

    // Configuração do email
    const data = {
        service_id: process.env.SERVICE_ID,
        template_id: process.env.TEMPLATE_ID,
        user_id: process.env.USER_ID,
        template_params: {
            nome: nome,
            email: email,
            mensagem: mensagem
        }
    };

    // Enviar o email usando Axios para a API do EmailJS
    axios.post('https://api.emailjs.com/api/v1.0/email/send', data)
        .then(response => {
            console.log("Email enviado com sucesso:", response.data);
            res.json({ message: "Dados enviados com sucesso!", data: formularioData });
        })
        .catch(error => {
            console.error("Erro ao enviar o email:", error.response ? error.response.data : error.message);
            res.status(500).json({ message: "Ocorreu um erro ao enviar os dados. Tente novamente." });
        });
});

app.listen(3001, () => console.log("Servidor rodando na porta 3001"));
