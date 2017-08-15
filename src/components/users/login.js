import React, { Component } from 'react'
import { Container, Button, Divider, Form, Message, Icon } from 'semantic-ui-react'
import { Link, Redirect } from 'react-router-dom'
import AuthAdapter from '../../authAdapter'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import SetUser from '../../actions/setUser'

class LoginForm extends Component {

  constructor(props) {
    super(props)

    this.state = {
      email: '',
      redirect: false
    }
  }

  handleChange = (event) => {
    this.setState({
      email: event.target.value,
      error: false
    })
  }

  onLogin = (loginParams) => {
    // debugger
  AuthAdapter.login(loginParams)
    .then( res => {
      if( res.error ){
        this.setState({ error: true })
        console.log("do nothing")
      } else {
        localStorage.setItem('email', res.user.email)
        this.props.setUser(res.user)
        this.setState({ redirect: true })
        console.log("You are logged in!");
        // this.setState({
        //   auth:{
        //     currentUser: res.user
        //   }
        // })
      }
    })
}

  render() {
    let message = <Message attached='bottom' warning>
      <Icon name='warning circle' />
      User email does not exist in our database. Please try again or sign up.
    </Message>

    return(
      <Container>
        {this.state.redirect? <Redirect to={`/habits`}/> : null }

        <h1>Login</h1>
        {/* <Form size='large' id='login-form' onSubmit={() => this.props.onLogin(this.state)}> */}
        <Form size='large' id='login-form' onSubmit={() => this.onLogin(this.state)}>
          <Form.Field onChange={this.handleChange} label='Email' control='input' placeholder='Email' />
          <Button  type='submit' color='blue'>Login</Button><br /><br />
          {/* <Button><Link to="/habits"> Log In</Link></Button><br /><br /> */}
          or
          <Link to="/signup"> Sign Up</Link>
          <Divider hidden />
        </Form>
        {this.state.error? message : null}
      </Container>
    )
  }

}


function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setUser: SetUser
  }, dispatch)
}

export default connect(null, mapDispatchToProps)(LoginForm)
