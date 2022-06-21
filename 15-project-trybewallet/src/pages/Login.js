import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setEmail } from '../actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleBtn = this.handleBtn.bind(this);
    this.submitLogin = this.submitLogin.bind(this);
  }

  validadeEmail(email) {
    const parseEmail = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/; // regex para validar email. url: https://pt.stackoverflow.com/questions/1386/express%C3%A3o-regular-para-valida%C3%A7%C3%A3o-de-e-mail
    return parseEmail.test(email); // RegExp.prototype.test() -> O método test() executa uma busca por uma correspondência entre  uma expressão regular e uma string. Retorna true ou false. url: https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test
  }

  validadePassword(password) {
    const minOfCaracteres = 6;
    return (password.length >= minOfCaracteres);
  }

  // Função criada com a ajuda do mestre @Frank Rocha
  handleBtn() {
    const { email, password } = this.state;
    if (this.validadeEmail(email) && this.validadePassword(password)) {
      return false;
    }
    return true;
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  submitLogin(event) {
    event.preventDefault();
    const { setEmailAction, history } = this.props;
    const { email } = this.state;
    setEmailAction(email);
    history.push('/carteira');
  }

  render() {
    const { email, password } = this.state;
    return (
      <div>
        <form>
          <label htmlFor="email-id">
            Email:
            <input
              value={ email }
              id="email-id"
              name="email"
              type="email"
              data-testid="email-input"
              className="email"
              placeholder="Digite seu email"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="password-id">
            Password:
            <input
              id="password-id"
              name="password"
              type="password"
              data-testid="password-input"
              className="password"
              value={ password }
              placeholder="Digite sua senha"
              onChange={ this.handleChange }
            />
          </label>
          <button
            type="button"
            className="btn-login"
            onClick={ (e) => this.submitLogin(e) }
            disabled={ this.handleBtn() }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setEmailAction: (payload) => dispatch(setEmail(payload)),
});

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  setEmailAction: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
