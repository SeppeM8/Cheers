import './App.css';
import {CreatePlayers} from './CreatePlayers.js';
import {Game} from './Game.js';
import React from 'react';



class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {createPlayers: true}

    this.startGame = this.startGame.bind(this);
  }

  startGame(players) {
    this.setState({players: players, createPlayers: false});
  }

  render() {
    if (this.state.createPlayers) {
      return (
        <CreatePlayers startGame={(players) => this.startGame(players)}></CreatePlayers>
      );
    }

    return (
      <Game players={this.state.players}></Game>
    )
  }
}

export default App;
