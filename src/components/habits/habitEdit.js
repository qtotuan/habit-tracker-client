import React, { Component } from 'react'
import { Container, Button, Divider, Form, Dropdown } from 'semantic-ui-react'
import { BrowserRouter as Router, Route, Redirect} from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import UpdateHabit from '../../actions/updateHabit'

const options = [
  { key: 'health', text: 'Health', value: 'health' },
  { key: 'finance', text: 'Finance', value: 'finance' },
  { key: 'relationship', text: 'Relationship', value: 'relationship' }
]

class HabitEdit extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      user_id: this.props.currentUser.id,
      title: this.props.currentHabit.title,
      description: this.props.currentHabit.description,
      category_id: this.props.currentHabit.category_id,
      redirect: false
    }
  }

  handleSubmit = (event) => {
    event.preventDefault()
    // debugger
    this.props.updateHabit(this.props.currentHabit, this.state)
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
        <h1>Edit {this.props.currentHabit.title}</h1>
        <Form onSubmit={this.handleSubmit}>
          <Form.Field label='Title' control='input' value={this.state.title} name='title' onChange={this.handleChange}/>
          <Form.Field label='Description' control='input' value={this.state.description} name='description' onChange={this.handleChange}/>
          <Form.Dropdown label='Category' placeholder={this.props.currentHabit.category} name='category' fluid search selection options={options} onChange={this.handleDropdownChange} />
          <Button type='submit'>Submit</Button>
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
    updateHabit: UpdateHabit
  }, dispatch)
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    currentHabit: state.currentHabit
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HabitEdit)
