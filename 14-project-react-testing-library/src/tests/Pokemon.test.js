import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

describe('Requisito 06: Teste o componente <Pokemon.js />', () => {
  it('Teste se é renderizado um card com as informações de determinado pokémon', () => {
    renderWithRouter(<App />);
    const namePokemon = screen.getByText(/Pikachu/i);
    expect(namePokemon).toBeInTheDocument();
    const avarage = screen.getByText(/Average weight: 6.0 kg/i);
    expect(avarage).toBeInTheDocument();
    const imgPokemon = screen.getByRole('img');
    expect(imgPokemon.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(imgPokemon.alt).toBe('Pikachu sprite');
  });

  it('Teste se o card do Pokémon indicado na Pokédex contém um link More details', () => {
    const { history } = renderWithRouter(<App />);
    const link = screen.getAllByRole('link');
    expect(link[3].innerHTML).toBe('More details');
    userEvent.click(link[3]);
    const url = history.location.pathname;
    expect(url).toBe('/pokemons/25');
    const pokemonType = screen.getByTestId(/pokemon-type/i);
    expect(pokemonType.innerHTML).toBe('Electric');
  });

  it('Teste se existe um ícone de estrela nos Pokémons favoritados.', () => {
    renderWithRouter(<App />);
    const btnEletric = screen.getAllByRole('button');
    userEvent.click(btnEletric[1]);
    const link = screen.getAllByRole('link');
    userEvent.click(link[3]);
    const favorite = screen.getByRole('checkbox');
    userEvent.click(favorite);
    const starIcon = document.querySelector('.favorite-icon');
    expect(starIcon.src).toBe('http://localhost/star-icon.svg');
    expect(starIcon.alt).toBe('Pikachu is marked as favorite');
  });
});

/**
 * Consultei o repositório do Arthur Hermann Campos para resolver o teste
 * com o ícone (linhas: 30 a 36, que percorre o caminho de App para
 * PokemonDetails, para estar o checkbox e aí, sim verificar a existência do
 * ícone)
 * https://github.com/tryber/sd-011-project-react-testing-library/pull/104/commits/5747512ae18fe1d30cd9c473d3d91f916c982276
 */
