import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getQuestionsThunk } from '../actions';
import QuestionList from '../components/QuestionList';
import Header from '../components/Header';

class GamePage extends Component {
  componentDidMount() {
    const { getQuestions } = this.props;
    if (localStorage.token) {
      getQuestions(localStorage.token);
    }
  }

  render() {
    const { isLoading } = this.props;
    if (isLoading) {
      return (
        <div>
          <h1>Carregando...</h1>
          <Header />
        </div>
      );
    }
    return (
      <div>
        <Header />
        <QuestionList />
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  questions: state.questionsReducer.questions,
  isLoading: state.questionsReducer.isLoading,
});
const mapDispatchToProps = (dispatch) => ({
  getQuestions: (token) => dispatch(getQuestionsThunk(token)),
});
GamePage.propTypes = {
  getQuestions: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};
export default connect(mapStateToProps, mapDispatchToProps)(GamePage);
