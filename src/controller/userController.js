import dotenv from 'dotenv'; dotenv.config();
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userModel from '../model/userModel.js';
import empresaModel from '../model/empresaModel.js';
import crypto from 'crypto';
import verificacaoModel from '../model/verificacaoModel.js';
import emailService from '../service/emailService.js';

async function cadastrar(req, res) {
    try {
        const {
            nome,
            email_institucional,
            cpf,
            dtNascimento,
            senha
        } = req.body;

        const dominio = email_institucional.split('@')[1];
        const empresa = await empresaModel.buscarDominio(dominio);

        if (!empresa) {
            return res.status(404).json({
                mensagem: 'Domínio da empresa não encontrado'
            });
        }

        const senhaHash = await bcrypt.hash(senha, 10);

        const resultado = await userModel.cadastrar(
            nome,
            email_institucional,
            cpf,
            dtNascimento,
            senhaHash,
            empresa.id_empresa
        );

        const token = crypto.randomBytes(32).toString('hex');

        const dt_expiracao = new Date(
            Date.now() + 15 * 60 * 1000
        );

        await verificacaoModel.criarToken(
            token,
            dt_expiracao,
            resultado.insertId
        );

        await emailService.enviarEmail(
            email_institucional,
            token
        );

        res.status(201).json({
            mensagem: 'Usuário cadastrado com sucesso'
        });

    } catch (erro) {

        console.error(erro);

        res.status(500).json({
            mensagem: 'Erro ao cadastrar usuário'
        });
    }
}

async function buscarPorId(req, res) {
    try {
        const id = req.params.id;

        const usuario = await userModel.buscarPorId(id);

        if (!usuario) {
            return res.status(404).json({
                mensagem: 'Usuário não encontrado'
            });
        }

        res.status(200).json(usuario);

    } catch (erro) {

        console.error(erro);

        res.status(500).json({
            mensagem: 'Erro ao buscar usuário'
        });
    }
}

async function login(req, res) {
    try {
        const {
            email_institucional,
            senha
        } = req.body;

        const usuario = await userModel.buscarPorEmail(email_institucional);

        if (!usuario) {
            return res.status(401).json({
                mensagem: 'E-mail ou senha inválidos'
            });
        }

        const senhaValida = await bcrypt.compare(
            senha,
            usuario.senha
        );

        if (!senhaValida) {
            return res.status(401).json({
                mensagem: 'E-mail ou senha inválidos'
            });
        }

        console.log(usuario);
        console.log('verificado:', usuario.verificado);

        if (!usuario.verificado) {
            return res.status(403).json({
                mensagem: 'E-mail ainda não verificado'
            });
        }

        const token = jwt.sign(
            {
                id_usuario: usuario.id_usuario,
                fk_empresa: usuario.fk_empresa
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '24h'
            }
        );

        return res.status(200).json({
            mensagem: 'Login realizado com sucesso',
            token
        });

    } catch (erro) {

        console.error(erro);

        res.status(500).json({
            mensagem: 'Erro ao tentar login'
        });
    }
}

export default {
    cadastrar, buscarPorId, login
};
