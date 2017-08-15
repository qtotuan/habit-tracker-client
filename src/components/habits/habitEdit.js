import React, { Component } from 'react'
import { Container, Button, Divider, Form, Dropdown } from 'semantic-ui-react'
import { BrowserRouter as Router, Route, Redirect, Link} from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import UpdateHabit from '../../actions/updateHabit'
import SetCurrentHabit from '../../actions/setCurrentHabit'

const options = [
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

class HabitEdit extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      user_id: this.props.currentUser_id,
      title: this.props.currentHabit.title,
      description: this.props.currentHabit.description,
      category_id: this.props.currentHabit.category.id,
      redirect: false
    }
  }

  handleSubmit = (event) => {
    // debugger
    event.preventDefault()
    this.props.updateHabit(this.props.currentHabit, this.state)
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
    let key = result.name
    let value = result.value
    this.setState({
      [key]: value
    })
  }

  render() {
    return(
      <div>
        {this.state.redirect? <Redirect to={`/habits/${this.props.currentHabit.id}`}/> : null }
        <h1>Edit {this.props.currentHabit.title}</h1>
        <Form onSubmit={this.handleSubmit}>
          <Form.Field label='Title' control='input' value={this.state.title} name='title' onChange={this.handleChange}/>
          <Form.Field label='Description' control='input' value={this.state.description} name='description' onChange={this.handleChange}/>
          <Form.Dropdown label='Category' placeholder={this.props.currentHabit.category.name} name='category' fluid search selection options={options} onChange={this.handleDropdownChange} />
          <Form.Dropdown label='I want to complete this habit x times per week' placeholder={this.props.currentHabit.frequency} name='frequency' compact selection options={optionsFrequency} onChange={this.handleDropdownChange} />
          <Button type='submit'>Submit</Button>
          <Link to={`/habits/${this.props.currentHabit.id}`}>Cancel</Link>
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
    updateHabit: UpdateHabit,
    setCurrentHabit: SetCurrentHabit
  }, dispatch)
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    currentHabit: state.currentHabit
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HabitEdit)