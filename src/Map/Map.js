import React, { Fragment } from "react";
import { compose } from "recompose";
import { withGoogleMap, withScriptjs, Circle, GoogleMap, Marker } from "react-google-maps";

const Map = ({ lat, lng, locations, setLocation, radius }) => (
  <Fragment>
    <GoogleMap
      defaultZoom={ 15 }
      defaultCenter={{ lat, lng }}
      onClick={ ({ latLng }) => setLocation(latLng.lat(), latLng.lng()) }
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
      <Circle
        center={{ lat, lng }}
        radius={ radius }
        defaultOptions={{ clickable: false }}
      />
    </GoogleMap>
  </Fragment>
);

export default compose(
  withScriptjs,
  withGoogleMap
)(Map);
