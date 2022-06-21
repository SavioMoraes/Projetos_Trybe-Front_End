import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MainPage from './components/MainPage';
import Cart from './components/Cart';
import ProductDetails from './components/ProductDetails';
import Checkout from './components/Checkout';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={ MainPage } />
          <Route
            path="/components/ProductDetails"
            render={ (props) => <ProductDetails { ...props } /> }
          />
          <Route path="/components/Cart" render={ () => <Cart /> } />
          <Route path="/components/Checkout" component={ Checkout } />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
