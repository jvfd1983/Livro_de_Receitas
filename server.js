const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
const port = 3000;

// Configuração do Multer para salvar as imagens na pasta 'uploads'
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Nome único para o arquivo
    }
});

const upload = multer({ storage: storage });

app.use(express.static('public')); // Pasta onde estão os arquivos estáticos (HTML, CSS, JS)
app.use('/uploads', express.static('uploads')); // Pasta onde as imagens serão salvas

// Rota para upload de imagens
app.post('/upload', upload.single('imagemReceita'), (req, res) => {
    const imagePath = `/uploads/${req.file.filename}`;
    res.json({ imagePath });
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});