import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
const PORT = 3000;

// Permitir CORS
app.use(cors());

app.get('/tesourodireto', async (req, res) => {
    try {
        const srcURL = 'https://www.tesourodireto.com.br/json/br/com/b3/tesourodireto/service/api/treasurybondsinfo.json';
        
        const response = await fetch(srcURL);
        const data = await response.json();

        res.json(data);
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
        res.status(500).json({ error: 'Erro ao buscar dados' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});