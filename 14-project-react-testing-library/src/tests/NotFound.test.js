import React from 'react';
import renderWithRouter from '../helpers/renderWithRouter';
import NotFound from '../components/NotFound';

describe('Requisito 04: Teste o componente <NotFound.js />', () => {
  it('Testa se página contém um heading h2 com o texto Page requested not found', () => {
    const { getByText } = renderWithRouter(<NotFound />);
    const pageNotFound = getByText(/Page requested not found/);
    expect(pageNotFound).toBeInTheDocument();
  });

  it('Teste se página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
    const { getAllByRole } = renderWithRouter(<NotFound />);
    const notFoundImg = getAllByRole('img');
    expect(notFoundImg[1].src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
