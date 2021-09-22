import React from 'react';
import Select from 'react-select'
import './Settings.css';
import save from './Images/save.png';
import reset from './Images/reset.png';


const orderOptions = [
  { value: 'strict', label: 'Strict'},
  { value: 'semiRandom', label: 'Semi-random'},
  { value: 'random', label: 'Random'}
];

const orderStyle = {
  option: (provided, state) => ({
    ...provided,
    background: "linear-gradient(90deg, rgba(176,32,120,1) 0%, rgba(105,78,181,1) 100% )",
    border: "1px solid white",
    opacity: "0.7",
    borderRadius: "20px",
    width: "190px",    
    display: "table",
    margin: "5px auto",
    position: "relative",
    textAlign: "center",
    ':hover': {
      opacity: "1"
    }    
  }),
  menu: (provided, state) => ({
    ...provided,
    background: "linear-gradient(45deg, rgba(4,5,33,1) 0%, rgba(58,7,110,1) 100% )",
    border: "3px solid white",    
    borderRadius: "20px"
  }),
  control: (provided, state) => ({
    ...provided,
    background: "linear-gradient(90deg, rgba(176,32,120,1) 0%, rgba(105,78,181,1) 100% )",    
    borderRadius: "20px",  
    color: "white",
    height: "27px",
    minHeight: "27px",
    border: "2px solid white",  
    opacity: "0.8",
    ':hover': {
      opacity: "1"
    }
  }),
  dropdownIndicator: (provided, state) => ({
    ...provided,
    color: "white",
    position: "relative",
    bottom: "6px"
  }),
  singleValue: () => ({
    color: "white"
  }),
  valueContainer: (provided, state) => ({
    marginLeft: "15px",
    height: "20px",
    position: "relative",
    bottom: "8px"
  }),
  container: (provided, state) => ({
    ...provided,
    height: "24px",
    zIndex: "5"
  }),
  indicatorSeparator: (provided, state) => ({
    ...provided,
    position: "relative",
    bottom: "6px"
  })
}

class SettingsScreen extends React.Component {

  handleSelect = selected => {
    this.props.changeSetting("order", selected);
  }

  render() {
    return (
      
      <div className="settings-background">
        <div className="settings-screen">
          <div className="hbox">
            <div className="title">Settings</div>
          </div>
          <div className="hbox">
            <div className="row">
              <div className="left-column">
                <div className= "slider-box">
                  <div className="slider-title">Drinking level</div>
                  <div><input className="slider drinking-slider" type="range" min="0" max="100" value={this.props.settings.drinking} id="drinking" onChange={(e) => this.props.changeSetting("drinking", e.target.value)}/></div>
                </div>                
                <div className="hspace"/>
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
                  <div className="slider-title">Player order</div>
                  <Select 
                    value={this.props.settings.order}
                    options={orderOptions}
                    styles={orderStyle}  
                    onChange={this.handleSelect}
                    isSearchable={false}
                  />
                </div>
                <div className="hspace"/>
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
