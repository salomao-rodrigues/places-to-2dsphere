import React, { Component } from 'react';
import Map from "./Map";

import './App.css';
const googleMapURL = "https://maps.googleapis.com/maps/api/js?&v=3.exp&libraries=geometry,drawing,places";

class App extends Component {
  state = {
    apiKey: null,
    lat: null,
    long: null,
    fetching: false
  };

  getLocationHandler = () => {
    this.setState({ fetching: true });

    window.navigator.geolocation.getCurrentPosition(
      ({ coords }) => this.setState({
        lat: coords.latitude,
        long: coords.longitude,
        fetching: false
      })
    );
  };

  render() {
    const { apiKey, fetching, lat, long } = this.state;
    return (
      <div className="App">
        <header>
          <h1>Google Places to Mongo 2dsphere</h1>
        </header>
        <label>
          API Key
          <input
            type="text"
            onChange={ ({ target }) => this.setState({ apiKey: target.value }) }
            name="apikey" value={ apiKey || ""}/>
        </label>
        <h2>Use current location</h2>
        <div><b>Latitude</b>: { lat || 'not set' }</div>
        <div><b>Longitude</b>: { long || 'not set'}</div>
        <button onClick={ this.getLocationHandler }>Get location</button>
        { apiKey && lat && long && <Map
            googleMapURL={`${googleMapURL}&key=${apiKey}`}
            lat={ lat }
            lng={ long }
          />
        }
      </div>
    );
  }
}

export default App;
