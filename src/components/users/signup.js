import React, { Component } from 'react'
import { Container, Button, Divider, Form } from 'semantic-ui-react'
import { BrowserRouter as Router, Route, Redirect} from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import SetUser from '../../actions/setUser'

class SignUpForm extends Component {

  constructor (props) {
    super(props)

    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      redirect: false
    }
  }

  handleSubmit = (event) => {
    event.preventDefault()
    fetch(process.env.REACT_APP_API + 'signup', {
      method: 'POST',
      body: JSON.stringify(this.state),
      headers: {
        'content-type': 'application/json',
        'accept': 'application/json'
      }
    })
    .then(res => res.json())
    .then(json => {
      console.log(json);
      localStorage.setItem('email', json.user.email)
      this.props.setUser(json.user)
      this.setState({ redirect: true })
  })
}

  handleChange = (event) => {
    let key = `${event.target.name}`
    let value = `${event.target.value}`
    this.setState({
      [key]: value
    })
  }

  render() {
    return (
      <Container>
        {this.state.redirect ? <Redirect to="/habits"/> : null }
        <h1>Sign Up</h1>
        <Form size='large' id='signup-form' onSubmit={this.handleSubmit}>
          <Form.Field name="first_name" label='First name' control='input' placeholder='First name' onChange={this.handleChange} required/>
          <Form.Field name="last_name" label='Last name' control='input' placeholder='Last name'  onChange={this.handleChange} required/>
          <Form.Field name="email" label='Email' control='input' placeholder='Email address'  onChange={this.handleChange} required/>
          <Form.Field name="password" label='Password' control='input' placeholder='Password' type='password' onChange={this.handleChange} required/>
          <Button type='submit'>Submit</Button>
          <Divider hidden />
        </Form>
      </Container>
    )
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setUser: SetUser
  }, dispatch)
}

export default connect(null, mapDispatchToProps)(SignUpForm)
