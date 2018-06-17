import React from "react";
import Map from "./Map";

import "./MapContainer.css";

const googleMapURL = "https://maps.googleapis.com/maps/api/js?&v=3.exp&libraries=geometry,drawing,places";
const mapElements = {
  loadingElement: <div style={{ height: `100%` }} />,
  containerElement: <div style={{ height: `400px` }} />,
  mapElement: <div style={{ height: `100%` }} />,
};

const MapContainer = (props) => (
  props.apiKey && props.lat && props.lng
    ? <Map
        googleMapURL={`${googleMapURL}&key=${props.apiKey}`}
        { ...props }
        { ...mapElements }
      />
    : <div className="map-placeholder">Please add config values to load map</div>
);

export default MapContainer;
