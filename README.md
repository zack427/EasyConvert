# EasyConvert - Word2PDF Online

EasyConvert é um site que converte arquivos Word (.docx) em PDF de forma rápida e prática, com upload, conversão e download diretamente pelo navegador.

📋 Índice
- Visão Geral
- Funcionalidades
- Tecnologias Utilizadas
- Estrutura do Projeto
- Instalação e Uso
- Responsividade
- Próximas Melhorias
- Autor

---

## 🚀 Visão Geral
EasyConvert permite que qualquer usuário envie arquivos Word (.docx) e receba o PDF correspondente, mantendo a organização dos documentos. É ideal para estudantes, profissionais e pequenas empresas que precisam de uma ferramenta rápida e gratuita de conversão de arquivos.

---

## ⭐ Funcionalidades
- Upload de arquivos Word (.docx)
- Conversão automática para PDF
- Download dos PDFs gerados
- CRUD de documentos (listar, excluir)
- Frontend responsivo para desktop e mobile
- Notificações de sucesso/erro ao enviar ou excluir arquivos

---

## 🛠 Tecnologias Utilizadas
- **Node.js + Express**: Servidor e backend
- **MySQL / PlanetScale**: Banco de dados
- **LibreOffice (local) / CloudConvert API**: Conversão Word → PDF
- **HTML, CSS, Bootstrap, JavaScript**: Frontend responsivo e interativo

---

## 📁 Estrutura do Projeto
wordtopdf/
|
|-- server.js
|-- package.json
|-- README.md
|-- .gitignore
|-- uploads/ # arquivos Word enviados (não enviado ao GitHub)
|-- pdfs/ # PDFs gerados (não enviado ao GitHub)
|-- config/
| |-- db.js
|-- public/ # frontend (HTML, CSS, JS)


---

## 🔧 Instalação e Uso

Clone o repositório:

```bash
git clone https://github.com/zack427/EasyConvert.git
cd EasyConvert
npm install

mkdir uploads pdfs
mkdir uploads 

node server.js

Abra no navegador: http://localhost:3000


📱 Responsividade

O site funciona em desktop, tablet e mobile, reorganizando o layout e mantendo menus acessíveis.

🔮 Próximas Melhorias

Melhorias na interface do usuário

Modo escuro/claro

👨‍💻 Autor

Isaac Almeida de Moraes
GitHub: @zack427