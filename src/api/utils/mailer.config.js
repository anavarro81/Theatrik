// Importa la biblioteca nodemailer
const nodemailer = require("nodemailer");
const dotenv = require("dotenv").config();
// require('dotenv').config();


// Obtiene la contraseña y la dirección de correo electrónico del entorno que estará en el .env
const EMAIL_MAIL = process.env.EMAIL_MAIL;
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;

// Crea un objeto de transporte utilizando la configuración proporcionada
const transporter = nodemailer.createTransport({
    service: "gmail", // Utiliza el servicio Gmail para enviar correos electrónicos
    auth: {
        user: EMAIL_MAIL, // Dirección de correo electrónico del remitente
        pass: EMAIL_PASSWORD, // Contraseña de la dirección de correo electrónico del remitente
    },
    tls: { rejectUnauthorized: false }, // Permite conexiones TLS sin autenticación
});
console.log(EMAIL_MAIL)

// Exporta una función para enviar correos electrónicos de recibos
module.exports.sendEmail = () => {
    transporter // Utiliza el objeto de transporte para enviar el correo electrónico
        .sendMail({
            from: EMAIL_MAIL, // Dirección de correo electrónico del remitente
            to: "yeray.dtc@gmail.com", // Dirección de correo electrónico del destinatario (usuario)
            subject: ` Reserva no confirmada.`, // Asunto del correo electrónico
            html: `
                <body style="font-family: Arial, sans-serif;">
                <h1 style="color: #333; font-size: 24px; margin-bottom: 20px;">Confirmación de reserva de entradas</h1>
                <p style="color: #333; font-size: 16px;">Se ha enviado un correo electrónico con su solicitud de entradas para la obra <strong>xxxx</strong> el día <strong>tal</strong> a las <strong>xxx</strong>. La reserva no está confirmada hasta que la asociación no se ponga en contacto a través de los medios indicados.</p>
                <p style="color: #333; font-size: 16px;">Si en unos días no recibe respuesta, por favor, póngase en contacto con ellos a través de <strong>{correo asociación}</strong> o <strong>{teléfono}</strong>.</p>
                <p style="color: #333; font-size: 16px;">Por favor, no realice una nueva reserva para evitar duplicados en las solicitudes.</p>
                <p style="color: #333; font-size: 16px;">¡Gracias!</p>
                <p style="color: #333; font-size: 16px;">¡Que disfrute de la obra!</p>
                </body>
            ` // Contenido HTML del correo electrónico
        })
        .then(() => { // Maneja el caso en que el correo electrónico se envíe correctamente
            console.log("email sent!"); // Registra un mensaje de éxito en la consola
        })
        .catch((err) => { // Maneja cualquier error que ocurra durante el envío del correo electrónico
            console.error("error sending email, ", err); // Registra3 un mensaje de error en la consola
        });
};

// Este código básicamente configura un objeto de transporte utilizando Nodemailer
//  y luego exporta una función llamada sendReceiptEmail, que utiliza ese objeto
//   de transporte para enviar un correo electrónico de bienvenida a un usuario dado.
//   El contenido del correo electrónico se construye con HTML.