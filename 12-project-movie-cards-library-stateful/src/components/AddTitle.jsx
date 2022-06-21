import React from 'react';
import PropTypes from 'prop-types';

class AddTitle extends React.Component {
  render() {
    const { handleChange, title } = this.props;
    return (
      <label htmlFor="title" data-testid="title-input-label">
        Título
        <input
          type="text"
          name="title"
          id="title"
          value={ title }
          data-testid="title-input"
          onChange={ handleChange }
        />
      </label>
    );
  }
}

AddTitle.propTypes = {
  title: PropTypes.string,
  handleChange: PropTypes.func,
}.isRequired;

export default AddTitle;
