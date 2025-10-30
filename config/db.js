const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // deixa vazio se o XAMPP estiver no padrão
  database: 'wordtopdf_db'
});

db.connect(err => {
  if (err) {
    console.error('❌ Erro ao conectar ao MySQL:', err);
    return;
  }
  console.log('✅ Conectado ao MySQL!');
});

module.exports = db;
