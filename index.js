const express = require("express");
const path = require("path");
const app = express();

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded());

const pokedex = [
  {
    id: 1,
    nome: "Bulbasaur",
    descricao:
      "There is a plant seed on its back right from the day this Pokémon is born. The seed slowly grows larger.",
    tipo: "Grass",
    imagem: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png",
    numero: 1,
    altura: 0.7,
    peso: 6.9,
    categoria: "Seed",
    habilidade: "Overgrow",
  },
  {
    id: 2,
    nome: "Charmander",
    descricao:
      "It has a preference for hot things. When it rains, steam is said to spout from the tip of its tail.",
    tipo: "Fire",
    imagem: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/004.png",
    numero: 4,
    altura: 0.6,
    peso: 8.5,
    categoria: "Lizard",
    habilidade: "Blaze",
  },
  {
    id: 3,
    nome: "Squirtle",
    descricao:
      "When it retracts its long neck into its shell, it squirts out water with vigorous force.",
    tipo: "Water",
    imagem: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/007.png",
    numero: 7,
    altura: 0.5,
    peso: 9,
    categoria: "Tiny Turtle",
    habilidade: "Torrent",
  },
];

let pokemon = undefined;

app.get("/", (req, res) => {
  res.render("index", { pokedex, pokemon });
});

app.post("/create", (req, res) => {
	const pokemon = req.body;
  pokemon.id = pokedex.length + 1;
  pokedex.push(pokemon);
  res.redirect("/#cards");
});

app.get("/detalhes/:id", (req, res) => {
  const id = +req.params.id;
  pokemon = pokedex.find(pokemon => pokemon.id === id);
  res.redirect("/#cadastro");
});

app.post("/update/:id", (req, res) => {
  const id = +req.params.id - 1;
  const newPokemon = req.body;
  newPokemon.id = id + 1;
  pokedex[id] = newPokemon;
  pokemon = undefined;
  res.redirect("/#cards");
});

app.get("/delete/:id", (req, res) => {
  const id = +req.params.id - 1;
  delete pokedex[id];

  res.redirect("/#cards");
});

app.listen(3000, () =>
  console.log("Servidor rodando em http://localhost:3000")
);
