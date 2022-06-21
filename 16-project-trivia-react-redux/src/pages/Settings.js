import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Settings extends Component {
  render() {
    return (
      <div>
        <h1 data-testid="settings-title" className="settings-title">Settings</h1>
        <Link exact to="/">
          <button
            type="button"
            data-testid="btn-go-home"
            className="btn-home"
          >
            Página Inicial
          </button>
        </Link>
      </div>
    );
  }
}
