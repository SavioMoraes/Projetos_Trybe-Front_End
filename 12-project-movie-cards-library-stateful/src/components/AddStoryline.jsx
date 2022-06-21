import React from 'react';
import PropTypes from 'prop-types';

class AddTextarea extends React.Component {
  render() {
    const { handleChange, storyline } = this.props;
    return (
      <label htmlFor="storyline" data-testid="storyline-input-label">
        Sinopse
        <textarea
          name="storyline"
          id="storyline"
          cols="30"
          rows="10"
          data-testid="storyline-input"
          value={ storyline }
          onChange={ handleChange }
        >
          { storyline }
        </textarea>
      </label>
    );
  }
}

AddTextarea.propTypes = {
  storyline: PropTypes.string,
  handleChange: PropTypes.func,
}.isRequired;

export default AddTextarea;
