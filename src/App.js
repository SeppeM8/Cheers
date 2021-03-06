import './App.css';
import {CreatePlayers} from './CreatePlayers.js';
import {Game} from './Game.js';
import React from 'react';
import {getCardCounts} from './Cards.js';
import { SettingsScreen } from './Settings';



class App extends React.Component {

  constructor(props) {
    super(props);

    var settings = this.resetSettings(true);

    this.state = {
      createPlayers: true,
      showSettings: false,
      settings: settings,
      cardCounts: getCardCounts()
    }

    this.startGame = this.startGame.bind(this);
    this.changeSetting = this.changeSetting.bind(this);
    this.gotoSettings = this.gotoSettings.bind(this);
    this.resetSettings = this.resetSettings.bind(this);
  }

  changeSetting(key, value) {
    var settings = this.state.settings; 
    if (key=== "order" || key === "drinking") {
      settings[key] = value;
    } else {      
      settings.total += value - settings[key];
      settings[key] = parseFloat(value);

    }
    this.setState({settings: settings});
  }  

  resetSettings(init) {
    var drinking;
    var order;
    if (init) {
      drinking = 50;
      order = { value: 'semiRandom', label: 'Semi-random'};
    } else {
      drinking = this.state.settings.drinking;
      order = this.state.settings.order;
    }
    const counts = getCardCounts();
    var max = 0;
    var key;
    for (key in counts) {
      if (counts[key] > max) {
        max = counts[key];
      }
    }
    var settings = {drinking: drinking, order: order};
    var total = 0;
    for (key in counts) {
      settings[key] = counts[key]/max*100;
      total += counts[key]/max*100;
    }
    settings.total = total;

    if (init) {
      return settings;
    } else {
      this.setState({settings: settings, cardCounts: counts});
    }

  }

  startGame(players) {
    this.setState({players: players, settings: this.state.settings,createPlayers: false});
  }

  gotoSettings(yes) {
    this.setState({showSettings: yes});
  }
  
  renderSettings() {    
    if (this.state.showSettings) {
      return (
        <SettingsScreen
          settings={this.state.settings}
          changeSetting={this.changeSetting}
          cardCounts={this.state.cardCounts}
          resetSettings={this.resetSettings}
          gotoSettings={this.gotoSettings}
        />
      )
    }
  }

  render() {
    
    if (this.state.createPlayers) {
      return (
        <div>
          {this.renderSettings()}
          <CreatePlayers
            startGame={(players) => this.startGame(players)}
            gotoSettings={this.gotoSettings}
          />
          
          <div className="suggestions">
            Stel nieuwe kaarten voor: <a href="https://forms.gle/Kt7AGReuFAyBwsvF6" target="_blank" rel="noreferrer">Form</a>
          </div>
        </div>
      );
    }

    return (
      <div>
        {this.renderSettings()}
        <Game 
          players={this.state.players}
          settings={this.state.settings}
          gotoSettings={this.gotoSettings}
          changeSetting={this.changeSetting}
        />
        
        <div className="suggestions">
          Stel nieuwe kaarten voor: <a href="https://forms.gle/Kt7AGReuFAyBwsvF6" target="_blank" rel="noreferrer">Form</a>
        </div>
      </div>
    )
  }
}

export default App;
