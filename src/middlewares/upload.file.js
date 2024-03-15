const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

//La propiedad de Multer es storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'theatrik',
    allowedFormats: ['jpg', 'png', 'jpeg', 'webp', 'svg'],
  },
});

//Con upload vamos a procesar nuestro storage
const upload = multer({ storage });
module.exports = upload;