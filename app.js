const form = document.querySelector('#search');
const imgScreen = document.querySelector('#img-screen');
const infoScreen = document.querySelector('#info-screen');
const previousBtn = document.querySelector('#previous');
const nextBtn = document.querySelector('#next');
const randomBtn = document.querySelector('#random');

let currentPokemon;

const fetchPokemonData = async (input) => {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${input}`);
  const pokemonData = await res.json();

  newPokemon(pokemonData);
}

const clearPokedex = () => {
  imgScreen.innerHTML = '';
  infoScreen.innerHTML = '';
};

const newPokemon = (pokemonData) => {
  clearPokedex();

  currentPokemon = pokemonData.id;

  const pokemonImg = document.createElement('img');
  pokemonImg.setAttribute('src', pokemonData.sprites.front_default);
  imgScreen.appendChild(pokemonImg);
  imgScreen.style.backgroundColor = '#ddd';

  const pokemonName = document.createElement('p');
  pokemonName.setAttribute('id', 'pokemonname');
  pokemonName.innerText = `${pokemonData.name.toUpperCase()}, #${currentPokemon}`;
  infoScreen.appendChild(pokemonName);

  const pokemonType = document.createElement('p');
  if (pokemonData.types.length === 1) {
    const type = pokemonData.types[0].type.name;
    pokemonType.innerText = `Type: ${type.charAt('0').toUpperCase()}${type.slice(1)}`;
  } else {
    const typeOne = pokemonData.types[0].type.name;
    const typeTwo = pokemonData.types[1].type.name;
    pokemonType.innerText = `Types: ${typeOne.charAt('0').toUpperCase()}${typeOne.slice(1)} & ${typeTwo.charAt('0').toUpperCase()}${typeTwo.slice(1)}`;
  }
  infoScreen.appendChild(pokemonType);
  infoScreen.style.backgroundColor = '#ddd';

  const pokemonStatsDiv = document.createElement('div');
  infoScreen.appendChild(pokemonStatsDiv);
  const pokemonStats = {
    hp: pokemonData.stats[0].base_stat,
    attack: pokemonData.stats[1].base_stat,
    defense: pokemonData.stats[2].base_stat,
    specialAttack: pokemonData.stats[3].base_stat,
    specialDefense: pokemonData.stats[4].base_stat,
    speed: pokemonData.stats[5].base_stat
  }
  const statsTitle = document.createElement('p');
  statsTitle.innerText = 'Base Stats: ';
  pokemonStatsDiv.appendChild(statsTitle);
  const statsP = document.createElement('p');
  statsP.innerText = 'HP: ' + pokemonStats.hp + '\n' + 'Attack: ' + pokemonStats.attack + '\n' + 'Defense: ' + pokemonStats.defense + '\n' + 'Special Attack: ' + pokemonStats.specialAttack + '\n' + 'Special Defense: ' + pokemonStats.specialDefense + '\n' + 'Speed: ' + pokemonStats.speed;
  pokemonStatsDiv.appendChild(statsP);

  const pokemonBodyInfo = document.createElement('p');
  pokemonBodyInfo.innerText = `Height: ${pokemonData.height}, Weight: ${pokemonData.weight}`;
  infoScreen.appendChild(pokemonBodyInfo);
};

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const userInput = form.elements.input.value;

  fetchPokemonData(userInput.toLowerCase());
});

previousBtn.addEventListener('click', () => {
  fetchPokemonData(Number(currentPokemon) - 1);
});

nextBtn.addEventListener('click', () => {
  fetchPokemonData(Number(currentPokemon) + 1);
});

randomBtn.addEventListener('click', () => {
  fetchPokemonData(Math.floor(Math.random() * 898) + 1);
});