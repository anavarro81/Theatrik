// Importa la biblioteca nodemailer
const nodemailer = require("nodemailer");

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
module.exports.sendEmail = () => {
    transporter // Utiliza el objeto de transporte para enviar el correo electrónico
        .sendMail({
            from: "ensayomailer@gmail.com", // Dirección de correo electrónico del remitente
            to: "yeray.dtc@gmail.com", // Dirección de correo electrónico del destinatario (usuario)
            subject: `Bienvenido a AGO !`, // Asunto del correo electrónico
            html: `
        <h3>Bienvenido a AGO, tu plataforma para encontrar todo lo que necesitas para tener una vida cómoda</h3>
        <p>Confirma tu mail pulsando el siguiente enlace </p>
        <p> Por favor, pulsa aquí para acceder a la cuenta premium  <button> Premium</button> </p>
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

// const nodemailer = require('nodemailer');

//  const transporter = nodemailer.createTransport({
//     host: "smtp.gmail.com.",
//     port: 465,
//     secure: true, // Use `true` for port 465, `false` for all other ports
//     auth: {
//         user: "ensayomailer@gmail.com",
//         pass: "xplibpqiexgwewih",
//     },
// });

// //promesa para comprobar que funciona
// transporter.verify().then(() => {
//     console.log("ready for send emails");
// });

// module.exports = transporter;



// const nodemailer = require("nodemailer");

// const transporter = nodemailer.createTransport({
//     host: "smtp.ethereal.email",
//     port: 465,
//     secure: false, // Use `true` for port 465, `false` for all other ports
//     auth: {
//         user: "ensayomailer@gmail.com",
//         pass: "xplibpqiexgwewih",
//     },
// });

// // async..await is not allowed in global scope, must use a wrapper
// async function main() {
//     // send mail with defined transport object
//     const info = await transporter.sendMail({
//         from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // sender address
//         to: "bar@example.com, baz@example.com", // list of receivers
//         subject: "Hello ✔", // Subject line
//         text: "Hello world?", // plain text body
//         html: "<b>Hello world?</b>", // html body
//     });

//     console.log("Message sent: %s", info.messageId);
//     // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
// }

// main().catch(console.error);
