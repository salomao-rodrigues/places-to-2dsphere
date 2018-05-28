import React from "react";
import Map from "./Map";

import "./MapContainer.css";

const googleMapURL = "https://maps.googleapis.com/maps/api/js?&v=3.exp&libraries=geometry,drawing,places";
const mapElements = {
  loadingElement: <div style={{ height: `100%` }} />,
  containerElement: <div style={{ height: `400px` }} />,
  mapElement: <div style={{ height: `100%` }} />,
};

class MapContainer extends React.Component {
  render() {
    const { apiKey, lat, lng } = this.props;

    return apiKey && lat && lng
      ? <Map
          googleMapURL={`${googleMapURL}&key=${apiKey}`}
          { ...this.props }
          { ...mapElements }
        />
      : <div className="map-placeholder">Please add config values to load map</div>
  }
}

export default MapContainer;
