import React, { Component } from 'react';
import Map from "./Map";

import './App.css';
const googleMapURL = "https://maps.googleapis.com/maps/api/js?&v=3.exp&libraries=geometry,drawing,places";

class App extends Component {
  state = {
    apiKey: null,
    lat: null,
    lng: null,
    userRadius: 3000,
    fetching: false,
    locations: null
  };

  getLocationHandler = () => {
    this.setState({ fetching: true });

    window.navigator.geolocation.getCurrentPosition(
      ({ coords }) => this.setState({
        lat: coords.latitude,
        lng: coords.longitude,
        fetching: false
      })
    );
  };

  getPlaces = () => {
    let locations;
    this.setState({ fetching: true });
    fetch("http://localhost:3001/places", {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      qs: {
        apiKey: this.state.apiKey,
        latitude: this.state.lat,
        longitude: this.state.lng,
        userRadius: this.state.userRadius
      }
    }).then(response => response.json())
      .then(locations => this.setState({ locations }))
      .catch(console.error);
  };

  render() {
    const { apiKey, userRadius, fetching, lat, lng, locations } = this.state;
    const getPlacesDisabled = fetching || !apiKey || !userRadius || !lat || !lng;
    return (
      <div className="container-fluid">
        
          <h1>Google Places to Mongo 2DSphere</h1>
        <div>
          <label>
            API Key
            <input
              type="text"
              onChange={ ({ target }) => this.setState({ apiKey: target.value }) }
              name="apiKey" value={ apiKey || "" }/> 
          </label>
        </div>
        <div>
          <label>
            Scan Radius
            <input
              type="text"
              onChange={ ({ target }) => this.setState({ userRadius: Number(target.value) }) }
              name="userRadius" value={ userRadius || "" }/> 
          </label>
        </div>
        <h2>Use current location</h2>
        <div><b>Latitude</b>: { lat || 'not set' }</div>
        <div><b>Longitude</b>: { lng || 'not set'}</div>
        <button disabled={ fetching } onClick={ !fetching ? this.getLocationHandler : null }>Get location</button>
        <div>Get places around me
          <button
            onClick={ !getPlacesDisabled ? this.getPlaces : null }
            disabled={ getPlacesDisabled }>
            Ask server
          </button>
        </div>
        { apiKey && lat && lng && <Map
            googleMapURL={`${googleMapURL}&key=${apiKey}`}
            lat={ lat }
            lng={ lng }
            locations={ locations }
          />
        }
      </div>
    );
  }
}

export default App;
