import React from 'react';
// import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import Header from '../components/Header';
import Form from '../components/Form';
// import Table from '../components/Table';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Form />
      </div>
    );
  }
}

// const mapDispatchToProps = (dispatch) => ({
//   getCoins: () => { dispatch(saveCoins()); },
// });

// export default connect(null, mapDispatchToProps)(Wallet);

// Wallet.propTypes = {

// };

export default Wallet;
