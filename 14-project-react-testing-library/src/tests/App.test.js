import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

describe('Requisito 01: Teste o componente <App.js />', () => {
  it('Renderiza a página principal ao carregar a aplicação no caminho de URL /', () => {
    renderWithRouter(<App />);
    const title = screen.getByText(/Encountered pokémons/i);
    expect(title).toBeInTheDocument();
  });

  it('Testa se o topo da aplicação tem um conjunto fixo de lnks de navegação', () => {
    renderWithRouter(<App />);
    const navigation = screen.getAllByRole('link');
    expect(navigation[0].innerHTML).toBe('Home');
    expect(navigation[1].innerHTML).toBe('About');
    expect(navigation[2].innerHTML).toBe('Favorite Pokémons');
  });

  it('Redireciona para a página inicial, ao clicar no link Home', () => {
    const { history } = renderWithRouter(<App />);
    const navigation = screen.getAllByRole('link');
    expect(navigation[0].innerHTML).toBe('Home');
    fireEvent.click(navigation[0]);
    const url = history.location.pathname;
    expect(url).toBe('/');
  });

  it('Redireciona para a página de About, na URL /about.', () => {
    const { history } = renderWithRouter(<App />);
    const navigation = screen.getAllByRole('link');
    expect(navigation[1].innerHTML).toBe('About');
    fireEvent.click(navigation[1]);
    const url = history.location.pathname;
    expect(url).toBe('/about');
  });

  it('Redireciona para a página de Favoritos ao clicar no link Favorite Pokémons', () => {
    const { history } = renderWithRouter(<App />);
    const navigation = screen.getAllByRole('link');
    expect(navigation[2].innerHTML).toBe('Favorite Pokémons');
    fireEvent.click(navigation[2]);
    const url = history.location.pathname;
    expect(url).toBe('/favorites');
  });

  it('deve testar um caminho não existente e a renderização do Not Found', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/notFound/');
    const noMatch = getByText(/Not Found/i);
    expect(noMatch).toBeInTheDocument();
  });
});
