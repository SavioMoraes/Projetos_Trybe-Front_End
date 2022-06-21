import React from 'react';
import PropTypes from 'prop-types';

class AddGenre extends React.Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     genre: 'action',
  //   };
  // }

  render() {
    const { handleChange, genre } = this.props;
    return (
      <label htmlFor="genre" data-testid="genre-input-label">
        Gênero
        <select
          data-testid="genre-input"
          name="genre"
          id="genre"
          value={ genre }
          onChange={ handleChange }
        >
          <option value="action" data-testid="genre-option">Ação</option>
          <option value="comedy" data-testid="genre-option">Comédia</option>
          <option value="thriller" data-testid="genre-option">Suspense</option>
        </select>
      </label>
    );
  }
}

AddGenre.propTypes = {
  genre: PropTypes.array,
  handleChange: PropTypes.func,
}.isRequired;

export default AddGenre;
