import React from 'react';
import PropTypes from 'prop-types';

class AddImagePath extends React.Component {
  render() {
    const { handleChange, imagePath } = this.props;
    return (
      <label htmlFor="image" data-testid="image-input-label">
        Imagem
        <input
          type="text"
          name="imagePath"
          id="image"
          value={ imagePath }
          data-testid="image-input"
          onChange={ handleChange }
        />
      </label>
    );
  }
}

AddImagePath.propTypes = {
  imagePath: PropTypes.string,
  handleChange: PropTypes.func,
}.isRequired;

export default AddImagePath;
