import React from 'react';

class Stable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemon: this.props.pokemon,
      isOpen: false,
      control: this.props.pokemonControl,
    }
  }

  tagIn(pkmn) {
    this.state.control(pkmn);
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
          ? <div className="open-stable">
              {this.state.pokemon.map((p, i) => (
                <button
                  className="stable-pkmn stable-btn"
                  key={i} onClick={() => this.tagIn(p)}>
                    <img alt="" className="btn-img" src={p.imageSrc} /> {p.name} ({p.hp} hp)
                </button>
              ))} <br />
              <button className="reset stable-btn"
                onClick={() => this.setState({isOpen: false})}>
                Cancel
              </button>
            </div>
          : null 
        }
      </div>
    );
  }
}

export default Stable;
