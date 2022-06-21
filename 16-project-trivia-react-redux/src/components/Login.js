import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../actions';
import logo from '../trivia.png';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      status: true,
    };
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.ableButton = this.ableButton.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.setLocalStorage = this.setLocalStorage.bind(this);
  }

  setLocalStorage() {
    const { name, email } = this.state;
    const playerInfos = {
      player: {
        name,
        assertions: 0,
        score: 0,
        gravatarEmail: email,
      },
    };
    return localStorage.setItem('state', JSON.stringify(playerInfos));
  }

  handleChangeName({ target }) {
    const { value } = target;
    this.setState({
      name: value,
    }, () => this.ableButton());
  }

  handleChangeEmail({ target }) {
    const { value } = target;
    this.setState({
      email: value,
    }, () => this.ableButton());
  }

  ableButton() {
    const { name, email } = this.state;
    const regex = /\w+@\w+.com(.br)?/;
    if (name !== '' && regex.test(email)) {
      this.setState({ status: false });
    } else {
      this.setState({ status: true });
    }
  }

  handleClick() {
    const { fetchApiToken, playerToName } = this.props;
    const { name } = this.state;
    fetchApiToken();
    playerToName(name);
    this.setLocalStorage();
  }

  render() {
    const { status } = this.state;
    return (
      <div>
        <img src={ logo } className="App-logo" alt="logo" />
        <input
          type="name"
          data-testid="input-player-name"
          placeholder="Name"
          onChange={ this.handleChangeName }
        />
        <input
          type="email"
          data-testid="input-gravatar-email"
          placeholder="Email"
          onChange={ this.handleChangeEmail }
        />
        <Link to="/gamePage">
          <button
            type="button"
            data-testid="btn-play"
            className="btn-play"
            disabled={ status }
            onClick={ () => this.handleClick() }
          >
            Jogar
          </button>
        </Link>
        <Link to="/settings">
          <button
            type="button"
            data-testid="btn-settings"
            className="btn-settings"
          >
            Settings
          </button>
        </Link>
      </div>
    );
  }
}

Login.propTypes = {
  fetchApiToken: PropTypes.func,
  playerToName: PropTypes.func,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  fetchApiToken: () => dispatch(actions.getApi()),
  playerToName: (name) => dispatch(actions.userEmail(name)),
});

export default connect(null, mapDispatchToProps)(Login);
