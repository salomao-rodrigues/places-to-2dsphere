import React, { Fragment } from "react";
import { compose, withProps } from "recompose";
import { withGoogleMap, withScriptjs, GoogleMap, Marker } from "react-google-maps";

class Map extends React.Component {
  render() {
    const { lat, lng } = this.props;
    return <Fragment>
      <GoogleMap
        defaultZoom={8}
        defaultCenter={{ lat, lng }}
      >
        <Marker position={{ lat, lng }} />
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
