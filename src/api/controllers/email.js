var nodemailer = require('nodemailer');
const dotenv = require("dotenv").config();

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASSWORD,
      clientId: process.env.OAUTH_CLIENTID,
      clientSecret: process.env.OAUTH_CLIENT_SECRET,
      refreshToken: process.env.OAUTH_REFRESH_TOKEN
    },
    tls: { rejectUnauthorized: false },
  });

  var mailOptions = {
    from: 'antonio.deldujo@gmail.com',
    to: 'anavarro67@hotmail.com',
    subject: 'Sending Email using Node.js',
    text: 'That was easy!'
  };

  console.log('Enviar email...')

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
    
  });


// const sendEmail = async (req, res) => {
//     try {
//         const plays = await Play.find().populate("company")
//         console.log(plays);
//         if (plays) {
//             return res.status(200).json(plays);
//         } else {
//             return res.status(404).send("No se encontraron registros")
//         }
//     } catch (error) {
//         res.status(500).send(error.message)
//     }
// };
