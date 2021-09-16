import React from 'react';
import './Settings.css';

class SettingsScreen extends React.Component {

  
   render() {    
    <CardSettings settings={this.props.settings} changeSetting={this.props.changeSetting} cardCounts={this.props.cardCounts}/>
   }
}