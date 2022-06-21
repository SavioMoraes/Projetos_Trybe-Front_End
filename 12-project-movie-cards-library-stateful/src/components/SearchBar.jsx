import React from 'react';
import PropTypes from 'prop-types';

class SearchBar extends React.Component {
  render() {
    const { searchText, onSearchTextChange } = this.props;
    const { bookmarkedOnly, onBookmarkedChange } = this.props;
    const { selectedGenre, onSelectedGenreChange } = this.props;

    return (
      <div>
        <form data-testid="search-bar-form">
          <label id="text-input-label" htmlFor="sb" data-testid="text-input-label">
            Inclui o texto:
            <input
              type="text"
              name=""
              id="text-input"
              value={ searchText }
              onChange={ onSearchTextChange }
              data-testid="text-input"
            />
          </label>
          <label id="checkbox-input-label" htmlFor="c" data-testid="checkbox-input-label">
            Mostrar somente favoritos
            <input
              type="checkbox"
              name=""
              id="checkbox-input"
              checked={ bookmarkedOnly }
              onChange={ onBookmarkedChange }
              data-testid="checkbox-input"
            />
          </label>
          <label id="select-input-label" htmlFor="s" data-testid="select-input-label">
            Filtrar por gênero
            <select
              name=""
              id="select-input"
              value={ selectedGenre }
              onChange={ onSelectedGenreChange }
              data-testid="select-input"
            >
              <option value="" data-testid="select-option">Todos</option>
              <option value="action" data-testid="select-option">Ação</option>
              <option value="comedy" data-testid="select-option">Comédia</option>
              <option value="thriller" data-testid="select-option">Suspense</option>
              <option value="fantasy">Fantasia</option>
            </select>
          </label>
        </form>
      </div>
    );
  }
}

SearchBar.propTypes = {
  searchText: PropTypes.string.isRequired,
  onSearchTextChange: PropTypes.func.isRequired,
  bookmarkedOnly: PropTypes.bool.isRequired,
  onBookmarkedChange: PropTypes.func.isRequired,
  selectedGenre: PropTypes.string.isRequired,
  onSelectedGenreChange: PropTypes.func.isRequired,
};

export default SearchBar;
