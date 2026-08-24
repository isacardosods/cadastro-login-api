import { Resend } from 'resend';
import dotenv from 'dotenv';
dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

async function enviarEmail(email, token) {

    const link = `http://localhost:3000/api/verificarEmail?token=${token}`;

   const { data, error } = await resend.emails.send({
        from: 'Autenticação de cadastro <onboarding@resend.dev>', 
        to: ['isabella.csantos@sptech.school'],
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

    if (error) {
        console.error('Erro ao enviar e-mail:', error);
        throw new Error('Falha ao enviar e-mail de verificação');
    }

    console.log('E-mail enviado, id:', data.id);

    return data;
}

export default {
    enviarEmail
};