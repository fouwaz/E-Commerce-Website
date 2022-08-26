const multer = require('multer');
const MIME_TYPES = { //Translate a MIME type into a file extension
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg',
    'image/png': 'png'
};

const storage = multer.diskStorage({
    destination : (req,file,callback) => {
        callback(null, 'images'); //null in the callback's argument for no error 
    },
    filename: (req, file, callback) =>{
        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + extension); //null in the callback's argument for no error 
    }
});

module.exports = multer({storage: storage}).single('image');
