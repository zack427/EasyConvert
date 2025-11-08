const form = document.getElementById('uploadForm');
const fileInput = document.getElementById('fileInput');
const alertBox = document.getElementById('alertBox');
const tableBody = document.getElementById('tableBody');


async function carregarDocumentos() {
  const res = await fetch('/documents');
  const docs = await res.json();
  tableBody.innerHTML = docs.map(d => `
    <tr>
      <td>${d.original_name}</td>
      <td><a href="/pdfs/${d.pdf_name}" class="btn btn-sm btn-outline-info" target="_blank">Abrir PDF</a></td>
      <td>${new Date(d.created_at).toLocaleString()}</td>
      <td><button class="btn btn-sm btn-outline-danger" onclick="deletar(${d.id})">Excluir</button></td>
    </tr>
  `).join('');
}


async function deletar(id) {
  if (!confirm('Tem certeza que deseja excluir?')) return;
  await fetch(`/documents/${id}`, { method: 'DELETE' });
  carregarDocumentos();
}


form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const file = fileInput.files[0];
  if (!file) return;

  const data = new FormData();
  data.append('file', file);

  const res = await fetch('/upload', { method: 'POST', body: data });
  const json = await res.json();

  alertBox.className = 'alert alert-success';
  alertBox.textContent = json.message;
  alertBox.classList.remove('d-none');
  fileInput.value = '';
  carregarDocumentos();
});


carregarDocumentos();
