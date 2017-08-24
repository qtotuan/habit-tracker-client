import React, { Component } from 'react'
import { Container, Button, Divider, Form, Dropdown } from 'semantic-ui-react'
import { BrowserRouter as Router, Route, Redirect, Link} from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import UpdateHabit from '../../actions/updateHabit'
import FetchCategories from '../../actions/fetchCategories'
import SetCurrentHabit from '../../actions/setCurrentHabit'
import FetchHabits from '../../actions/fetchHabits'

// const options = [
//   { key: 'health', text: 'Health', value: 'health' },
//   { key: 'finance', text: 'Finance', value: 'finance' },
//   { key: 'relationship', text: 'Relationship', value: 'relationship' }
// ]

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
      title: "",
      description: "",
      category: "",
      frequency: this.props.currentHabit.frequency,
      redirect: false
    }
  }

  componentWillMount() {
    if (this.props.categories.length === 0) {
      this.props.fetchCategories()
    }

    let habitId = window.location.pathname.split("/")[2]
    // redux thunk
    this.props.fetchHabits(this.props.setCurrentHabit, habitId, this.updateState.bind(this))
  }

  updateState(){
    // debugger
    this.setState({
      title: this.props.currentHabit.title,
      description: this.props.currentHabit.description,
      frequency: this.props.currentHabit.frequency,
      category: this.props.currentHabit.category.name
    })
  }


  handleSubmit = (event) => {
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
      <Container>
        {this.state.redirect? <Redirect to={`/habits/${this.props.currentHabit.id}`}/> : null }
        <h1>Edit {this.state.title}</h1>
        <Form onSubmit={this.handleSubmit}>
          <Form.Field label='Title' control='input' value={this.state.title} name='title' onChange={this.handleChange}/>
          <Form.Field label='Description' control='input' value={this.state.description} name='description' onChange={this.handleChange}/>
          <Form.Dropdown label='Category' name='category' value={this.state.category} fluid search selection options={this.props.categories} onChange={this.handleDropdownChange} />
          <Form.Dropdown label='I want to complete this habit x times per week' value={this.state.frequency} name='frequency' compact selection options={optionsFrequency} onChange={this.handleDropdownChange} />
          <Button type='submit'>Submit</Button>
          <Link to={`/habits/${this.props.currentHabit.id}`}>Cancel</Link>
          <Divider hidden />
        </Form>
      </Container>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    updateHabit: UpdateHabit,
    setCurrentHabit: SetCurrentHabit,
    fetchCategories: FetchCategories,
    fetchHabits: FetchHabits
  }, dispatch)
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    currentHabit: state.currentHabit,
    categories: state.categories
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HabitEdit)
