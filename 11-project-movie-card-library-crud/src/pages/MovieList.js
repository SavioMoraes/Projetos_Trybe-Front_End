import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import Loading from '../components/Loading';
import * as movieAPI from '../services/movieAPI';

class MovieList extends Component {
  constructor() {
    super();

    this.state = {
      movies: [],
      loading: true,
    };

    this.fetchAPI = this.fetchAPI.bind(this);
  }

  componentDidMount() {
    this.fetchAPI();
  }

  /**
   * Consultei o repositório do Renato Bispo para conferir qual function era para ser chamada no ComponentDidMount
  * Link: https://github.com/trybersd-011-project-movie-card-library-crud/pull/138/commits/ec4479384371d625109d121be37b00e1d0948ea8
   * */

  async fetchAPI() {
    const request = await movieAPI.getMovies();
    this.setState({
      movies: request,
      loading: false,
    });
  }

  render() {
    const { movies, loading } = this.state;
    return (
      <>
        <div data-testid="movie-list" className="movie-list">
          {
            loading
              ? <Loading />
              : movies.map((movie, index) => <MovieCard key={ index } movie={ movie } />)
          }
        </div>
        <div className="container-add-card">
          <button type="button" className="btn-add-card">
            <Link to="/movies/new" className="add-card-link">ADICIONAR CARTÃO</Link>
          </button>
        </div>
      </>
    );
  }
}

export default MovieList;
