import React from 'react';
import './CreatePlayers.css';
import male from './Images/male.png';
import female from './Images/female.png';
import check from './Images/check.png';
import play from './Images/play.png';
import gear from './Images/gear.png';


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
      avatarPicker: false,
      genderImage: male
    }    

    this.handleChange = this.handleChange.bind(this);
    this.addPlayer = this.addPlayer.bind(this);
    this.play = this.play.bind(this);
    this.choseAvatar = this.choseAvatar.bind(this);
    this.pickAvatar = this.pickAvatar.bind(this);
    this.availableAvatars = this.availableAvatars.bind(this);
    this.editPlayer = this.editPlayer.bind(this);
    this.getPlayerTable = this.getPlayerTable.bind(this);
    this.changeGender = this.changeGender.bind(this);


    // DEBUG =======
    if (false) {
      this.state.players = [
        {name: 'Seppe', male: true, avatar: 'Avatar01.png'},
        {name: 'Falco', male: true, avatar: 'Avatar02.png'},
        {name: 'Laura', male: false, avatar: 'Avatar03.png'},
        {name: 'Ward', male: true, avatar: 'Avatar05.png'},
        {name: 'Cato', male: false, avatar: 'Avatar04.png'},
        {name: 'Dries', male: true, avatar: 'Avatar06.png'},
        {name: 'Jordy', male: true, avatar: 'Avatar08.png'},
        {name: 'Alice', male: false, avatar: 'Avatar07.png'},
      ];
      //this.play();
    }
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
    this.setState({players: newPlayers, name: '', male: true, avatar: "Dummie.png", genderImage: male});
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

  changeGender(isMale) {
    if (isMale) {
      this.setState({male: true, genderImage: male});
    } else {
      this.setState({male: false, genderImage: female});
    }
  }

  getPlayerTable() {
    var players = [];
    var row = [];
    for (var i in this.state.players) {
      row.push(this.state.players[i]);
      if (i % 5 === 4) {
        players.push(row);
        row = [];
      }
    }
    if (row.length !== 0) {
      players.push(row);
    }

    return ( 
      <div>
        {players.map((row) => 
          <div className="player-row" key={JSON.stringify(row[0])}>
            {row.map((player) => <PlayerItem key={player.name} player={player} onClick={(player) => this.editPlayer(player)}/>)}
          </div>)}
      </div>
    )
  }

  render() {
    this.getPlayerTable();
    if (this.state.avatarPicker) {
      return (
        <div>
          <AvatarPicker images={this.availableAvatars()} onClick={(avatar) => this.pickAvatar(avatar)} ></AvatarPicker>
        </div>
      )
    }

    return (
      <div> 
        {this.getPlayerTable()}
        <div className='data'>
          <div className='avatar'>
            <img src={images[this.state.avatar]} onClick={() => this.choseAvatar()} alt='Avatar'/>
          </div> 
          <div className='hbox'>
            <input className="name-field" type='text' placeholder='Name' value={this.state.name} onChange={this.handleChange}/>
            <div className="gender-button-box">
              <img className="gender-button button" src={this.state.genderImage} alt={this.state.male ? "Male" : "Female"} onClick={() => this.changeGender(!this.state.male)}/>
            </div>
            <img className="check-button button" src={check} alt="Add player" onClick={() => this.addPlayer()}/>  
          </div> 
          <div className="hbox"> 
            <img className="play-button button" src={play} alt="Play" onClick={() => this.play()}/>
            <img className="settings-button button" src={gear} alt="Settings" onClick={() => this.props.gotoSettings(true)}/>
          </div>
        </div>
      </div>
    )
  }
}

class PlayerItem extends React.Component {
  render() {
    return (
      <div className='player-item' onClick={() => this.props.onClick(this.props.player)}>
        <img className='mini-avatar' key={this.props.player.avatar} src={images[this.props.player.avatar]} alt={this.props.player.avatar}/>
        <div className='name'>{this.props.player.name} {this.props.player.male ? "(M)" : "(F)"}</div>
      </div>
    )
  }
}

class AvatarPicker extends React.Component {

  render() {
    return (
      <div className='grid-container'>
        {this.props.images.map((item, index) => {
          return <img className='grid-item' key={item} src={images[item]} onClick={() => this.props.onClick(item)} alt={item}/>
        })}
      </div>
    )
  }
}


export {CreatePlayers}
