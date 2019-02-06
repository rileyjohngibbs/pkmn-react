import { POKEMON } from './pokemonData';

class Pokemon {
  constructor(name, hp) {
    const base = POKEMON[name];
    this.name = base.name;
    this.hp = hp !== undefined ? hp : base.hp;
    this.attack = base.attack;
    this.types = base.types;
    this.imageSrc = base.image;
  }

  toHit(target) {
    return Math.random() >= 0.1;
  }

  damage(target) {
    return Array(this.attack).fill(0).reduce((a, b) => a + Math.ceil(Math.random()*6), 0);
  }

  takeDamage(damage) {
    this.hp = Math.max(this.hp - damage, 0);
  }

  statusMessage() {
    return (
      this.hp === 0
      ? this.name + ' has fainted!'
      : this.name + ' has ' + this.hp + ' hit points.'
    );
  }

  recordState() {
     return { name: this.name, hp: this.hp };
  }
}

export default Pokemon;
