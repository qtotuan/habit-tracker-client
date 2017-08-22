import React, { Component } from 'react'
import { Container, Button, Divider, Form, Dropdown } from 'semantic-ui-react'
import { BrowserRouter as Router, Route, Redirect, Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import CreateHabit from '../../actions/createHabit'
import FetchCategories from '../../actions/fetchCategories'


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
      newCategory: '',
      frequency: 0
    }
  }

  componentDidMount() {
    if (this.props.categories.length === 0) {
      this.props.fetchCategories()
    }
  }

  handleSubmit = (event) => {
    event.preventDefault()
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
          <Form.Field label='Title' control='input' placeholder='Title' name='title' onChange={this.handleChange} required />
          <Form.Field label='Description' control='input' placeholder='Description' name='description' onChange={this.handleChange}/>
          <Form.Dropdown label='Category' placeholder='Category' name='category' fluid search selection options={this.props.categories} onChange={this.handleDropdownChange} required />
          <Form.Field label='Or create a new category:' control='input' placeholder='Give your new category a name' name='newCategory' onChange={this.handleChange} />
          <Form.Dropdown label='I want to complete this habit x times per week' placeholder='Frequency' name='frequency' compact selection options={optionsFrequency} onChange={this.handleDropdownChange} required />
          <br/><br/>
          <Button type='submit'>Submit</Button><br /><br />
          <Link to="/habits">Cancel</Link>
          <Divider hidden />
        </Form>
        {this.state.title}<br/><br/>
        {this.state.description}<br/><br/>
        {this.state.category}<br/><br/>
        {this.state.newCategory}<br/><br/>
        {this.state.frequency}<br/><br/>
      </Container>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    createHabit: CreateHabit,
    fetchCategories: FetchCategories
  }, dispatch)
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    categories: state.categories
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HabitForm)
