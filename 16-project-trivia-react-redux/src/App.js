import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Settings from './pages/Settings';
import GamePage from './pages/GamePage';
import Feedback from './pages/Feedback';
import Ranking from './pages/Ranking';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route path="/settings" component={ Settings } />
          <Route path="/gamePage" component={ GamePage } />
          <Route path="/feedback" component={ Feedback } />
          <Route path="/ranking" component={ Ranking } />
        </Switch>
        <Footer />
      </header>
    </div>
  );
}
