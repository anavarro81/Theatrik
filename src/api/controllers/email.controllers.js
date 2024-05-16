const sendEmail = async (req, res) => {

    console.log('>> sendEmail ')
    console.log('>> req.body ', req.body)


    // try {
    // } catch (error) {
    //     res.status(500).send(error.message)
    // }
    res.status(200).send({'message' : 'todo correcto'})
};


module.exports = { sendEmail }