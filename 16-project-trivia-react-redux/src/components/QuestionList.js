import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Question from './Question';

class QuestionList extends Component {
  render() {
    const { questions } = this.props;
    const questArray = Object.values(questions);
    if (questArray.length > 0) {
      return (<Question question={ questArray } />);
    }
    return (<h1> Carregando </h1>);
  }
}

const mapStateToProps = (state) => ({
  questions: state.questionsReducer.questions,
});

QuestionList.propTypes = {
  questions: PropTypes.objectOf.isRequired,
};

export default connect(mapStateToProps)(QuestionList);
