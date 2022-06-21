import React, { useState, useContext, useEffect } from 'react';
import StarwarsPlanetsContext from '../context/StarwarsPlanetsContext';

function Table() {
  const { data, isLoading } = useContext(StarwarsPlanetsContext);

  const [planets, setPlanets] = useState({
    planets: [],
  });

  const [filters, setFilters] = useState({
    filters: {
      filterByName: {
        name: '',
      },
      filterByNumericValues: [],
    },
  });

  const [selectionFilters, setSelectionFilters] = useState({
    column: '',
    comparison: '',
    value: 0,
  });

  const [columns, setColumns] = useState(
    ['population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water'],
  );

  useEffect(() => {
    setPlanets(data.filter((item) => item.name
      .includes(filters.filters.filterByName.name.toLocaleLowerCase())));
  }, [data, filters]);

  const handleChangeInputValue = ({ target }) => {
    const { value } = target;
    setFilters({
      filters: {
        filterByName: {
          name: value,
        },
      },
    });
  };

  const handleChangeFilterInputs = ({ target }) => {
    const { name, value } = target;
    setSelectionFilters(({
      ...selectionFilters,
      [name]: value,
    }));
  };

  const filterByQuantity = Object.values(planets).filter((planet) => {
    switch (selectionFilters.comparison) {
    case 'maior que':
      return planet[selectionFilters.column] > Number(selectionFilters.value);
    case 'menor que':
      return planet[selectionFilters.column] < Number(selectionFilters.value);
    case 'igual a':
      return planet[selectionFilters.column] === selectionFilters.value;
    default:
      return planet;
    }
  });

  const handleClick = () => {
    const { column, comparison, value } = selectionFilters;
    setFilters({ filters: { ...filters.filters,
      filterByNumericValues:
      [...filters.filters.filterByNumericValues, { column, comparison, value }] } });
    setColumns(columns.filter((item) => item !== selectionFilters.column));
  };

  return !isLoading ? (
    <div>
      <label htmlFor="search">
        <input
          data-testid="name-filter"
          id="search"
          name="search"
          onChange={ (e) => handleChangeInputValue(e) }
        />
      </label>
      <form>
        <label htmlFor="column">
          <select
            data-testid="column-filter"
            id="column"
            name="column"
            onChange={ (e) => handleChangeFilterInputs(e) }
          >
            { columns.map((column) => (
              <option key={ column } value={ column }>{ column }</option>
            )) }
          </select>
        </label>
        <label htmlFor="comparison">
          <select
            data-testid="comparison-filter"
            id="comparison"
            name="comparison"
            onChange={ (e) => handleChangeFilterInputs(e) }
          >
            <option value="" defaultValue>Selecione sua opção</option>
            <option value="maior que">maior que</option>
            <option value="menor que">menor que</option>
            <option value="igual a">igual a</option>
          </select>
        </label>
        <label htmlFor="value">
          <input
            type="number"
            data-testid="value-filter"
            id="value"
            name="value"
            onChange={ (e) => handleChangeFilterInputs(e) }
          />
        </label>
        <button
          data-testid="button-filter"
          type="button"
          name="add-filter"
          onClick={ handleClick }
        >
          Filter
        </button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          {filterByQuantity.map((planet, index) => (
            <tr key={ index }>
              <td>{ planet.name }</td>
              <td>{ planet.rotation_period }</td>
              <td>{ planet.orbital_period }</td>
              <td>{ planet.diameter }</td>
              <td>{ planet.climate }</td>
              <td>{ planet.gravity }</td>
              <td>{ planet.terrain }</td>
              <td>{ planet.surface_water }</td>
              <td>{ planet.population }</td>
              <td>{ planet.films }</td>
              <td>{ planet.created }</td>
              <td>{ planet.edited }</td>
              <td>{ planet.url }</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ) : <span>Carregando...</span>;
}

export default Table;
