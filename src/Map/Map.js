import React, { Fragment } from "react";
import { compose } from "recompose";
import { withGoogleMap, withScriptjs, GoogleMap, Marker } from "react-google-maps";

const Map = ({ lat, lng, locations }) => (
  <Fragment>
    <GoogleMap
      defaultZoom={ 15 }
      center={{ lat, lng }}
      onClick={ (data) => {
        console.log(data);
      }}
    >
      <Marker position={{ lat, lng }} />
      { locations.map(({ obj: { name, icon, loc: { coordinates }}}, index) => (
        <Marker
          key={ index }
          name={ name }
          icon={{
            url: icon,
            scaledSize: new window.google.maps.Size(22, 22)
          }}
          position={{ lat: coordinates[0], lng: coordinates[1] }}
        />
      ))}
    </GoogleMap>
  </Fragment>
);

export default compose(
  withScriptjs,
  withGoogleMap
)(Map);
