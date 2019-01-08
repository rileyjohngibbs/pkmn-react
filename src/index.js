import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import { POKEMON, TYPES } from './pokemonData';


class Pokemon {
  constructor(name) {
    const base = POKEMON[name];
    this.name = base.name;
    this.hp = base.hp;
    this.attack = base.attack;
    this.types = base.types;
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
}

class Battle extends React.Component {
  constructor(props) {
    super(props);
    this.first = new Pokemon(props.first);
    this.second = new Pokemon(props.second);
    this.state = {
      first: this.first,
      second: this.second,
      stable: Object.keys(POKEMON),
      combatMessage: 'Battle has started!',
    }
  }

  handleAttack(attacker, target) {
    const hit = attacker.toHit(target);
    let combatMessage;
    if (hit) {
      const effectiveness = this.determineEffectiveness(attacker, target);
      if (effectiveness === 0) {
        combatMessage = `${attacker.name} attacked ${target.name}, but the attack had no effect.`;
      } else {
        const damage = Math.floor(attacker.damage(target) * effectiveness);
        target.takeDamage(damage);
        combatMessage = `${attacker.name} attacked ${target.name} for ${damage} damage.`;
        if (effectiveness < 1) {
          combatMessage += " It's not very effective...";
        } else if (effectiveness > 1) {
          combatMessage += " It's super effective!";
        }
      }
    } else {
      combatMessage = `${attacker.name} missed ${target.name}!`
    }
    this.setState({
      combatMessage: combatMessage,
    });
  }

  determineEffectiveness(attacker, target) {
    let modifier = 1;
    attacker.types.forEach((attackerType) => {
      const strong = TYPES[attackerType]['strong'];
      const weak = TYPES[attackerType]['weak'];
      const noEffect = TYPES[attackerType]['noEffect'];
      target.types.forEach((targetType) => {
        modifier *= strong.indexOf(targetType) !== -1 ? 2 : 1;
        modifier *= weak.indexOf(targetType) !== -1 ? 0.5 : 1;
        modifier *= noEffect.indexOf(targetType) !== -1 ? 0 : 1;
      });
    });
    return modifier;
  }

  renderAttackButton(attacker, target) {
    const valid = attacker.hp && target.hp;
    return valid
    ? (
      <button className="move" onClick={() => this.handleAttack(attacker, target)}>
        Attack
      </button>
    )
    : (
      <button className="move" disabled>Attack</button>
    );
  }

  render() {
    return (
      <div>
        <div className="combat">
          <div>
            <span className="pokemon-name">{this.state.first.name}</span><br />
            {this.state.first.statusMessage()}<br />
            {this.renderAttackButton(this.state.first, this.state.second)}
            <Stable pokemonControl={(pkmn) => {this.setState({first: pkmn});}} />
          </div>
          <div>
            <span className="pokemon-name">{this.state.second.name}</span><br />
            {this.state.second.statusMessage()}<br />
            {this.renderAttackButton(this.state.second, this.state.first)}
            <Stable pokemonControl={(pkmn) => {this.setState({second: pkmn});}} />
          </div>
          <div>
            {this.state.combatMessage}
          </div>
        </div>
      </div>
    );
  }
}

class Stable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemon: Object.keys(POKEMON),
      isOpen: false,
      control: this.props.pokemonControl,
    }
  }

  tagIn(pkmn) {
    this.state.control(new Pokemon(pkmn));
    this.setState({isOpen: false});
  }

  render() {
    return (
      <div className="stable">
        <button
          className={'switcher' + (this.state.isOpen ? ' open' : '')}
          onClick={() => {this.setState({isOpen: !this.state.isOpen});}}>
          {!this.state.isOpen ? 'Switch Out' : 'Cancel'}
        </button>
        {
          this.state.isOpen
          ? this.state.pokemon.map((p, i) => (
            <button
              className="stable-pkmn"
              key={i} onClick={() => this.tagIn(p)}>
                {p}
            </button>
          ))
          : null
        }
      </div>
    );
  }
}

ReactDOM.render(
  <Battle first="Charmander" second="Squirtle" />,
  document.getElementById('root')
);
