import { Request, Response } from "express";
import { Sequelize } from "sequelize";

import Solicitud from "../models/solicitud";
import Usuario from "../models/usuario";

export const getSolicitud = async (req: Request, res: Response) => {
  const { id } = req.params;
  const usuario = await Usuario.findByPk(id);

  if (usuario) {
    const solicitud = await Solicitud.findAll({
      where: {
        id_empleado: id,
        deletedAt: null
      },
    });
    res.json(solicitud);
  } else {
    res.status(404).json({
      msg: `No existe un usuario con el id ${id}`,
    });
  }
};

export const createSolicitud = async (req: Request, res: Response) => {
  const { body } = req;
  try {
    const usuario = await Usuario.findByPk(body.id_empleado);
    if (usuario) {
      const solicitud = await Solicitud.create(body);
      res.json(solicitud);
    } else {
      res.status(404).json({
        msg: `No existe un usuario con el id ${body.id_empleado}`,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};

export const getSolicitudes = async (req: Request, res: Response) => {
  try {
    const solicitudes = await Solicitud.findAll({
      where: {
        deletedAt: null
      },
      include: [
        {
          model: Usuario,
          where: { id: Sequelize.col("solicitud.id_empleado")},
        },
      ],
      raw: true,
    });
    const response = solicitudes.map((item: any) => ({
      codigo: item?.codigo,
      descripcion: item?.descripcion,
      resumen: item?.resumen,
      usuario: item['usuario.nombre'] ?? ''
    }));
    res.json(response);
  } catch (error) {
    console.error("Error al obtener las solicitudes:", error);
    res.status(500).json({
      msg: "Ocurrió un error al obtener las solicitudes",
    });
  }
};

export const deleteSolicitud = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const solicitud = await Solicitud.findByPk(id);
    if (solicitud) {
      if (solicitud.get().deletedAt) {
        return res.status(401).json({
          msg: `La solicitud con el id ${id} ya ha sido eliminada.`,
        });
      }
      solicitud.update({deletedAt: new Date().toISOString()})
      res.json(solicitud);
    } else {
      res.status(404).json({
        msg: `No existe una solicitud con el id ${id}`,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};
