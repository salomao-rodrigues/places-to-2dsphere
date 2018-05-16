import React, { Component } from 'react';
import Map from "./Map";

import logo from './logo.svg';
import './App.css';
const googleMapURL = "https://maps.googleapis.com/maps/api/js?&v=3.exp&libraries=geometry,drawing,places";

class App extends Component {
  state = {
    unsavedKey: "",
    apiKey: null
  };

  render() {
    const { unsavedKey, apiKey } = this.state;
    console.log(this.state);
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Google Places to Mongo 2dsphere</h1>
        </header>

        { apiKey && <Map googleMapURL={`${googleMapURL}&key=${apiKey}`}/> }
        <label>
          API Key
          <input
            type="password"
            onChange={ ({ target }) => this.setState({ unsavedKey: target.value }) }
            name="apikey" value={ unsavedKey }/>
          <button onClick={ () => this.setState({ apiKey: unsavedKey })}>Update</button>
        </label>
      </div>
    );
  }
}

export default App;
