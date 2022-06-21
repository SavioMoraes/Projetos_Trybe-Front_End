import React from 'react';
import PropTypes from 'prop-types';
import AddTitle from './AddTitle';
import AddSubtitle from './AddSubtitle';
import AddImagePath from './AddImagePath';
import AddStoryline from './AddStoryline';
import AddRating from './AddRating';
import AddGenre from './AddGenre';
import AddMovieButton from './AddMovieButton';

class AddMovie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subtitle: '',
      title: '',
      imagePath: '',
      storyline: '',
      rating: 0,
      genre: 'action',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  handleClick() {
    const { onClick } = this.props;
    const movie = this.state;
    this.setState({
      subtitle: '',
      title: '',
      imagePath: '',
      storyline: '',
      rating: 0,
      genre: 'action',
    });
    onClick(() => movie);
  }

  render() {
    const { handleChange, handleClick } = this;
    const { title, subtitle, imagePath, storyline, rating, genre } = this.state;
    return (
      <form data-testid="add-movie-form">
        <AddTitle handleChange={ handleChange } title={ title } />
        <AddSubtitle handleChange={ handleChange } subtitle={ subtitle } />
        <AddImagePath handleChange={ handleChange } imagePath={ imagePath } />
        <AddStoryline handleChange={ handleChange } storyline={ storyline } />
        <AddRating handleChange={ handleChange } rating={ rating } />
        <AddGenre handleChange={ handleChange } genre={ genre } />
        <AddMovieButton onClick={ handleClick } />
      </form>
    );
  }
}

AddMovie.propTypes = {
  onClick: PropTypes.func,
}.isRequired;

/**
 * Consultei o repositório do Bruno Duarte para resolver o problema com as props, usando e depois retirando a 'ProTypes.component'
 * Link: https://github.com/tryber/sd-011-project-movie-cards-library-stateful/pull/100/commits/6514823095a37669dc42b1e756b04f2527fcf8fc
 * Consultei o repositório do Renan Moraes para resolver o problema da componentização e name...
 * https://github.com/tryber/sd-011-project-movie-cards-library-stateful/pull/67/commits/3a869c4e86f7c38878d1059183f22ff6f4ed8680
 */

export default AddMovie;
