import './App.css';
import {CreateUsers} from './Users.js'
import React from 'react';



class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {createUsers: true}

    this.startGame = this.startGame.bind(this);
  }

  startGame(users) {
    this.setState({users: users, createUsers: false});
  }

  render() {
    if (this.state.createUsers) {
      return (
        <CreateUsers startGame={(users) => this.startGame(users)}></CreateUsers>
      );
    }

    return (
      <div>
        {JSON.stringify(this.state.users)}
      </div>
    )
  }
}

export default App;
