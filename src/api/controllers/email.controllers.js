const { sendReceiptEmail  } = require('../utils/mailer.config');

const sendEmail = async (req, res) => {

    console.log('>> sendEmail ')
    console.log('>> req.body ', req.body)


    try {
        sendReceiptEmail(req.body)
        res.status(200).send({'message' : 'todo correcto'})
    } catch (error) {
        res.status(500).send(error.message)
    }
    
};


module.exports = { sendEmail }