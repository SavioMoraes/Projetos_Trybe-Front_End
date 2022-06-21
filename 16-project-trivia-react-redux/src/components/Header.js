import PropTypes from 'prop-types';
import React from 'react';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';

const email = md5('email@email.com').toString();

class Header extends React.Component {
  render() {
    const { name, score } = this.props;
    return (
      <div className="header">
        <div className="gravatar">
          <img
            src={ `https://www.gravatar.com/avatar/${email}` }
            alt="imagem gravatar"
            data-testid="header-profile-picture"
            className="img-gravatar"
          />
        </div>
        <div className="name">
          <h5 data-testid="header-player-name">{ `Player: ${name}` }</h5>
        </div>
        <div className="score-element">
          <h4 className="score">Score:</h4>
          <span data-testid="header-score" className="punctuation">{ score }</span>
        </div>
      </div>
    );
  }
}
Header.propTypes = {
  email: PropTypes.string,
  name: PropTypes.string,
}.isRequired;
const mapStateToProps = (state) => ({
  name: state.user.name,
  email: state.user.email,
  score: state.user.score,
});
export default connect(mapStateToProps)(Header);
