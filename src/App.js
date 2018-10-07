import React, { Component } from 'react';
import './App.css';

function ActiveQuestions (props) {
  return (
    <div>
    <header>
      <h2>Fourth Amendment Protection</h2>
      <ul>
        {props.list.map((question) => (
          <li key={question.name}>
            <span>{question.name}</span>
            <button onClick={() => props.onRemoveQuestion(question.name)}>Remove</button>
            <button onClick={() => props.onToggleQuestion(question.name)}>Deactivate</button>
          </li>
        ))}
      </ul>
      </header>
    </div>
  )
}
function InactiveQuestions (props) {
  return (
    <div>
    
      <h2>Not Protected</h2>
      <ul>
        {props.list.map((question) => (
          <li key={question.name}>
            <span>{question.name}</span>
            <button onClick={() => props.onToggleQuestion(question.name)}>Activate</button>
          </li>
        ))}
      </ul>
     
    </div>
  )
}
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      questions: [
        {
          name: 'Clothing you are wearing',
          active: true,
        },
        {
          name: 'A camper trailer you are driving in',
          active: false,
        },
        {
          name: 'Your iPhone',
          active: true
        },
        {
          name: 'Your medication',
          active: true
        },
      ],
      input: '',
      
    }

    // getTotalQuestions = () => this.state.questions.length;
    console.log('--constructor--')

    this.handleRemoveQuestion = this.handleRemoveQuestion.bind(this)
    this.updateInput = this.updateInput.bind(this)
    this.handleAddQuestion = this.handleAddQuestion.bind(this)
    this.handleToggleQuestion = this.handleToggleQuestion.bind(this)
  }

  componentDidUpdate() {
    console.log('--componentDidUpdate--')
  }
  componentWillUnmount() {
    console.log('--componentWillUnmount--')
  }

  handleAddQuestion() {
    this.setState((currentState) => {
      return {
        questions: currentState.questions.concat([{
          name: this.state.input,
          active: true
        }]),
        input: ''
      }
    })
  }
  handleRemoveQuestion(name) {
    this.setState((currentState) => {
      return {
        questions: currentState.questions.filter((question) => question.name !== name)
      }
    })
  }
  handleToggleQuestion(name) {
    this.setState((currentState) => {
      const question = currentState.questions.find((question) => question.name === name)
      return {
        questions: currentState.questions.filter((question) => question.name !== name)
          .concat([{
            name,
            active: !question.active
          }])
      }
    })
  }
  updateInput(e) {
    const value = e.target.value
    this.setState({
      input: value
    })
  }
  render() {
    console.log('--render--')
    return (
      <div>
        <input
          type='text'
          placeholder='new question'
          value={this.state.input}
          onChange={this.updateInput}
        />
        <button onClick={this.handleAddQuestion}>
          Submit
        </button>
        <div>
          <button onClick={() => this.setState({
            questions: []
          })}>Clear All</button>
        </div>
        <ActiveQuestions
          list={this.state.questions.filter((question) => question.active === true)}
          onRemoveQuestion={this.handleRemoveQuestion}
          onToggleQuestion={this.handleToggleQuestion}
        />
        <InactiveQuestions
          list={this.state.questions.filter((question) => question.active === false)}
          onToggleQuestion={this.handleToggleQuestion}
        />
      </div>
    )
  }
}

export default App;
