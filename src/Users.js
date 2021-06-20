import React from 'react';
import './Users.css';


function importAll(r) {
  var images = {}
  for (var item of r.keys()) {
    images[item.replace('./', '')] = r(item);
  }
  return images;
}

const images = importAll(require.context('./Avatars', false, /\.(png|jpe?g|svg)$/));

class CreateUsers extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      users: [],
      male: true,
      name: '',
      avatar: 'Dummie.png',
      avatarPicker: false
    }    

    this.handleChange = this.handleChange.bind(this);
    this.addUser = this.addUser.bind(this);
    this.play = this.play.bind(this);
    this.choseAvatar = this.choseAvatar.bind(this);
    this.pickAvatar = this.pickAvatar.bind(this);
    this.availableAvatars = this.availableAvatars.bind(this);
    this.editUser = this.editUser.bind(this);

    this.state.users = [
      {name: 'Seppe', male: true, avatar: 'Avatar01.png'},
      {name: 'Falco', male: true, avatar: 'Avatar02.png'},
      {name: 'Laura', male: false, avatar: 'Avatar05.png'},
      {name: 'Ward', male: true, avatar: 'Avatar03.png'},
      {name: 'Cato', male: false, avatar: 'Avatar04.png'},
    ];
  }

  handleChange(event) {
    this.setState({name: event.target.value});
  }

  addUser() {
    // Check of naam ingevuld is
    if (this.state.name.length === 0) {
      alert("Geen naam ingegeven");
      return
    }

    // Check of naam al bestaat
    for (var existing of this.state.users) {
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

    const newUsers = this.state.users.concat({name: this.state.name, male: this.state.male, avatar: this.state.avatar});
    this.setState({users: newUsers, name: '', male: true, avatar: "Dummie.png"});
  }

  play() {
    if (this.state.users.length < 2) {
      alert('Te weinig spelers');
      return;
    }
    this.props.startGame(this.state.users);
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
    for (var user of this.state.users) {
      all.splice(all.indexOf(user.avatar), 1);
    }
    return all;
  }

  editUser(editUser) {
    var users = [];
    for (var user of this.state.users) {
      if (user.name !== editUser.name) {
        users.push(user);
      }
    }
    this.setState({users: users, name: editUser.name, male: editUser.male, avatar: editUser.avatar});
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
          {this.state.users.map((user) => <UserItem key={user.name} user={user} onClick={(user) => this.editUser(user)}/>)}
        <div className='create-container'>
          <div className='data'>

            <label>{'Naam: '}
              <input type='text' placeholder='Naam' value={this.state.name} onChange={this.handleChange}/>
            </label>

            <button id="gender" style={{width: '50px'}} onClick={() => this.setState({male: !this.state.male})}>
              {this.state.male ? 'Man' : 'Vrouw'}
            </button>

            <button onClick={() => this.addUser()}>
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

class UserItem extends React.Component {
  render() {
    return (
      <div className='user-item' onClick={() => this.props.onClick(this.props.user)}>
        <img className='mini-avatar' key={this.props.user.avatar} src={images[this.props.user.avatar].default} alt={this.props.user.avatar}/>
        <div className='name'>{this.props.user.name} {this.props.user.male ? "(M)" : "(V)"}</div>
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

export {CreateUsers}
