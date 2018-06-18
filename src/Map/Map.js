import React, { Fragment } from "react";
import { compose } from "recompose";
import { withGoogleMap, withScriptjs, Circle, GoogleMap, Marker } from "react-google-maps";

const Map = ({ lat, lng, locations, scanned, setLocation, radius }) => (
  <Fragment>
    <GoogleMap
      defaultZoom={ 11 }
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
        radius={ +radius }
        defaultOptions={{ clickable: false, fillColor: "#FF0000" }}
      />
      { scanned.map(({ obj: { loc: { coordinates }, radius}}, index) => (
        <Circle
          key={ index }
          center={{ lat: coordinates[0], lng: coordinates[1] }}
          radius={ +radius }
          defaultOptions={{ clickable: false }}
        />
      ))}
    </GoogleMap>
  </Fragment>
);

export default compose(
  withScriptjs,
  withGoogleMap
)(Map);
