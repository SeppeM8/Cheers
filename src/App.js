import './App.css';
import {CreatePlayers} from './CreatePlayers.js';
import {Game} from './Game.js';
import React from 'react';
import {getCardCounts} from './Cards.js';

import background from './Images/Background.jpg';



class App extends React.Component {
  constructor(props) {
    super(props);

    const counts = getCardCounts();
    var max = 0;
    var key;
    for (key in counts) {
      if (counts[key] > max) {
        max = counts[key];
      }
    }
    var settings = {};
    var total = 0;
    for (key in counts) {
      settings[key] = counts[key]/max*100;
      total += counts[key]/max*100;
    }
    settings.total = total;

    this.state = {
      createPlayers: true,
      settings: settings,
      cardCounts: counts
    }

    this.startGame = this.startGame.bind(this);
    this.changeSetting = this.changeSetting.bind(this);
  }

  changeSetting(key, value) { 
    var settings = this.state.settings;
    settings.total += value - settings[key];
    settings[key] = parseFloat(value);
    this.setState({settings: settings});
  }  

  startGame(players) {
    this.setState({players: players, settings: this.state.settings,createPlayers: false});
  }

  render() {
    if (this.state.createPlayers) {
      return (
        <CreatePlayers startGame={(players) => this.startGame(players)} changeSetting={this.changeSetting} settings={this.state.settings} cardCounts={this.state.cardCounts}></CreatePlayers>
      );
    }

    return (
      <div class="bg" style={{backgroundImage: `url(${background})`}}>
        <Game players={this.state.players} settings={this.state.settings}></Game>
      </div>
    )
  }
}

export default App;
