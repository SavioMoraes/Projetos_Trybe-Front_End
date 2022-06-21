import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

describe('Requisito 05: Teste o componente <Pokedex.js />', () => {
  it('Testas se página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);
    const title = screen.getByText(/Encountered pokémons/i);
    expect(title).toBeInTheDocument();
    const buttonNextPokemon = screen.getByText(/Próximo pokémon/i);
    expect(buttonNextPokemon).toBeInTheDocument();
    const filtersButton = document.querySelector('.filter-button');
    expect(filtersButton).toBeInTheDocument();
    userEvent.click(filtersButton);
    const pokemonsOfTheSameType = screen.getAllByTestId('pokemon-type-button');
    expect(pokemonsOfTheSameType[0]).toBeInTheDocument();
    const all = screen.getByText(/All/i);
    expect(all).toBeInTheDocument();
    const typePokemon = screen.getByText(/Psychic/i);
    expect(typePokemon).toBeInTheDocument('Psychic');
  });
});
