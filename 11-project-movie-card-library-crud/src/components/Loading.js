import React, { Component } from 'react';

class Loading extends Component {
  render() {
    return (
      <div className="is-loading">
        <h4 className="is-loading-text">Carregando...</h4>
        <div className="is-loading-animation"></div>
      </div>
    );
  }
}

export default Loading;