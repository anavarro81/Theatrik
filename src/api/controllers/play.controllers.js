const Play = require('../models/play.models')

async function getAllPlays(req, res) {
    try {
        const plays = await Play.find()
        console.log(plays);
        if(plays) {
            return res.status(200).json(plays);
        } else {
            return res.status(404).send("No se encontraron registros")
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
}

//Actualizar la información de una obra ya existente en la colección, identificada por su ID
const putPlay = async (req, res) => {
    try {
        const {id} = req.params;
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

       const createdPlay = await newPlay.save()
       return res.status(201).json(createdPlay)

    } catch (error) {
       return res.status(500).json(error.message)
    }
};

module.exports = { getAllPlays, putPlay, postPlay };