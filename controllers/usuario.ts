import { Request, Response } from 'express';
import bcrypt from 'bcrypt';

import {generarJWT} from '../helpers/generar-jwt'
import Usuario from '../models/usuario';

export const getUsuarios = async( req: Request , res: Response ) => {

    const usuario = await Usuario.findAll();

    res.json({ usuario });
}

export const getUsuario = async( req: Request , res: Response ) => {

    const { id } = req.params;

    const usuario = await Usuario.findByPk( id );

    if( usuario ) {
        res.json(usuario);
    } else {
        res.status(404).json({
            msg: `No existe un usuario con el id ${ id }`
        });
    }
}

export const loginUsuario = async (req: Request, res: Response) => {
    const { correo, contrasena } = req.body;

    try {
        const usuario = await Usuario.findOne({
            where: {
                correo
            }
        });

        if (!usuario) {
            return res.status(400).json({
                msg: 'Usuario o contraseña incorrectos'
            });
        }
        const validPassword = await bcrypt.compare(contrasena, usuario.getDataValue('contrasena'));
        if (!validPassword) {
            return res.status(400).json({
                msg: 'Usuario o contraseña incorrectos'
            });
        }

        const token = await generarJWT( usuario.getDataValue('id') );

        res.json({
            msg: 'Inicio de sesión exitoso',
            token
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Hable con el administrador',
            error: error
        });
    }
}

export const createUsuario = async( req: Request , res: Response ) => {

    const { body } = req;

    try {
        
        const existeEmail = await Usuario.findOne({
            where: {
                correo: body.correo
            }
        });

        if (existeEmail) {
            return res.status(400).json({
                msg: 'Ya existe un usuario con el correo ' + body.correo
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(body.contrasena, salt);
        body.contrasena = hashedPassword;

        const usuario = await Usuario.create(body);
        res.json( usuario );


    } catch (error) {

        console.error(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        })    
    }
}

