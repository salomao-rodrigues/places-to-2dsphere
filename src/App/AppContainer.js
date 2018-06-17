import React from "react";
import debounce from "lodash/debounce";
import qs from "qs";
import App from "./App";

const defaultState = {
  apiKey: null,
  host: null,
  lat: null,
  lng: null,
  userRadius: 3000,
  fetching: false,
  locations: [],
  scanned: []
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
    const { apiKey, host, lat, lng, userRadius, scanned } = this.state;
    let locations;
    let newScan = false;

    this.setState({ fetching: true });
    const queryString = qs.stringify({ apiKey, lat, lng, userRadius });
  
    fetch(`${host.replace(/\/$/, "")}/places?${queryString}`, {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    }).then(response => response.json())
      .then(({ results, scannedApi, error }) => {
        locations = !error ? results : []
        newScan = scannedApi;
      })
      .catch(console.error)
      .finally(() => this.setState({
        locations,
        fetching: false,
        scanned: newScan ? [ ...scanned, { lat, lng }] : scanned
      },this.persistState()));
  };

  setLocation = (lat, lng) => {
    this.setState({ lat, lng });
  };

  deleteAllPlaces = () => {
    if (!window.confirm("This will erase all data from DB.")) {
      return;
    }

    fetch(`${this.state.host.replace(/\/$/, "")}/places`, {
      method: "DELETE",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    }).then(() => this.setState(
      { locations: [] },
      this.persistState()
    )).catch(console.error);
  }

  render() {
    const { fetching, apiKey, userRadius, lat, lng } = this.state;
    const actionsDisabled = fetching || !apiKey || !userRadius || !lat || !lng;

    return <App
      { ...this.state }
      actionsDisabled={ actionsDisabled }
      getPlaces={ this.getPlaces }
      getLocationHandler={ !fetching ? this.getLocationHandler : null }
      setLocation={ this.setLocation }
      updateFormValue={ this.updateFormValue }
      deleteAllPlaces={ this.deleteAllPlaces }
    />
  }
}

export default AppContainer;
