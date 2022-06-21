import React from 'react';
import './App.css';
import Table from './components/Table';
import StarwarsPlanetsProvider from './context/StarwarsPlanetsProvider';

function App() {
  return (
    <main>
      <StarwarsPlanetsProvider>
        <Table />
      </StarwarsPlanetsProvider>
    </main>
  );
}

export default App;
