import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
        user: process.env.ETHEREAL_USER,
        pass: process.env.ETHEREAL_PASSWORD
    }
});

async function enviarEmail(email, token) {

    const link = `http://localhost:3000/api/verificarEmail?token=${token}`;

    const info = await transporter.sendMail({
        from: '"Cadastro Login" <no-reply@cadastro-login.com>',
        to: email,
        subject: 'Verifique seu e-mail',
        html: `
            <h2>Verificação de e-mail</h2>

            <p>Clique no botão abaixo para verificar seu e-mail:</p>

            <a href="${link}">
                Verificar e-mail
            </a>

            <p>Este link expira em 15 minutos.</p>
        `
    });

    console.log('Preview URL:', nodemailer.getTestMessageUrl(info));
}

export default {
    enviarEmail
};