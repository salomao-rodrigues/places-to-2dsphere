import React, { Fragment } from "react";
import { compose, withProps } from "recompose";
import { withGoogleMap, withScriptjs, GoogleMap, Marker } from "react-google-maps";

class Map extends React.Component {
  render() {
    return <Fragment>
      <GoogleMap
        defaultZoom={8}
        defaultCenter={{ lat: -34.397, lng: 150.644 }}
      >
        <Marker position={{ lat: -34.397, lng: 150.644 }} />
      </GoogleMap>
    </Fragment>;
  }
}

export default compose(
  withProps({
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)(Map);
