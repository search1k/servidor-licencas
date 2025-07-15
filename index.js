const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const LICENCA_FILE = path.join(__dirname, 'licencas.json');

function carregarLicencas() {
  try {
    const data = fs.readFileSync(LICENCA_FILE, 'utf-8');
    return JSON.parse(data).licencas || [];
  } catch (err) {
    console.error('Erro ao carregar licenças:', err);
    return [];
  }
}

app.post('/validate-key', (req, res) => {
  const { licenseKey } = req.body;
  if (!licenseKey) return res.status(400).json({ isValid: false, error: 'Chave não enviada' });

  const licencas = carregarLicencas();
  const isValid = licencas.includes(licenseKey);
  return res.json({ isValid });
});

app.listen(PORT, () => {
  console.log(`Servidor de licenças rodando em http://localhost:${PORT}`);
});
