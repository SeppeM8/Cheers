import React from 'react';
import './Game.css'

function importAll(r) {
  var images = {}
  for (var item of r.keys()) {
    images[item.replace('./', '')] = r(item);
  }
  return images;
}

const images = importAll(require.context('./Avatars', false, /\.(png|jpe?g|svg)$/));

class Game extends React.Component{

  render() {
    return (
      <div>
        <Playerbar players={this.props.players}></Playerbar>
        <div className="card-container">
          <Card></Card>
        </div>
      </div>
    );
  }
}

class Playerbar extends React.Component {

  render() {
    return (
      <div className='playerbar'>
        <div className='playerbar-items'>
          {this.props.players.map((player) => <PlayerBarItem key={player.name} player={player}/>)}
        </div>
      </div>
    );
  }
}

class PlayerBarItem extends React.Component {
  
  render() {
    return (
      <div className='playerbar-item'>
        <img key={this.props.player.avatar} src={images[this.props.player.avatar].default} alt={this.props.player.avatar}/>
        <div>{this.props.player.name}</div>
      </div>
    )
  }
}

class Card extends React.Component {

  render() {
    return (
      <div>
        Card
      </div>
    )
  }
}

export {Game}
