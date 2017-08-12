import React, { Component } from 'react'
import { Container, Button, Divider, Form, Dropdown } from 'semantic-ui-react'
import { BrowserRouter as Router, Route, Redirect, Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import CreateHabit from '../../actions/createHabit'

const options = [
  { key: 'health', text: 'Health', value: 'health' },
  { key: 'finance', text: 'Finance', value: 'finance' },
  { key: 'relationship', text: 'Relationship', value: 'relationship' }
]

class HabitForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      user_id: this.props.currentUser.id,
      title: '',
      description: '',
      category: '',
      redirect: false
    }
  }

  handleSubmit = (event) => {
    event.preventDefault()
    // debugger
    this.props.createHabit(this.state)
  }

  handleChange = event => {
    let key = event.target.name
    let value = event.target.value
    this.setState({
      [key]: value
    })
  }

  handleDropdownChange = (e, result) => {
    this.setState({category: result.value})
  }

  render() {
    return(
      <div>
        {this.state.redirect? <Redirect to='/habits'/> : null }
        <h1>Create A New Habit</h1>
        <Form onSubmit={this.handleSubmit}>
          <Form.Field label='Title' control='input' placeholder='Title' name='title' onChange={this.handleChange}/>
          <Form.Field label='Description' control='input' placeholder='Description' name='description' onChange={this.handleChange}/>
          <Form.Dropdown label='Category' placeholder='Category' name='category' fluid search selection options={options} onChange={this.handleDropdownChange} />
          <Button type='submit'>Submit</Button><br />
          <Link to="/habits">Cancel</Link>
          <Divider hidden />
        </Form>
        {this.state.user}<br/><br/>
        {this.state.title}<br/><br/>
        {this.state.description}<br/><br/>
        {this.state.category}<br/><br/>
      </div>
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
