const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { exec } = require('child_process');
const db = require('./config/db');

const app = express();
app.use(express.json());
app.use(express.static('public'));
app.use('/pdfs', express.static(path.join(__dirname, 'pdfs')));


if (!fs.existsSync('uploads')) fs.mkdirSync('uploads');
if (!fs.existsSync('pdfs')) fs.mkdirSync('pdfs');


const upload = multer({ dest: 'uploads/' });


app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).send('Nenhum arquivo enviado');

  const originalName = req.file.originalname;
  const storedName = req.file.filename + path.extname(originalName);
  const uploadPath = path.join(__dirname, 'uploads', storedName);
  const pdfName = req.file.filename + '.pdf';
  const pdfPath = path.join(__dirname, 'pdfs', pdfName);

  try {
    
    fs.renameSync(req.file.path, uploadPath);

    // Chama LibreOffice para converter
    const command = `"C:\\Program Files\\LibreOffice\\program\\soffice.exe" --headless --convert-to pdf "${uploadPath}" --outdir "${path.join(__dirname, 'pdfs')}"`;

    exec(command, (err, stdout, stderr) => {
      if (err) {
        console.error('Erro na conversão LibreOffice:', err);
        console.error(stderr);
        return res.status(500).send('Erro ao converter arquivo');
      }

      
      db.query(
        'INSERT INTO documents (original_name, stored_name, pdf_name) VALUES (?, ?, ?)',
        [originalName, storedName, pdfName],
        (err) => {
          if (err) {
            console.error('Erro ao salvar no banco:', err);
            return res.status(500).send('Erro ao salvar no banco');
          }
          res.json({ message: 'Arquivo convertido!', downloadUrl: `/download/${pdfName}` });
        }
      );
    });

  } catch (err) {
    console.error('Erro no upload/conversão:', err);
    res.status(500).send('Erro ao processar arquivo');
  }
});

// Download PDF
app.get('/download/:filename', (req, res) => {
  const file = path.join(__dirname, 'pdfs', req.params.filename);
  if (fs.existsSync(file)) {
    res.download(file);
  } else {
    res.status(404).send('Arquivo não encontrado');
  }
});


app.get('/documents', (req, res) => {
  db.query('SELECT * FROM documents ORDER BY created_at DESC', (err, results) => {
    if (err) {
      console.error('Erro ao buscar documentos:', err);
      return res.status(500).send('Erro ao buscar documentos');
    }
    res.json(results);
  });
});


app.delete('/documents/:id', (req, res) => {
  const id = req.params.id;

  db.query('SELECT * FROM documents WHERE id = ?', [id], (err, results) => {
    if (err) {
      console.error('Erro ao buscar documento:', err);
      return res.status(500).send('Erro ao buscar documento');
    }
    if (results.length === 0) return res.status(404).send('Documento não encontrado');

    const doc = results[0];

    const files = [
      path.join(__dirname, 'uploads', doc.stored_name),
      path.join(__dirname, 'pdfs', doc.pdf_name)
    ];

    files.forEach(file => {
      try {
        if (fs.existsSync(file)) fs.unlinkSync(file);
      } catch (err) {
        console.error('Erro ao deletar arquivo físico:', err);
      }
    });

    db.query('DELETE FROM documents WHERE id = ?', [id], (err) => {
      if (err) {
        console.error('Erro ao deletar do banco:', err);
        return res.status(500).send('Erro ao deletar documento');
      }
      res.json({ message: 'Documento excluído!' });
    });
  });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));
