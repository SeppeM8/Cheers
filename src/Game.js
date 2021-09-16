import React from 'react';
import './Game.css';
import {DuoFactory, GroupFactory, NhieFactory, SoloFactory, StayingSoloFactory, MiniCard} from './Cards.js';


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
    this.stayingSoloFac = new StayingSoloFactory(this.props.players.length);

    this.players = [];
    for (var player of this.props.players){
      this.players.push({count: 1, player: player});
    }

    this.state = {currentPlayers: [], stayingCards: []};


    this.getSlokken = this.getSlokken.bind(this);
    this.nextCard = this.nextCard.bind(this);

    this.nextCard();
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
    var player;

    for (var i = 0; i < number; i++) {
      var total = 0;
      var chanches = [];
      for (player of allPlayers) {
        total += 1.0/player.count;
        chanches.push({chanche: (1.0/player.count), player: player.player});
      }

      const random = Math.random()*total;
  
      var current = 0;
      for (var chanche of chanches) {
        current += chanche.chanche;
        if (random <= current) {
          nextPlayers.push(chanche.player);
          for (player of this.players) {
            if (player.player === chanche.player) {
              player.count += 1;
            }
          }

          var newPlayers = [];
          for (player of allPlayers) {
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
    
    // Staying cards controleren
    var staying = [];
    for (var card of this.state.stayingCards) {
      if (card.turns !== 0) {
        card.turns--;
        staying.push(card);
      }
    }
    this.setState({stayingCards:staying});
    
    var type = Math.floor(Math.random() * this.props.settings.total);
    var total = this.props.settings.solo;

    if (type < total) {
      const players = this.nextPlayers(1);
      const card = this.soloFac.getCard(this.getSlokken(), players[0].name, players[0].male);
      this.setState({currentCard: card, currentPlayers: players});
      return;
    } 
    total += this.props.settings.duo;
    if (type < total) {
      const players = this.nextPlayers(2);
      const card = this.duoFac.getCard(this.getSlokken(), players[0].name, players[1].name, players[0].male, players[1].male);
      this.setState({currentCard: card, currentPlayers: players});
      return;
    }
    total += this.props.settings.group;
    if (type < total) {
      const players = this.players.slice().map(x => x.player);
      const card = this.groupFac.getCard(this.getSlokken());
      this.setState({currentCard: card, currentPlayers: players});
      return;
    }
    total += this.props.settings.nhie;
    if (type < total) {
      const players = this.players.slice().map(x => x.player);
      const card = this.nhieFac.getCard(this.getSlokken());
      this.setState({currentCard: card, currentPlayers: players});      
      return;
    }
    const players = this.nextPlayers(1);
    const cards = this.stayingSoloFac.getCard(this.getSlokken(), players[0].name, players[0].male);
    var stayingCards = this.state.stayingCards;
    stayingCards.push(cards[1]);
    this.setState({currentCard: cards[0], currentPlayers: players, stayingCards: stayingCards});
  };

  render() {
    return (
      <div className='game'>
        <Playerbar players={this.props.players} currentPlayers={this.state.currentPlayers}></Playerbar>
        <div className='cards-field'>
          <div className='current-card' onClick={() => this.nextCard()}>
            {this.state.currentCard}
          </div>
          <div className='staying-cards'>
            {this.state.stayingCards.map(card => (<MiniCard text={card.text}/>))}
          </div>
        </div>
        <div className='button-box'>
          <button type="button" autoFocus onClick={() => this.nextCard()} >Next</button>
          <button type="button" onClick={() => this.props.gotoSettings(true)}> Settings</button>
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

export {Game}
