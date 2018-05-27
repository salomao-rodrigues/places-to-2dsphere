import React from 'react';
import Map from "../Map";

const googleMapURL = "https://maps.googleapis.com/maps/api/js?&v=3.exp&libraries=geometry,drawing,places";

const App = (props) => {
  const { apiKey, userRadius, fetching, lat, lng, locations, getPlaces, getLocationHandler, updateFormValue } = props;
  const getPlacesDisabled = fetching || !apiKey || !userRadius || !lat || !lng;

  return (
    <div className="container">
      <div className="row">
        <h1 className="col-12">Places to 2DSphere</h1>
        <p className="col-12">
          Proof of concept on saving places from&nbsp;
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://cloud.google.com/maps-platform/places/"
          >Google Places API
          </a> into&nbsp;
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://docs.mongodb.com/manual/core/2dsphere/"
          >2DSphere MongoDB
          </a> indexed collections.
        </p>
      </div>
      <div className="row">
        <h2 className="col-12">Config</h2>
      </div>
      <div className="row">
        <div className="col-12 form-group">
          <label htmlFor="apiKey">API Key</label>
          <input
            id="apiKey"
            className="form-control"
            placeholder="Google Places API Key"
            type="text"
            onChange={ ({ target }) => updateFormValue("apiKey", target.value) }
            value={ apiKey || "" }
          /> 
        </div>
        <div className="col-12 form-group">
          <label htmlFor="userRadius">Scan Radius (in meters)</label>
          <input
            id="userRadius" 
            className="form-control"
            type="text"
            onChange={ ({ target }) => updateFormValue("userRadius", target.value) }
            value={ userRadius || "" }
            />
        </div>
      </div>
      <div className="row">
        <h2 className="col-12">Location</h2>
      </div>
      <div className="row">
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="latitude">Latitude:</label>
            <input
              id="latitude"
              className="form-control"
              type="text"
              readOnly
              value={ lat || "" }
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="longitude" >Longitude:</label>
            <input
              id="longitude"
              className="form-control"
              type="text"
              readOnly
              value={ lng || "" }
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <button disabled={ fetching } onClick={ getLocationHandler }>Use Current Location</button>
        </div>
      </div>
      <div className="row">
        <h2 className="col-12">Map</h2>
      </div>
      <div className="row">
        <div className="col-12">Get places around me
          <button
            onClick={ !getPlacesDisabled ? getPlaces : null }
            disabled={ getPlacesDisabled }>
            Ask server
          </button>
        </div>
      </div>
      { apiKey && lat && lng && <Map
          googleMapURL={`${googleMapURL}&key=${apiKey}`}
          lat={ lat }
          lng={ lng }
          locations={ locations || [] }
        />
      }
    </div>
  );
}

export default App;
