import React, { Fragment } from 'react';
import Map from "../Map";

import "./App.css";

const App = ({
  apiKey,
  host,
  userRadius,
  fetching,
  lat,
  lng,
  locations,
  scanned,
  newScan,
  getPlaces,
  deleteAllPlaces,
  getLocationHandler,
  updateFormValue,
  actionsDisabled,
  setLocation
}) => (
  <Fragment>
    { <Map
        apiKey={ apiKey }
        lat={ lat }
        lng={ lng }
        locations={ locations || [] }
        scanned={ scanned || [] }
        setLocation={ setLocation }
        radius={ userRadius }
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
            onClick={ !actionsDisabled ? getPlaces : null }
            disabled={ actionsDisabled }>
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
      <fieldset className="uk-fieldset uk-form-horizontal">
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
              type="password"
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
        <div className="uk-margin">
          <button
            className="uk-button uk-button-danger"
            onClick={ !actionsDisabled ? deleteAllPlaces : null }
            disabled={ actionsDisabled }>
            DELETE ALL DATA
          </button>
        </div>
        <div className="uk-margin">
          <p>Last scan status: { newScan ? "Scanned Google API": "Data retrieved from previous scanned location."}</p>
          <p>{ scanned && scanned.length > 0 ? `Closest scanned location: ${ scanned[0].dis.toFixed(2) } meters` : null }</p>
        </div>
      </fieldset>
    </div>
  </Fragment>
);

export default App;
