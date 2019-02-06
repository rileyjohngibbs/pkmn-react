import React from 'react';
import './index.css';
import { instanceOf } from 'prop-types';
import { Cookies, withCookies } from 'react-cookie';

import { POKEMON, TYPES } from './pokemonData';
import Pokemon from './pokemon';
import Stable from './stable';

const firstStable = [{name: "Squirtle"}, {name: "Charmander"}, {name: "Bulbasaur"}];
const secondStable = [{name: "Pidgey"}, {name: "Geodude"}, {name: "Squirtle"}];

class Battle extends React.Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  }

  constructor(props) {
    super(props);
    const { cookies } = props;
    this.firstStable = (cookies.get('firstStable') || firstStable).map((p) => new Pokemon(p.name, p.hp));
    this.secondStable = (cookies.get('secondStable') || secondStable).map((p) => new Pokemon(p.name, p.hp));
    this.state = {
      first: this.firstStable[0],
      second: this.secondStable[0],
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
    const { cookies } = this.props;
    cookies.set('firstStable', this.firstStable.map((p) => p.recordState()), { path: '/' });
    cookies.set('secondStable', this.secondStable.map((p) => p.recordState()), { path: '/' });
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

  reset() {
    const { cookies } = this.props; 
    cookies.remove('firstStable');
    cookies.remove('secondStable');
    Array.prototype.splice.apply(
      this.firstStable,
      [0, this.firstStable.length, ...firstStable.map((p) => new Pokemon(p.name, p.hp))]
    );
    Array.prototype.splice.apply(
      this.secondStable,
      [0, this.secondStable.length, ...secondStable.map((p) => new Pokemon(p.name, p.hp))]
    );
    this.setState({first: this.firstStable[0], second: this.secondStable[0]});
  }

  render() {
    return (
      <div><div style={{margin: 'auto', width: '30em', maxWidth: '100%'}}>
        <h1 style={{padding: '10% 10% 0 10%'}}>Pokémon Battle</h1>
        <div className="combat" style={{padding: '0 10%'}}>
          <div className="trainer">
            <img className="pkmn-image"
              src={this.state.first.imageSrc}
              alt={this.state.first.name} />
            <span className="pokemon-name">{this.state.first.name}</span><br />
            {this.state.first.statusMessage()}<br />
            {this.renderAttackButton(this.state.first, this.state.second)}
            <Stable
              pokemonControl={(pkmn) => {this.setState({first: pkmn});}}
              pokemon={this.firstStable} />
          </div>
          <div className="trainer">
            <img className="pkmn-image"
              src={this.state.second.imageSrc}
              alt={this.state.second.name} />
            <span className="pokemon-name">{this.state.second.name}</span><br />
            {this.state.second.statusMessage()}<br />
            {this.renderAttackButton(this.state.second, this.state.first)}
            <Stable
              pokemonControl={(pkmn) => {this.setState({second: pkmn});}}
              pokemon={this.secondStable} />
          </div>
          <div>
            {this.state.combatMessage}
          </div>
          <button className="reset"
            onClick={() => this.reset() } >
            Reset
          </button>
        </div>
      </div></div>
    );
  }
}

export default withCookies(Battle);
