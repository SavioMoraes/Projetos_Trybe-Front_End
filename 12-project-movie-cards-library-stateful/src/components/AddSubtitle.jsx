import React from 'react';
import PropTypes from 'prop-types';

class AddSubtitle extends React.Component {
  render() {
    const { handleChange, subtitle } = this.props;
    return (
      <label htmlFor="subtitle" data-testid="subtitle-input-label">
        Subtítulo
        <input
          type="text"
          name="subtitle"
          id="subtitle"
          value={ subtitle }
          data-testid="subtitle-input"
          onChange={ handleChange }
        />
      </label>
    );
  }
}

AddSubtitle.propTypes = {
  subtitle: PropTypes.string,
  handleChange: PropTypes.func,
}.isRequired;

export default AddSubtitle;
