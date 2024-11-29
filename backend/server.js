const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

// Carrega as variáveis de ambiente do arquivo .env
require('dotenv').config();

// Configuração do servidor
const app = express();
const port = process.env.PORT || 3000;

// Middleware para processar os dados do formlário
app.use(cors()); // Permite requisições de diferentes origens
app.use(bodyParser.json()); // Faz o parser dos dados JSON enviados no corpo da requisição
// app.use(bodyParser.urlencoded({extended: true }));

// Configuração do transporte do email com Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Rota para lidar com o envio do formulário
app.post("/enviar email", (req, res) => {
    const { nome, email, celular, mensagem } = req.body;

    const mailOptions = {
        from: process.env.EMAIL,
        to: process.env.EMAIL,
        subject: `Nova mensagem de ${nome}`,
        text: `Você recebeu uma nova mensagem do formulário de contato.
        
        Nome: ${nome}
        E-mail: ${email}
        Celular: ${celular}
        Mensagem: ${mensagem}`,
    };

    // Envia email usando nodemailer
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log("Erro ao enviar e-mail: ", error);
            return res.status(500).json({ status: 'error', message: 'Erro ao enviar o e-mail' });
        }
        console.log("Mensagem enviada: ",info.response);
        res.status(200).json({ status: 'success', message: 'Mensagem enviada com sucesso' });
    });
});

// Iniciando o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});