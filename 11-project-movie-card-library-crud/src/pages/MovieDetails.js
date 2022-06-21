import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as movieAPI from '../services/movieAPI';
import { Loading } from '../components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUndo } from '@fortawesome/free-solid-svg-icons';

class MovieDetails extends Component {
  constructor() {
    super();
    this.state = {
      movie: '',
      loading: true,
    };
    this.fetchAPI = this.fetchAPI.bind(this);
    this.deleteCard = this.deleteCard.bind(this);
  }

  componentDidMount() {
    this.fetchAPI();
  }

  deleteCard = async () => {
    const { match } = this.props;
    const { id } = match.params;
    await movieAPI.deleteMovie(id);
  }

  fetchAPI() {
    const { match } = this.props;
    const { id } = match.params;
    movieAPI.getMovie(id).then((filterByMovie) => {
      this.setState({
        movie: filterByMovie,
        loading: false,
      });
    });
  }

  render() {
    const { movie, loading } = this.state;
    const { imagePath, title, subtitle, storyline, genre, rating, id } = movie;

    return (
      <div>
        {
          loading ? (
            <Loading />
          ) : (
            <div data-testid="movie-details" className="movie-details">
              <img alt="Movie Cover" src={ `../${imagePath}` } className="movie-details-image" />
              <div className="container-movie-details">
                <h4 className="movie-details-title">{`Title: ${title}`}</h4>
                <h5 className="movie-details-subtitle">{`Subtitle: ${subtitle}`}</h5>
                <p className="movie-details-storyline">{`Storyline: ${storyline}`}</p>
                <p className="movie-details-genre">{`Genre: ${genre}`}</p>
                <p className="movie-details-rating">{`${rating}`}</p>
              </div>
              <div className="buttons-details">
                <button className="btn-edit-delete" type="button">
                  <Link
                    to={ {
                      pathname: `/movies/${id}/edit`,
                      state: { params: { id } },
                    } }
                    className="link-button"
                  >
                    EDITAR
                  </Link>
                </button>
                <button className="btn-edit-delete" type="button">
                  <Link to="/" onClick={ this.deleteCard }
                  className="link-button" >
                    DELETAR
                  </Link>
                </button>
              </div>
                <Link to="/" className="link-undo">
                  <FontAwesomeIcon icon={faUndo} className="link-icon" /> 
                    VOLTAR
                </Link>
            </div>)
        }
      </div>
    );
  }
}

MovieDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
  }).isRequired,
};

export default MovieDetails;
