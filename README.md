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
- **MySQL**: Banco de dados
- **LibreOffice (local)**: Conversão Word → PDF
- **HTML, CSS, Bootstrap, JavaScript**: Frontend responsivo e interativo

---

## 📁 Estrutura do Projeto
```
wordtopdf/
│
├── server.js
├── package.json
├── README.md
├── .gitignore
├── uploads/       # arquivos Word enviados (não enviado ao GitHub)
├── pdfs/          # PDFs gerados (não enviado ao GitHub)
├── config/
│   └── db.js
└── public/        # frontend (HTML, CSS, JS)
```


---

## 🔧 Instalação e Uso

Clone o repositório:

```bash
git clone https://github.com/zack427/EasyConvert.git
cd EasyConvert
npm install

mkdir uploads pdfs

LibreOffice instalado localmente

Caminho padrão no Windows: C:\Program Files\LibreOffice\program\soffice.exe

No Linux/Mac, ajuste o caminho conforme a instalação

Sem o LibreOffice instalado, a conversão de Word para PDF não funcionará

node server.js

Abra no navegador: http://localhost:3000

## 🗄️ Banco de Dados

O projeto utiliza MySQL.  
Para criar o banco localmente, você pode usar o script SQL abaixo.

### Script SQL para criar o banco e a tabela `documents`:

```sql
CREATE DATABASE wordtopdf_db;
USE wordtopdf_db;

CREATE TABLE `documents` (
  `id` int(11) NOT NULL,
  `original_name` varchar(255) NOT NULL,
  `stored_name` varchar(255) NOT NULL,
  `pdf_name` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

ALTER TABLE `documents`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `documents`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;


##Instruções para uso:

Abra o phpMyAdmin (ou outro cliente MySQL).

Crie um banco chamado wordtopdf_db.

Copie o script SQL acima e cole na aba SQL do phpMyAdmin.

Execute o script. A tabela documents será criada e estará pronta para uso.

Certifique-se de configurar o arquivo config/db.js com suas credenciais do MySQL locais.

📱 Responsividade

O site funciona em desktop, tablet e mobile, reorganizando o layout e mantendo menus acessíveis.

🔮 Próximas Melhorias

Melhorias na interface do usuário

Modo escuro/claro

👨‍💻 Autor

Isaac Almeida de Moraes
GitHub: @zack427