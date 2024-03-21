const Play = require('../models/play.models')
require("dotenv").config();
const transporter = require("../utils/mailer.config")


const getAllPlays = async (req, res) => {
    try {
        const plays = await Play.find()
        console.log(plays);
        if (plays) {
            return res.status(200).json(plays);
        } else {
            return res.status(404).send("No se encontraron registros")
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
};


const sendEmail = async (req, res) => {
    try {
        const { email } = req.params; // Obtener el parámetro de la ruta
        const { emails } = req.body; // Obtener las direcciones de correo electrónico del cuerpo de la solicitud
        const toEmails = emails ? emails.join(',') : email; // Si se proporciona un array de correos electrónicos en el cuerpo de la solicitud, úsalos. De lo contrario, utiliza el correo electrónico de la ruta.

        /*
        Esto  es para el body de la ruta en postman por si queremos enviar varios emails
            {
            "emails": ["correo1@example.com", "correo2@example.com", "correo3@example.com"]
            }
        */

        const result = await transporter.sendMail({
            from: `Theatrix entradas ${process.env.EMAIL_MAIL}`,
            to: toEmails,
            subject: "Reserva no confirmada.",
            html: `
                <body style="font-family: Arial, sans-serif;">
                <h1 style="color: #333; font-size: 24px; margin-bottom: 20px;">Confirmación de reserva de entradas</h1>
                <p style="color: #333; font-size: 16px;">Se ha enviado un correo electrónico con su solicitud de entradas para la obra <strong>xxxx</strong> el día <strong>tal</strong> a las <strong>xxx</strong>. La reserva no está confirmada hasta que la asociación no se ponga en contacto a través de los medios indicados.</p>
                <p style="color: #333; font-size: 16px;">Si en unos días no recibe respuesta, por favor, póngase en contacto con ellos a través de <strong>{correo asociación}</strong> o <strong>{teléfono}</strong>.</p>
                <p style="color: #333; font-size: 16px;">Por favor, no realice una nueva reserva para evitar duplicados en las solicitudes.</p>
                <p style="color: #333; font-size: 16px;">¡Gracias!</p>
                <p style="color: #333; font-size: 16px;">¡Que disfrute de la obra!</p>
                </body>
                `
        })
        console.log({ result })
        res.status(200).json({ ok: true, message: "Código enviado con éxito!" })
    } catch (error) {
        res.status(500).send(error.message)
    }
};

// Obtener obra por ID y aqui añadimos el envio del email para el front una vez el usuario seleccione el cartel
const getPlaybyID = async (req, res) => {
    try {
        const { id } = req.params;
        const selectedPlay = await Play.findById(id)
        if (!selectedPlay) {
            return res.status(404).json({ message: `No encontrada la obra con id: ${id}` })
        }
        return res.status(200).json(selectedPlay)
    } catch (error) {
        return res.status(500).json(error);
    }
};

// Eliminar obra por ID
const deletePlay = async (req, res) => {
    try {

        const { id } = req.params
        const deletedPlay = await Play.findByIdAndDelete(id)

        if (!deletedPlay) {
            return res.status(404).json({ message: 'No encontrada la obra' })
        } else {
            return res.status(200).json(deletedPlay)
        }

    } catch (error) {
        console.log('error al borrar la obra: ', error);
        return res.status(500).json(error)
    }
};

//Actualizar la información de una obra ya existente en la colección, identificada por su ID
const putPlay = async (req, res) => {
    try {
        const { id } = req.params;
        const putPlay = new Play(req.body);
        putPlay._id = id;

        const updatedPlay = await Play.findByIdAndUpdate(id, putPlay, {
            new: true,
        });

        if (!updatedPlay) {
            return res.status(404).json({ message: "This id doesn't exist" });
        }
        return res.status(200).json(updatedPlay);

    } catch (error) {
        return res.status(500).json(error.message);
    }
};

//Añadir una nueva obra a la colección
const postPlay = async (req, res) => {
    try {
        const newPlay = new Play(req.body);

        if (req.file.path) {
            newPlay.cartel = req.file.path;
        }

        const createdPlay = await newPlay.save()
        return res.status(201).json(createdPlay)

    } catch (error) {
        return res.status(500).json(error.message)
    }
};

module.exports = { getAllPlays, getPlaybyID, putPlay, postPlay, deletePlay, sendEmail };