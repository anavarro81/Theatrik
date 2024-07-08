// Importa la biblioteca nodemailer
const nodemailer = require("nodemailer");
const dotenv = require("dotenv").config();

// Obtiene la contraseña y la dirección de correo electrónico del entorno que estará en el .env
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;
const EMAIL_MAIL = process.env.EMAIL_MAIL;

// Crea un objeto de transporte utilizando la configuración proporcionada
const transporter = nodemailer.createTransport({
    service: "gmail", // Utiliza el servicio Gmail para enviar correos electrónicos
    auth: {
        user: EMAIL_MAIL, // Dirección de correo electrónico del remitente
        pass: EMAIL_PASSWORD, // Contraseña de la dirección de correo electrónico del remitente
    },
    tls: { rejectUnauthorized: false }, // Permite conexiones TLS sin autenticación
});

// Exporta una función para enviar correos electrónicos de recibos
module.exports.sendReceiptEmail = (data) => {

    "Has solicitado x entradas para ir a ver xx el dia xx a las xx de la asociacion xx"

    "La confirmación de la reserva la tiene que realizar las asociación. Ellos se pondran en contacto contigo en breve para ello."

    console.log('>> EMAIL_MAIL : ', EMAIL_MAIL)
    console.log('>> EMAIL_PASSWORD >> : ', EMAIL_PASSWORD)

    transporter // Utiliza el objeto de transporte para enviar el correo electrónico
        .sendMail({
            from: "iron.learning.welcomer@gmail.com", // Dirección de correo electrónico del remitente
            //to: user.email, // Dirección de correo electrónico del destinatario (usuario)
            to: data.email,
            //subject: `Bienvenido a AGO ${user.name}!`, // Asunto del correo electrónico
            subject: `Confirmación de solicitud de entradas para ${data.tittle}`, // Asunto del correo electrónico
            html: `

        <p> Hola, ${data.fullName} </p>

        <p>  Tu solicitud se ha realizado con éxito. </p>

        <h2> Detalles de la solicitud </h2>

        <ul>
            <li> Numero de entradas: ${data.numTickets} </li>
            <li> Fecha: ${data.date} </li>
            <li> Teatro: ${data.place} </li>
            <li> Asociación: ${data.company} </li>        
        </ul>

        <p> 
        Tu solicitud todavia no está confirmada. 
        La asociación que representa la obra se pondrá en contacto contigo lo antes posible para confirmar tu reserva. 
        Puedes ponerte en contacto con ellos en el siguiente correo. <correo asociación> 
        </p>              
        
        
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

