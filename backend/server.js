const express = require('express');
const cors    = require('cors');

const app  = express();
const port = 4000;

app.use(cors());
app.use(express.json());


app.post('/api/login', (req, res) => {
  const { email, senha } = req.body;

  if (email === 'sousa@gmail.com' && senha === '123456') {
    return res.status(200).json({
      sucesso: true,
      id: 1,
      nome: 'Cauã Sousa',
      email: 'sousa@gmail.com',
      mensagem: 'Login realizado com sucesso!'
    });
  }

  return res.status(401).json({
    sucesso: false,
    erro: 'E‑mail ou senha incorretos'
  });
});

app.listen(port, () => console.log(`Servidor em http://localhost:${port}`));
