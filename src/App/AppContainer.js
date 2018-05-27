import React from 'react';
import debounce from "lodash/debounce";
import qs from "qs";
import App from "./App";

const defaultState = {
  apiKey: null,
  lat: null,
  lng: null,
  userRadius: 3000,
  fetching: false,
  locations: []
};

class AppContainer extends React.Component {
  state = { ...defaultState };

  componentDidMount() {
    try {
      const savedState = localStorage.getItem("p2d-state") || "{}";
      this.setState(JSON.parse(savedState));
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

  updateFormValue = (key, value) => {
    this.setState({ [key]: value }, this.persistState());
  };

  getPlaces = () => {
    const { apiKey, lat, lng, userRadius } = this.state;
    let locations;

    this.setState({ fetching: true });
    const queryString = qs.stringify({ apiKey, lat, lng, userRadius });
  
    fetch(`http://localhost:3001/places?${queryString}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(response => response.json())
      .then(results => locations = !results.error ? results : [])
      .catch(console.error)
      .finally(() => this.setState(
        { locations, fetching: false },
        this.persistState()
      ));
  };

  render() {
    const { fetching } = this.state;
    return <App
      { ...this.state }
      getPlaces={ this.getPlaces }
      getLocationHandler={ !fetching ? this.getLocationHandler : null }
      updateFormValue={ this.updateFormValue }
    />
  }
}

export default AppContainer;
