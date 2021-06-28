import React from 'react';
import './Game.css';
import {DuoFactory, GroupFactory, NhieFactory, SoloFactory} from './Cards.js';
import background from './Images/Background.jpg';

function importAll(r) {
  var images = {}
  for (var item of r.keys()) {
    images[item.replace('./', '')] = r(item);
  }
  return images;
}

const images = importAll(require.context('./Avatars', false, /\.(png|jpe?g|svg)$/));

class Game extends React.Component{
  constructor(props) {
    super(props);

    this.soloFac = new SoloFactory();
    this.duoFac = new DuoFactory();
    this.groupFac = new GroupFactory();
    this.nhieFac = new NhieFactory();

    this.players = [];
    for (var player of this.props.players){
      this.players.push({count: 1, player: player});
    }

    this.state = {currentPlayers: []};


    this.getSlokken = this.getSlokken.bind(this);
    this.nextCard = this.nextCard.bind(this);
  }

  getSlokken() {
    const rand = Math.random();
    if (rand < 0.25) {
      return '1 slok';
    } else if (rand < 0.5) {
      return '2 slokken';
    } else if (rand < 0.75) {
      return '3 slokken';
    } else {
      return 'een adje';
    }
  }

  nextPlayers(number) {
    var allPlayers = this.players.slice();
    var nextPlayers = [];

    for (var i = 0; i < number; i++) {
      var total = 0;
      var chanches = [];
      for (var player of allPlayers) {
        total += 1.0/player.count;
        chanches.push({chanche: (1.0/player.count), player: player.player});
      }

      const random = Math.random()*total;
  
      var current = 0;
      for (var chanche of chanches) {
        current += chanche.chanche;
        if (random <= current) {
          nextPlayers.push(chanche.player);

          for (var player of this.players) {
            if (player.player === chanche.player) {
              player.count += 1;
            }
          }

          var newPlayers = [];
          for (var player of allPlayers) {
            if (player.player !== chanche.player) {
              newPlayers.push(player);
            }
          }
          allPlayers = newPlayers;
          break;
        }
      }
    }
    return nextPlayers;        
  }

  nextCard() {
    const type = Math.floor(Math.random() * 4);;

    if (type === 0) {
      const players = this.nextPlayers(1);
      const card = this.soloFac.getCard(this.getSlokken(), players[0].name, players[0].male);
      this.setState({currentCard: card, currentPlayers: players});
    } else if (type === 1) {
      const players = this.nextPlayers(2);
      const card = this.duoFac.getCard(this.getSlokken(), players[0].name, players[1].name, players[0].male, players[1].male);
      this.setState({currentCard: card, currentPlayers: players});
    } else if (type === 2) {
      const players = this.players.slice().map(x => x.player);
      const card = this.groupFac.getCard(this.getSlokken());
      this.setState({currentCard: card, currentPlayers: players});
    } else if (type === 3) {
      const players = this.players.slice().map(x => x.player);
      const card = this.nhieFac.getCard(this.getSlokken());
      this.setState({currentCard: card, currentPlayers: players});      
    }
  }


  render() {
    return (
      <div>
        <Playerbar players={this.props.players} currentPlayers={this.state.currentPlayers}></Playerbar>
        <div className='cards-field'>
          <div className='current-card'>
            {this.state.currentCard}
          </div>
          <div className='staying-cards'>

          </div>
        </div>
        <div className='button-box'>
          <button onClick={() => this.nextCard()}>Next</button>
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
          {this.props.players.map((player) => <PlayerBarItem key={player.name} player={player} currentPlayers={this.props.currentPlayers}/>)}
        </div>
      </div>
    );
  }
}

class PlayerBarItem extends React.Component {
  
  render() {
    if (this.props.currentPlayers.includes(this.props.player)) {
      return (
        <div className='playerbar-item'>
          <img key={this.props.player.avatar} src={images[this.props.player.avatar].default} alt={this.props.player.avatar}/>
          <div>{this.props.player.name}</div>
        </div>
      )
    }

    return (
      <div className='playerbar-item playerbar-item-hidden'>
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
