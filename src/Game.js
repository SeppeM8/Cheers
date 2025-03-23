import React from 'react';
import './Game.css';
import {DuoFactory, GroupFactory, NhieFactory, SoloFactory, StayingSoloFactory, StayingDuoFactory, StayingGroupFactory} from './Cards.js';
import next from './Images/next.png';
import gear from './Images/gear.png';


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

    var self = this;

    this.soloFac = new SoloFactory();
    this.duoFac = new DuoFactory();
    this.groupFac = new GroupFactory();
    this.nhieFac = new NhieFactory();
    this.stayingSoloFac = new StayingSoloFactory(this.removeStaying, self);
    this.stayingDuoFac = new StayingDuoFactory(this.removeStaying, self);
    this.stayingGroupFac = new StayingGroupFactory(this.removeStaying, self);

    this.playersPool = [];
    this.playerindex = 0;

    for (var player of this.props.players){
      this.playersPool.push(player);
      this.playersPool.push(player);
    }
    this.playersPool.sort(() => 0.5 - Math.random());

    this.state = {
      currentPlayers: [],
      stayingCards: [],
      settings: false
    };

    this.getSlokken = this.getSlokken.bind(this);
    this.nextCard = this.nextCard.bind(this);    
    this.removeStaying = this.removeStaying.bind(this);
  }

  removeStaying(self, id) {
    var staying = []
    for (var card of self.state.stayingCards) {
      if (card.card.key !== ''+id) {
        staying.push(card);
      }
    }
    self.setState({stayingCards: staying});
  }

  testSlokken() {
    console.log("-------------------------------------------------")
    for (var sett = 0; sett <=100; sett +=5) {      
      var counts = {'een slok':0, 'twee slokken':0, 'drie slokken':0, 'een shotje':0, 'een adje':0};
      this.props.settings.drinking = sett;
      for (var i = 0; i<10000; i++) {
        const num = this.getSlokken();
        counts[num] = counts[num] ? counts[num] + 1 : 1;
      }
      for (var key in counts) {
        counts[key] = counts[key] / 100;
      }
      console.log(sett, counts);
    }
  }

  testPlayers() {
    console.log("-------------------------------------------------");
    var counts = {};
    for (var i = 0; i <= 100; i++) {
      var player = this.nextPlayers(1)[0].name;
      counts[player] = counts[player] ? counts[player] + 1 : 1;
    }
    console.log(counts)
  }

  getSlokken() { 
    var setting = this.props.settings.drinking;
    const slokken = ['een slok', 'twee slokken', 'drie slokken', 'een shotje', 'een adje'];
    const rand = Math.floor(Math.random() * 101);

    if (rand >= setting) {
      return slokken[0];
    }
    setting = setting * setting /100;
    if (rand >= setting) {
      return slokken[1];
    }    
    setting = setting * setting /100;
    if (rand >= setting) {
      return slokken[2];
    }    
    setting = setting * setting /100;
    if (rand >= setting) {
      return slokken[3];
    }
    return slokken[4];
  }

  nextPlayers(number) {

    var nextPlayers = [];
    var i;

    if (this.props.settings.order.value === "strict") {
      for (i = 0; i < number; i++) {
        nextPlayers.push(this.props.players[this.playerindex]);
        this.playerindex = (this.playerindex + 1) % this.props.players.length;
      }
      return nextPlayers;
    }

    if (this.props.settings.order.value === "random") {
      var shuffled = this.props.players.slice().sort(() => 0.5 - Math.random());
      for (i = 0; i < number; i++) {
        nextPlayers.push(shuffled[i])
      }
      return nextPlayers;      
    }

    var nextPlayersNames = [];

    if ( new Set(this.playersPool).size < number) {
      this.playersPool.push(...this.props.players);
      this.playersPool.sort(() => 0.5 - Math.random());
    }
    
    while (nextPlayers.length < number) {
      var player = this.playersPool.shift(); 
      if (nextPlayersNames.includes(player.name)) {
        this.playersPool.push(player);
      } else {
        nextPlayersNames.push(player.name);
        nextPlayers.push(player);
      }

      if (this.playersPool.length <= this.props.players.length) {
        this.playersPool.push(...this.props.players);
        this.playersPool.sort(() => 0.5 - Math.random());
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
      
      if (this.soloFac.cardCount() === 0) {
        this.props.changeSetting("solo", 0);
      }

      return;
    } 
    total += this.props.settings.duo;
    if (type < total) {
      const players = this.nextPlayers(2);
      const card = this.duoFac.getCard(this.getSlokken(), players[0].name, players[1].name, players[0].male, players[1].male);
      this.setState({currentCard: card, currentPlayers: players});     
      
      if (this.duoFac.cardCount() === 0) {
        this.props.changeSetting("duo", 0);
      }

      return;
    }
    total += this.props.settings.group;
    if (type < total) {
      const players = this.props.players.slice();
      const cardPlayer = this.nextPlayers(1);
      const card = this.groupFac.getCard(this.getSlokken(), cardPlayer[0].name, cardPlayer[0].male);
      this.setState({currentCard: card.card, currentPlayers: players});     
      
      if (!card.usedPlayer) {
        this.playersPool.push(cardPlayer[0]);
      }

      if (this.groupFac.cardCount() === 0) {
        this.props.changeSetting("group", 0);
      }

      return;
    }
    total += this.props.settings.nhie;
    if (type < total) {
      const players = this.props.players.slice();
      const card = this.nhieFac.getCard(this.getSlokken());
      this.setState({currentCard: card, currentPlayers: players});        
      
      if (this.nhieFac.cardCount() === 0) {
        this.props.changeSetting("nhie", 0);
      }
   
      return;
    }
    total += this.props.settings.stayingSolo;
    var stayingCards;
    if (type < total) {
      const players = this.nextPlayers(1);
      const cards = this.stayingSoloFac.getCard(this.getSlokken(), players[0].name, players[0].male);
      stayingCards = this.state.stayingCards;
      stayingCards.push(cards[1]);
      this.setState({currentCard: cards[0], currentPlayers: players, stayingCards: stayingCards});        
      
      if (this.stayingSoloFac.cardCount() === 0) {
        this.props.changeSetting("stayingSolo", 0);
      }

      return;
    }
    total += this.props.settings.stayingDuo;
    if (type < total) {
      const players = this.nextPlayers(2);
      const cards = this.stayingDuoFac.getCard(this.getSlokken(), players[0].name, players[1].name, players[0].male, players[1].male);
      stayingCards = this.state.stayingCards;
      stayingCards.push(cards[1]);
      this.setState({currentCard: cards[0], currentPlayers: players, stayingCards: stayingCards});     
      
      if (this.stayingDuoFac.cardCount() === 0) {
        this.props.changeSetting("stayingDuo", 0);
      }

      return;
    }  
    
    total += this.props.settings.stayingGroup;
    if (type < total) {     
      const players = this.props.players.slice();
      const cards = this.stayingGroupFac.getCard(this.getSlokken());
      stayingCards = this.state.stayingCards;
      stayingCards.push(cards[1]);
      this.setState({currentCard: cards[0], currentPlayers: players, stayingCards: stayingCards});         
        
      if (this.stayingGroupFac.cardCount() === 0) {
        this.props.changeSetting("stayingGroup", 0);
      }

      return;
    }

    alert("Out of cards, reset settings to continue")

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
            {this.state.stayingCards.map(card => (card.card))}
          </div>          
          <div className="game-buttons-box">
            <img className="next-button button" src={next} alt="Next" onClick={() => this.nextCard()}/>
            <img className="game-settings-button button" src={gear} alt="Settings" onClick={() => this.props.gotoSettings(true)}/>
          </div>
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
          <img key={this.props.player.avatar} src={images[this.props.player.avatar]} alt={this.props.player.avatar}/>
          <div>{this.props.player.name}</div>
        </div>
      )
    }

    return (
      <div className='playerbar-item playerbar-item-hidden'>
        <img key={this.props.player.avatar} src={images[this.props.player.avatar]} alt={this.props.player.avatar}/>
        <div>{this.props.player.name}</div>
      </div>
    )
  }
}

export {Game}
