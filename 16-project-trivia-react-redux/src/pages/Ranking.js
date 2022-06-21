import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Ranking extends Component {
  render() {
    const newLocalStorage = localStorage.getItem('ranking');
    const getNewLocalStorage = JSON.parse(newLocalStorage);
    return (
      <div>
        <h4 data-testid="ranking-title" className="header">Ranking</h4>
        <ol className="inside-marker">
          {getNewLocalStorage.sort((a, b) => b.score - a.score).map((element, index) => (
            <li key={ index }>
              <div className="card-li">
                <div className="gravatar">
                  <img
                    src={ `https://www.gravatar.com/avatar/${element.picture}` }
                    alt="imagem gravatar"
                    data-testid="header-profile-picture"
                    className="img-gravatar-ranking"
                  />
                </div>
                <p data-testid={ `player-name-${index}` }>{element.name}</p>
                <p data-testid={ `player-score-${index}` }>{element.score}</p>
              </div>
            </li>))}
        </ol>
        <Link exact to="/">
          <button
            type="button"
            className="btn-inicio"
            data-testid="btn-go-home"
          >
            Início
          </button>
        </Link>
      </div>
    );
  }
}
