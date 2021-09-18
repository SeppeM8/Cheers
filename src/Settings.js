import React from 'react';
import './Settings.css';
import save from './Images/save.png';
import reset from './Images/reset.png';

class SettingsScreen extends React.Component {

  render() {
    return (
      
      <div className="settings-background">
        <div className="settings-screen">
          <div className="hbox">
            <div className="title">Settings</div>
          </div>
          <div className="hbox">
            <div className= "slider-box">
              <div className="slider-title">Drinking level</div>
              <div title={this.props.cardCounts.solo + " Cards available"}><input className="slider drinking-slider" type="range" min="0" max="100" value={this.props.settings.drinking} id="drinking" onChange={(e) => this.props.changeSetting("drinking", e.target.value)}/></div>
            </div>
          </div>
          <div className="hbox">
            <div className="row">
              <div className="left-column">
                <div className= "slider-box">
                  <div className="slider-title">Solo</div>
                  <div title={this.props.cardCounts.solo + " Cards available"}><input className="slider" type="range" min="0" max="100" value={this.props.settings.solo} id="solo" onChange={(e) => this.props.changeSetting("solo", e.target.value)}/></div>
                </div>
                <div className= "slider-box">
                  <div className="slider-title">Duo</div>
                  <div title={this.props.cardCounts.duo + " Cards available"}><input className="slider" type="range" min="0" max="100" value={this.props.settings.duo} id="duo" onChange={(e) => this.props.changeSetting("duo", e.target.value)}/></div>
                </div>
                <div className= "slider-box">
                  <div className="slider-title">Group</div>
                  <div title={this.props.cardCounts.group + " Cards available"}><input className="slider" type="range" min="0" max="100" value={this.props.settings.group} id="group" onChange={(e) => this.props.changeSetting("group", e.target.value)}/></div>
                </div>
                <div className= "slider-box">
                  <div className="slider-title">Never Have I Ever</div>
                  <div title={this.props.cardCounts.nhie + " Cards available"}><input className="slider" type="range" min="0" max="100" value={this.props.settings.nhie} id="nhie" onChange={(e) => this.props.changeSetting("nhie", e.target.value)}/></div>
                </div>
              </div>
              <div className="right-column">
                <div className= "slider-box">
                  <div className="slider-title">Staying solo</div>
                  <div title={this.props.cardCounts.stayingSolo + " Cards available"}><input className="slider" type="range" min="0" max="100" value={this.props.settings.stayingSolo} id="stayingSolo" onChange={(e) => this.props.changeSetting("stayingSolo", e.target.value)}/></div>
                </div>          
                <div className= "slider-box">
                  <div className="slider-title">Staying duo</div>
                  <div title={this.props.cardCounts.stayingDuo + " Cards available"}><input className="slider" type="range" min="0" max="100" value={this.props.settings.stayingDuo} id="nhie" onChange={(e) => this.props.changeSetting("stayingDuo", e.target.value)}/></div>
                </div>         
                <div className= "slider-box">
                  <div className="slider-title">Staying group</div>
                  <div title={this.props.cardCounts.stayingGroup + " Cards available"}><input className="slider" type="range" min="0" max="100" value={this.props.settings.stayingGroup} id="nhie" onChange={(e) => this.props.changeSetting("stayingGroup", e.target.value)}/></div>
                </div>              
                <div className="button-box">
                  <img className="reset-button button" src={reset} alt="Reset" onClick={() => this.props.resetSettings()}/>
                  <img className="save-button button" src={save} alt="Save" onClick={() => this.props.gotoSettings(false)}/>
                </div>
              </div>
            </div>
          </div>
        </div>   
      </div>
    )
  }
}



export {SettingsScreen}