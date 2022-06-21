import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../App.css';
import * as actions from '../actions';

class Question extends Component {
  constructor() {
    super();
    this.state = {
      clicked: false,
      status: true,
      statusAnswer: false,
      sec: 30,
      setTime: true,
      questionIndex: 0,
      activeButtonNext: false,
      redirect: false,
    };
    this.answers = this.answers.bind(this);
    this.wasClickedWrong = this.wasClickedWrong.bind(this);
    this.timer = this.timer.bind(this);
    this.handleClickNext = this.handleClickNext.bind(this);
    this.scoreCalc = this.scoreCalc.bind(this);
    this.wasClickedRight = this.wasClickedRight.bind(this);
  }

  componentDidMount() {
    this.updateTimer();
  }

  componentDidUpdate() {
    const { setTime, sec, statusAnswer } = this.state;
    if (sec <= 0 && !statusAnswer) {
      clearInterval(setTime);
      this.changeStatusAnswer();
    }
  }

  componentWillUnmount() {
    const { setTime } = this.state;
    clearInterval(setTime);
  }

  changeStatusAnswer() {
    this.setState({
      statusAnswer: true,
      activeButtonNext: true,
    });
  }

  updateTimer() {
    const interval = 1000;
    const setTime = setInterval(this.timer, interval);
    this.setState({
      setTime,
    });
  }

  timer() {
    const interval = 1000;
    setTimeout(() => {
      this.setState((previous) => ({
        sec: previous.sec - 1,
      }));
    }, interval);
  }

  wasClickedWrong() {
    const { setTime } = this.state;
    clearInterval(setTime);
    this.setState({
      statusAnswer: true,
      clicked: true,
      status: false,
      activeButtonNext: true,
    });
  }

  wasClickedRight() {
    this.wasClickedWrong();
    this.scoreCalc();
  }

  answers() {
    const { question } = this.props;
    const { clicked, statusAnswer, questionIndex } = this.state;
    const buttonClass1 = (clicked ? 'correctButton' : 'button');
    const buttonClass2 = (clicked ? 'wrongButton' : 'button');
    const correct = question[questionIndex].correct_answer;
    const incorrects = question[questionIndex].incorrect_answers;
    return [
      <button
        onClick={ () => this.wasClickedRight() }
        className={ buttonClass1 }
        type="button"
        data-testid="correct-answer"
        id="correct-answer"
        key="correct-answer"
        disabled={ statusAnswer }
      >
        {correct}
      </button>,
      incorrects.map((element, index) => (
        <button
          onClick={ () => this.wasClickedWrong() }
          className={ buttonClass2 }
          type="button"
          data-testid={ `wrong-answer-${index}` }
          key={ index }
          disabled={ statusAnswer }
        >
          {element}
        </button>
      )),
    ];
  }

  convertDifficultyInNumber() {
    const { question } = this.props;
    const { questionIndex } = this.state;
    const { difficulty } = question[questionIndex];
    let points = 0;
    if (difficulty === 'easy') {
      points = 1;
    } else if (difficulty === 'medium') {
      points = 2;
    } else {
      points = 1 + 2;
    }
    return points;
  }

  scoreCalc() {
    const difficulty = this.convertDifficultyInNumber();
    const getKey = localStorage.getItem('state');
    const state = JSON.parse(getKey);
    const { sec } = this.state;
    const { setGlobalScore } = this.props;
    const multiply = 10;
    const scoreFinal = multiply + (sec * difficulty);
    state.player.score += scoreFinal;
    state.player.assertions += 1;
    setGlobalScore(state.player.score);
    localStorage.setItem('state', JSON.stringify(state));
  }

  handleClickNext() {
    const { questionIndex } = this.state;
    const maxLength = 4;
    if (questionIndex < maxLength) {
      this.setState((previous) => ({
        sec: 30,
        setTime: true,
        statusAnswer: false,
        clicked: false,
        questionIndex: previous.questionIndex + 1,
        activeButtonNext: false,
      }), () => this.updateTimer());
    } else {
      this.setState({
        redirect: true,
      });
    }
  }

  render() {
    const { question } = this.props;
    const { status, sec, questionIndex, activeButtonNext, redirect } = this.state;
    if (redirect) {
      return (<Redirect to="/feedback" />);
    }
    return (
      <div>
        <div className="question-element">
          Pergunta
          <hr />
          <h2
            data-testid="question-category"
            className="question-category"
          >
            { question[questionIndex].category }
          </h2>
          <h3
            data-testid="question-text"
            className="question-text"
          >
            { question[questionIndex].question }
          </h3>
          <hr />
          { this.answers() }
          <br />
          <p className="timer">{ `00:${sec}` }</p>
        </div>
        {activeButtonNext
          ? (
            <button
              data-testid="btn-next"
              type="button"
              disabled={ status }
              className="next"
              onClick={ () => this.handleClickNext() }
            >
              Próxima
            </button>)
          : ''}
      </div>
    );
  }
}
Question.propTypes = {
  question: PropTypes.arrayOf.isRequired,
  setGlobalScore: PropTypes.func.isRequired,
};
const mapDispatchToProps = (dispatch) => ({
  setGlobalScore: (score) => dispatch(actions.setScore(score)),
});
export default connect(null, mapDispatchToProps)(Question);
