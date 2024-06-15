import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

import Usuario from '../models/usuario';

export const validarJWT = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({ msg: 'No hay token en la petición' });
    }

    try {
        const jwtSecret = process.env.JWT_SECRET ?? ''
        const decoded = jwt.verify(token, jwtSecret) as JwtPayload;

        const usuario = await Usuario.findByPk(decoded.uid);

        if (!usuario) {
            return res.status(401).json({ msg: 'Token no válido - usuario no existe en la base de datos' });
        }

        next();
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            return res.status(401).json({ msg: 'Token expirado' });
        }
        console.error('Error al validar el token:', error);
        res.status(401).json({ msg: 'Token no válido' });
    }
};
