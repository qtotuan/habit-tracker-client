import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import CurrentMonth from '../calendar/currentMonth'
import { Card, Icon, Image, Button, Item } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import SetCurrentHabit from '../../actions/setCurrentHabit'
import DeleteHabit from '../../actions/deleteHabit'
import completionRate from './habitCompletionRateFlexible'
import { Progress, Container } from 'semantic-ui-react'
import FetchHabits from '../../actions/fetchHabits'
import Chart from '../dashboard/chart'
import Gif from './habitGif'


const grammarBook = {
  1: "ONCE",
  2: "TWICE"
}

class HabitShow extends React.Component {
  componentWillMount() {
    let habitId = this.props.location.pathname.split("/")[2]
    this.props.fetchHabits(this.props.setCurrentHabit, habitId)
  }

  handleDelete = () => {
    this.props.deleteHabit(this.props.currentHabit)
  }

  getPhrase = frequency => {
    if (frequency < 3) {
      return `${grammarBook[frequency]}`
    } else {
      return `${frequency} times`
    }
  }

  render() {
    let category = "";
    if(this.props.currentHabit !== undefined && this.props.currentHabit.category !== undefined){
      category = this.props.currentHabit.category.name
      category = category[0].toUpperCase() + category.substr(1)
    }

    return(
      <Container className='habit-show-container'>

          {/* <h1 className='habit-title'>{this.props.currentHabit.title}</h1> */}
          <Gif searchTerm={this.props.currentHabit.title}/>

          <div className='card-container'>
            <Card className='semantic-card center-stuff'>
              <Card.Content>
                <Card.Header>
                  {this.props.currentHabit.title}
                </Card.Header>
                <Card.Meta>
                  <span className='date'>
                    {category}
                  </span>
                </Card.Meta>
                <Card.Description>
                  {this.props.currentHabit.description}
                </Card.Description>
              </Card.Content>
            </Card>
          </div>

          <section className="habit-details ui container">

          <div className='ui sub header frequency'>YOUR GOAL:</div>
          <div className='ui medium header frequency green'>{this.getPhrase(this.props.currentHabit.frequency)} PER WEEK</div>

        </section>

        <br /><br />

        <p><CurrentMonth habit={this.props.currentHabit}/></p>

        <br /><br />

        <div className='chart-container'>
          <Chart datesCompleted={this.props.currentHabit.dates_completed} target={this.props.currentHabit.frequency}/>
        </div>

        <br /><br />

        <Button><Link to={`${this.props.match.url}/edit`}>Edit</Link></Button>
        <Button><Link to='/habits' onClick={this.handleDelete}>Delete</Link></Button>

        <br /><br />
      </Container>
    )
  }
}

function mapStateToProps(state, ownProps) {
  const habit = state.habits.find( habit => habit.id.toString() === ownProps.match.params.habitId)
  console.log("mapStateToProps", habit)
  let result = (habit) ? { currentHabit: habit} : { currentHabit: {title: "Not found"} }
  return result
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setCurrentHabit: SetCurrentHabit,
    deleteHabit: DeleteHabit,
    fetchHabits: FetchHabits
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(HabitShow)
