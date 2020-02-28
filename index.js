const express = require('express');
const multer = require('multer');

const path = require('path');

const uploadFolder = __dirname + '/uploads/images'

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadFolder)
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage
})


const app = express();
const PORT = 3000;

app.use(express.static('public'));

app.post('/upload', upload.single('photo'), (req, res) => {
    if (req.file) {
        res.json(req.file);
    } else throw 'error';
});

app.get('/image/:fileName', (req, res) => {
    const file = `${uploadFolder}/${req.params.fileName}`;
    res.sendFile(file)
});

app.listen(PORT, () => {
    console.log('Listening at ' + PORT);
});