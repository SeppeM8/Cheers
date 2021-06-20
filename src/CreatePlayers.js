import React from 'react';
import './CreatePlayers.css';


function importAll(r) {
  var images = {}
  for (var item of r.keys()) {
    images[item.replace('./', '')] = r(item);
  }
  return images;
}

const images = importAll(require.context('./Avatars', false, /\.(png|jpe?g|svg)$/));

class CreatePlayers extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      players: [],
      male: true,
      name: '',
      avatar: 'Dummie.png',
      avatarPicker: false
    }    

    this.handleChange = this.handleChange.bind(this);
    this.addPlayer = this.addPlayer.bind(this);
    this.play = this.play.bind(this);
    this.choseAvatar = this.choseAvatar.bind(this);
    this.pickAvatar = this.pickAvatar.bind(this);
    this.availableAvatars = this.availableAvatars.bind(this);
    this.editPlayer = this.editPlayer.bind(this);


    // DEBUG =======
    this.state.players = [
      {name: 'Seppe', male: true, avatar: 'Avatar01.png'},
      {name: 'Falco', male: true, avatar: 'Avatar02.png'},
      {name: 'Laura', male: false, avatar: 'Avatar03.png'},
      {name: 'Ward', male: true, avatar: 'Avatar05.png'},
      {name: 'Cato', male: false, avatar: 'Avatar04.png'},
    ];
    this.play();
    // =============
  }

  handleChange(event) {
    this.setState({name: event.target.value});
  }

  addPlayer() {
    // Check of naam ingevuld is
    if (this.state.name.length === 0) {
      alert("Geen naam ingegeven");
      return
    }

    // Check of naam al bestaat
    for (var existing of this.state.players) {
      if (this.state.name === existing.name) {
        alert("Naam bestaat al");
        return
      }
    }

    // Check Avatar
    if (this.state.avatar === "Dummie.png") {
      alert("Kies een avatar");
      return
    }

    const newPlayers = this.state.players.concat({name: this.state.name, male: this.state.male, avatar: this.state.avatar});
    this.setState({players: newPlayers, name: '', male: true, avatar: "Dummie.png"});
  }

  play() {
    if (this.state.players.length < 2) {
      alert('Te weinig spelers');
      return;
    }
    this.props.startGame(this.state.players);
  }

  choseAvatar() {
    this.setState({avatarPicker: true})
  }

  pickAvatar(avatar) {
    console.log(avatar);
    this.setState({avatar: avatar, avatarPicker: false});
  }

  availableAvatars() {
    var all = [];
    for (var key in images) {
      if (key !== "Dummie.png") {
        all.push(key);
      }
    }
    for (var player of this.state.players) {
      all.splice(all.indexOf(player.avatar), 1);
    }
    return all;
  }

  editPlayer(editPlayer) {
    var players = [];
    for (var player of this.state.players) {
      if (player.name !== editPlayer.name) {
        players.push(player);
      }
    }
    this.setState({players: players, name: editPlayer.name, male: editPlayer.male, avatar: editPlayer.avatar});
  }

  render() {
    if (this.state.avatarPicker) {
      return (
        <div>
          <AvatarPicker images={this.availableAvatars()} onClick={(avatar) => this.pickAvatar(avatar)} ></AvatarPicker>
        </div>
      )
    }

    return (
      <div style={{margin: '10px'}}>
          {this.state.players.map((player) => <PlayerItem key={player.name} player={player} onClick={(player) => this.editPlayer(player)}/>)}
        <div className='create-container'>
          <div className='data'>

            <label>{'Naam: '}
              <input type='text' placeholder='Naam' value={this.state.name} onChange={this.handleChange}/>
            </label>

            <button id="gender" style={{width: '50px'}} onClick={() => this.setState({male: !this.state.male})}>
              {this.state.male ? 'Man' : 'Vrouw'}
            </button>

            <button onClick={() => this.addPlayer()}>
              Voeg toe
            </button>
          </div>
          <div className='avatar'><img src={images[this.state.avatar].default} onClick={() => this.choseAvatar()} alt='Avatar'/></div>          
        </div>
        <div>
          <button onClick={() => this.play()}> Start</button>
        </div>
      </div>
    )
  }
}

class PlayerItem extends React.Component {
  render() {
    return (
      <div className='player-item' onClick={() => this.props.onClick(this.props.player)}>
        <img className='mini-avatar' key={this.props.player.avatar} src={images[this.props.player.avatar].default} alt={this.props.player.avatar}/>
        <div className='name'>{this.props.player.name} {this.props.player.male ? "(M)" : "(V)"}</div>
      </div>
    )
  }
}

class AvatarPicker extends React.Component {

  render() {
    return (
      <div className='grid-container'>
        {this.props.images.map((item, index) => {
          return <img className='grid-item' key={item} src={images[item].default} onClick={() => this.props.onClick(item)} alt={item}/>
        })}
      </div>
    )
  }
}

export {CreatePlayers}
