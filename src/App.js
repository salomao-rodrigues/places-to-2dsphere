import React, { Component } from 'react';
import debounce from "lodash/debounce";
import Map from "./Map";

const googleMapURL = "https://maps.googleapis.com/maps/api/js?&v=3.exp&libraries=geometry,drawing,places";
const defaultState = {
  apiKey: null,
  lat: null,
  lng: null,
  userRadius: 3000,
  fetching: false,
  locations: []
};

class App extends Component {
  state = defaultState;

  componentDidMount() {
    try {
      const savedState = localStorage.getItem("p2d-state");

      if (savedState) {
        this.setState(JSON.parse(savedState));
      }
    } catch (err) {
      this.setState(defaultState);
    }
  }

  persistState = debounce(() => {
    localStorage.setItem("p2d-state", JSON.stringify(this.state));
  }, 1000);

  getLocationHandler = () => {
    this.setState({ fetching: true });

    window.navigator.geolocation.getCurrentPosition(
      ({ coords }) => this.setState({
        lat: coords.latitude,
        lng: coords.longitude,
        fetching: false
      }, this.persistState())
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
      .then(results => locations = results)
      .catch(console.error)
      .finally(() => this.setState(
        { locations, fetching: false },
        this.persistState()
      ));
  };

  updateFormValue = (key, value) => {
    this.setState({ [key]: value }, this.persistState());
  };

  render() {
    const { apiKey, userRadius, fetching, lat, lng, locations } = this.state;
    const getPlacesDisabled = fetching || !apiKey || !userRadius || !lat || !lng;
    return (
      <div className="container">
        <div className="row">
          <h1>Places to 2DSphere</h1>
          <p>
            Proof of concept on saving places from&nbsp;
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://cloud.google.com/maps-platform/places/"
            >Google Places API
            </a> into&nbsp;
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://docs.mongodb.com/manual/core/2dsphere/"
            >2DSphere MongoDB
            </a> indexed collections.
          </p>
        </div>
        <div className="row">
          <h2>Config</h2>
        </div>
        <div className="row">
          <div className="col-12 form-group">
            <label htmlFor="apiKey">API Key</label>
            <input
              id="apiKey"
              className="form-control"
              placeholder="Google Places API Key"
              type="text"
              onChange={ ({ target }) => this.updateFormValue("apiKey", target.value) }
              value={ apiKey || "" }
            /> 
          </div>
          <div className="col-12 form-group">
            <label htmlFor="userRadius">Scan Radius (in meters)</label>
            <input
              id="userRadius" 
              className="form-control"
              type="text"
              onChange={ ({ target }) => this.updateFormValue("userRadius", target.value) }
              value={ userRadius || "" }
              />
          </div>
        </div>
        <div className="row">
          <h2>Location</h2>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="latitude">Latitude:</label>
              <input
                id="latitude"
                className="form-control"
                type="text"
                readOnly
                value={ lat || "" }
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="longitude" >Longitude:</label>
              <input
                id="longitude"
                className="form-control"
                type="text"
                readOnly
                value={ lng || "" }
              />
            </div>
          </div>
        </div>
        <div className="row">
          <button disabled={ fetching } onClick={ !fetching ? this.getLocationHandler : null }>Use Current Location</button>
        </div>
        <div className="row">
          <h2>Map</h2>
        </div>
        <div>
          <div>Get places around me
            <button
              onClick={ !getPlacesDisabled ? this.getPlaces : null }
              disabled={ getPlacesDisabled }>
              Ask server
            </button>
          </div>
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
