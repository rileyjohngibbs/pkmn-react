import squirtle from './images/squirtle.png';
import charmander from './images/charmander.png';
import bulbasaur from './images/bulbasaur.png';
import geodude from './images/geodude.png';
import pidgey from './images/pidgey.png';

const POKEMON = {
  "Squirtle": {
    "name": "Squirtle",
    "hp": 100,
    "attack": 3,
    "types": ["water"],
    "image": squirtle,
  },
  "Charmander": {
    "name": "Charmander",
    "hp": 75,
    "attack": 4,
    "types": ["fire"],
    "image": charmander,
  },
  "Bulbasaur": {
    "name": "Bulbasaur",
    "hp": 100,
    "attack": 3,
    "types": ["grass"],
    "image": bulbasaur,
  },
  "Geodude": {
    "name": "Geodude",
    "hp": 150,
    "attack": 2,
    "types": ["ground", "rock"],
    "image": geodude,
  },
  "Pidgey": {
    "name": "Pidgey",
    "hp": 75,
    "attack": 3,
    "types": ["flying"],
    "image": pidgey,
  },
};

const TYPES = {
  "ground": {
    "strong": ["rock", "fire"],
    "weak": ["grass", "ground"],
    "noEffect": ["flying"],
  },
  "fire": {
    "strong": ["grass"],
    "weak": ["fire", "rock", "water"],
    "noEffect": [],
  },
  "flying": {
    "strong": ["grass"],
    "weak": ["rock"],
    "noEffect": [],
  },
  "grass": {
    "strong": ["water", "rock", "ground"],
    "weak": ["fire", "grass", "flying"],
    "noEffect": [],
  },
  "rock": {
    "strong": ["fire", "fly"],
    "weak": ["ground"],
    "noEffect": [],
  },
  "water": {
    "strong": ["fire", "ground", "rock"],
    "weak": ["grass", "water"],
    "noEffect": [],
  },
};

export { POKEMON, TYPES };
