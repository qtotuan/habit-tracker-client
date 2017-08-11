import React from 'react'
import { Container, Button, Divider, Form, Dropdown } from 'semantic-ui-react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import CreateHabit from '../../actions/createHabit'

const options = [
  { key: 'health', text: 'Furniture', value: 'Furniture' },
  { key: 'finance', text: 'Pets', value: 'pets' },
  { key: 'relationship', text: 'Apartments', value: 'apartments' }
]

class HabitForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      user_id: `${this.props.currentUser.id}`,
      title: '',
      description: '',
      category: '',
      redirect: false,
      ad_id: 0
    }
  }

  handleSubmit =(event) => {
    event.preventDefault()
    this.props.createHabit(this.state)
  }

  handleChange = event => {
    let key = event.target.name
    let value= event.target.value
    this.setState({
      [key]: value
    })
  }

  render() {
    return(
      <div>
        {this.state.redirect? <Redirect to='/habits'/> : null }
        <h1>Create A New Habit</h1>
        <Form onSubmit='handleSubmit'>
          <Form.Field label='Title' control='input' placeholder='Title' name='title' onChange={this.handleChange}/>
          <Form.Field label='Description' control='input' placeholder='Description' name='description' onChange={this.handleChange}/>
          <Form.Dropdown label='Category' placeholder='Category' name='category' fluid search selection options={options} onChange={this.handleDropdownChange} />
          <Button type='submit'>Create Listing</Button>
          <Divider hidden />
        </Form>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    createHabit: CreateHabit
  }, dispatch)
}

export default connect(mapDispatchToProps)(HabitForm)
