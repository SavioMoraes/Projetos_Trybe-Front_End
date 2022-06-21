import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class MovieCard extends React.Component {
  render() {
    const { movie } = this.props;
    const { imagePath, title, storyline, id } = movie;
    return (
      <div className="movie-card" data-testid="movie-card">
        <img alt="Movie Cover" className="movie-card-image" src={ `../${imagePath}` } />
        <div className="movie-card-board">
          <h4 className="movie-card-title" data-testid="movie-card-title">{ title }</h4>
          <p className="movie-card-storyline">{ storyline }</p>
        </div>
        <button type="button" className="btn-ver-detalhes">
          <Link to={ `/movies/${id}` } className="link-ver-detalhes" >
            VER DETALHES
          </Link>
        </button>
      </div>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string,
    imagePath: PropTypes.string,
    storyline: PropTypes.string,
    id: PropTypes.number,
  }).isRequired,
};

export default MovieCard;
