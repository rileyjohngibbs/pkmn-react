import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Pokemon {
  constructor(name) {
    this.name = name;
    this.hp = 100;
  }

  toHit(target) {
    return Math.random() >= 0.1;
  }

  damage(target) {
    return Math.ceil(Math.random() * 10);
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
      combatMessage: 'Battle has started!',
    }
  }

  handleAttack(attacker, target) {
    const hit = attacker.toHit(target);
    let combatMessage;
    if (hit) {
      const damage = attacker.damage(target);
      target.takeDamage(damage);
      combatMessage = `${attacker.name} attacked ${target.name} for ${damage} damage.`;
    } else {
      combatMessage = `${attacker.name} missed ${target.name}!`
    }
    this.setState({
      first: this.first,
      second: this.second,
      combatMessage: combatMessage,
    });
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
      <div className="combat">
        <div>
          <span className="pokemon-name">{this.state.first.name}</span><br />
          {this.state.first.statusMessage()}<br />
          {this.renderAttackButton(this.state.first, this.state.second)}
        </div>
        <div>
          <span className="pokemon-name">{this.state.second.name}</span><br />
          {this.state.second.statusMessage()}<br />
          {this.renderAttackButton(this.state.second, this.state.first)}
        </div>
        <div>
          {this.state.combatMessage}
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <Battle first="Charmander" second="Squirtle" />,
  document.getElementById('root')
);
