import React, { Component } from 'react'
import { Container, Button, Divider, Form, Dropdown } from 'semantic-ui-react'
import { BrowserRouter as Router, Route, Redirect, Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import CreateHabit from '../../actions/createHabit'

const optionsCategory = [
  { key: 'health', text: 'Health', value: 'health' },
  { key: 'finance', text: 'Finance', value: 'finance' },
  { key: 'relationship', text: 'Relationship', value: 'relationship' }
]

const optionsFrequency = [
  { key: '1', text: '1', value: 1 },
  { key: '2', text: '2', value: 2 },
  { key: '3', text: '3', value: 3 },
  { key: '4', text: '4', value: 4 },
  { key: '5', text: '5', value: 5 },
  { key: '6', text: '6', value: 6 },
  { key: '7', text: '7', value: 7 }
]

class HabitForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      user_id: this.props.currentUser.id,
      title: '',
      description: '',
      category: '',
      redirect: false,
      frequency: 0
    }
  }

  handleSubmit = (event) => {
    event.preventDefault()
    // debugger
    this.props.createHabit(this.state)
    this.setState({ redirect: true })
  }

  handleChange = event => {
    let key = event.target.name
    let value = event.target.value
    this.setState({
      [key]: value
    })
  }

  handleDropdownChange = (e, result) => {
    // debugger
    let key = result.name
    let value = result.value
    this.setState({
      [key]: value
    })
  }

  render() {
    return(
      <Container>
        {this.state.redirect? <Redirect to='/habits'/> : null }
        <h1>Create A New Habit</h1>
        <Form onSubmit={this.handleSubmit}>
          <Form.Field label='Title' control='input' placeholder='Title' name='title' onChange={this.handleChange}/>
          <Form.Field label='Description' control='input' placeholder='Description' name='description' onChange={this.handleChange}/>
          <Form.Dropdown label='Category' placeholder='Category' name='category' fluid search selection options={optionsCategory} onChange={this.handleDropdownChange} />
          <Form.Dropdown label='I want to complete this habit x times per week' placeholder='Frequency' name='frequency' compact selection options={optionsFrequency} onChange={this.handleDropdownChange} />
          <br/><br/>
          <Button type='submit'>Submit</Button><br /><br />
          <Link to="/habits">Cancel</Link>
          <Divider hidden />
        </Form>
        {this.state.user}<br/><br/>
        {this.state.title}<br/><br/>
        {this.state.description}<br/><br/>
        {this.state.category}<br/><br/>
        {this.state.frequency}<br/><br/>
      </Container>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    createHabit: CreateHabit
  }, dispatch)
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HabitForm)