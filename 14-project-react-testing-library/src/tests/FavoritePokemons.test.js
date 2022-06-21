import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

describe('Requisito 03: Teste o componente <FavoritePokemons.js />', () => {
  it('Mostra a mensagem "No favorite pokemon found", 0 pokémons favoritos.', () => {
    renderWithRouter(<App />);
    const link = screen.getByText(/Favorite Pokémons/i);
    expect(link).toBeInTheDocument();
    userEvent.click(link);
    const pokemonNotFound = screen.getByText(/No favorite pokemon found/i);
    expect(pokemonNotFound).toBeInTheDocument();
  });
});

// Requisito feito com a ajuda do @Léo Funabashi
// Macete ensinado pelo @Léo Funabashi: seguir o passo a passo do que um
// usuário faria para chegar até um determinado local do site, aplicando os
// testes aprendidos no conteúdo.
