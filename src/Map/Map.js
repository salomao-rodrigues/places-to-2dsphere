import React, { Fragment } from "react";
import { compose, withProps } from "recompose";
import { withGoogleMap, withScriptjs, GoogleMap, Marker } from "react-google-maps";

const Map = ({ lat, lng, locations }) => (
  <Fragment>
    <GoogleMap
      defaultZoom={15}
      defaultCenter={{ lat, lng }}
    >
      <Marker position={{ lat, lng }} />
      { locations.map((marker, index) => {
        const { name, icon, loc: { coordinates } } = marker.obj;
        return (
          <Marker
            key={ index }
            name={ name }
            icon={{
              url: icon,
              scaledSize: new window.google.maps.Size(22, 22)
            }}
            position={{ lat: coordinates[0], lng: coordinates[1] }}
          />
        );
      })}
    </GoogleMap>
  </Fragment>
);

export default compose(
  withProps({
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)(Map);
