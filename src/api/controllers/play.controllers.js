const Play = require('../models/play.models')

const getAllPlays = async (req, res) =>{
    try {
        const plays = await Play.find().populate("company")
        console.log(plays);
        if(plays) {
            return res.status(200).json(plays);
        } else {
            return res.status(404).send("No se encontraron registros")
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
};

// Obtener obra por ID
const getPlaybyID = async (req, res) => {
    try {
      const { id } = req.params;
      const selectedPlay = await Play.findById(id).populate("company")
      if (!selectedPlay) {
        return res.status(404).json({message: `No encontrada la obra con id: ${id}` })
      }
      return res.status(200).json(selectedPlay)
    } catch (error) {
          return res.status(500).json(error);
    }
  };

// Eliminar obra por ID
const deletePlay = async (req, res) => {
  try {

    const {id} = req.params
    const deletedPlay = await Play.findByIdAndDelete(id)

    if (!deletedPlay) {
      return res.status(404).json({message: 'No encontrada la obra'})
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

       console.log('req.file.path > ', req.file.path);

       if (req.file.path) {
        newPlay.cartel = req.file.path;
      }

       const createdPlay = await newPlay.save()
       return res.status(201).json(createdPlay)

    } catch (error) {
       return res.status(500).json(error.message)
    }
};

module.exports = { getAllPlays, getPlaybyID, putPlay, postPlay, deletePlay };