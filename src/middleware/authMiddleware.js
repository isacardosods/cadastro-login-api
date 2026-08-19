import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

function autenticar(req, res, next) {

    const authorization = req.headers.authorization;

    if (!authorization) {
        return res.status(401).json({
            mensagem: 'Token não informado'
        });
    }

    const token = authorization.split(' ')[1];

    try {
        const payload = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.usuario = payload;

        next();

    } catch (erro) {

        return res.status(401).json({
            mensagem: 'Token inválido ou expirado'
        });
    }
}

export default autenticar;