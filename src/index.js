const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));


app.get('/', async (req, res) => {
  try {
    const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=10');
    const pokemons = response.data.results;
    res.render('index', { pokemons });
  } catch (error) {
    res.status(500).send('Erro ao buscar dados da API.');
  }
});

app.get('/pokemon/:name', async (req, res) => {
  try {
    console.log(req.params.name);
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${req.params.name}`);
    const pokemon = response.data;
    res.render('pokemon', { pokemon });
  } catch (error) {
    res.status(500).send('Erro ao buscar detalhes do Pokémon.');
  }
});


app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
