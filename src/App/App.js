import React, { Fragment } from 'react';
import Map from "../Map";

import "./App.css";

const App = (props) => {
  const { apiKey, host, userRadius, fetching, lat, lng, locations, getPlaces, getLocationHandler, updateFormValue } = props;
  const getPlacesDisabled = fetching || !apiKey || !userRadius || !lat || !lng;

  return (
    <Fragment>
      { <Map
          apiKey={ apiKey }
          host={ host }
          lat={ lat }
          lng={ lng }
          locations={ locations || [] }
        />
      }
      <div className="uk-container">
        <div className="uk-grid uk-grid-small">
          <div className="uk-width-1-4@s">
            <input
              id="latitude"
              className="uk-input"
              placeholder="Latitude"
              type="text"
              onChange={ ({ target }) => updateFormValue("lat", Number(target.value)) }
              value={ lat || "" }
            />
          </div>
          <div className="uk-width-1-4@s">
            <input
              id="longitude"
              className="uk-input"
              placeholder="Longitude"
              type="text"
              onChange={ ({ target }) => updateFormValue("lng", Number(target.value)) }
              value={ lng || "" }
            />
          </div>
          <div className="uk-width-1-4@s">
            <button
              className="uk-button uk-button-secondary uk-width-1-1"
              disabled={ fetching }
              onClick={ getLocationHandler }>
              My&nbsp;Location
            </button>
          </div>
          <div className="uk-width-1-4@s">
            <button
              className="uk-button uk-button-primary uk-width-1-1"
              onClick={ !getPlacesDisabled ? getPlaces : null }
              disabled={ getPlacesDisabled }>
              Get&nbsp;Places
            </button>
          </div>
        </div>
        <h1>Places to 2DSphere</h1>
        <p>
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
        <h2>Config</h2>
        <fieldset class="uk-fieldset uk-form-horizontal">
          <div className="uk-margin">
            <label className="uk-form-label" htmlFor="host">Host</label>
            <div className="uk-form-controls">
              <input
                id="host"
                className="uk-input"
                placeholder="E.g.: http://localhost:1234"
                type="text"
                onChange={ ({ target }) => updateFormValue("host", target.value) }
                value={ host || "" }
              />
            </div>
          </div>
          <div className="uk-margin">
            <label className="uk-form-label" htmlFor="apiKey">API Key</label>
            <div className="uk-form-controls">
              <input
                id="apiKey"
                className="uk-input"
                placeholder="Google Places API Key"
                type="text"
                onChange={ ({ target }) => updateFormValue("apiKey", target.value) }
                value={ apiKey || "" }
              />
            </div>
          </div>
          <div className="uk-margin">
            <label className="uk-form-label" htmlFor="userRadius">Scan Radius (in meters)</label>
            <div className="uk-form-controls">
              <input
                id="userRadius" 
                className="uk-input"
                type="text"
                onChange={ ({ target }) => updateFormValue("userRadius", target.value) }
                value={ userRadius || "" }
              />
            </div>
          </div>
        </fieldset>
      </div>
    </Fragment>
  );
}

export default App;
