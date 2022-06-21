import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  render() {
    const { username } = this.props;

    return (
      <div>
        <header className="wallet-header">
          <div>
            <p data-testid="email-field">
              Email:
              { username }
            </p>
          </div>
          <div className="despesa-moeda">
            <div data-testid="total-field">
              Despesa total: R$
              {
                0
              }
            </div>
            <p data-testid="header-currency-field">
              BRL
            </p>
          </div>
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  username: state.user.email,
  expensesResult: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);

Header.propTypes = {
  username: PropTypes.string.isRequired,
  expensesResult: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func])),
}.isRequired;
