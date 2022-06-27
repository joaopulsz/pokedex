const form = document.querySelector('#search');
const imgScreen = document.querySelector('#img-screen');
const infoScreen = document.querySelector('#info-screen');
const evolutions = document.querySelector('#evolutions');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const userInput = form.elements.input.value;

  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${userInput}`);
  const pokemonData = await res.json();

  const pokemonImg = document.createElement('img');
  pokemonImg.setAttribute('src', pokemonData.sprites.front_default);
  imgScreen.appendChild(pokemonImg);

  const pokemonType = document.createElement('p');
  pokemonType.innerText = `Type(s): ${pokemonData.types[0].type.name}`;
  infoScreen.appendChild(pokemonType);
});