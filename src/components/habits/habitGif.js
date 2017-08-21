import React from 'react'
import { connect } from 'react-redux'
// import { Card, Icon, Image, Item } from 'semantic-ui-react'


const baseUrl = "http://api.giphy.com/v1/gifs/search"
const apiKey = "b01280d801ae455d8a12bc41a19d3cb8"

class HabitGif extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      currentGifUrl: "",
      gifWasfetched: false
    }
  }

  fetchGif() {
    if (this.props.currentHabit.title !== "Not found" && this.state.gifWasfetched === false) {
      fetch(`${baseUrl}?q=+${this.props.searchTerm}+&api_key=${apiKey}`)
      .then( res => res.json() )
      .then( json => {
        console.log("-------------->", json);
        let rand = Math.floor(Math.random() * 25)
        this.setState({
          currentGifUrl: json.data[rand].images.downsized.url,
          gifWasfetched: true
        })
      })
    }
  }

  render() {
    if (this.props.currentHabit.title !== "Not found" && this.props.currentHabit.title !== undefined && this.state.gifWasfetched === false ) {
      this.fetchGif()
    }

    return(
      <img className="gif-image" src={this.state.currentGifUrl}/>
    )
  }

}


function mapStateToProps(state) {
  return {
    currentHabit: state.currentHabit
  }
}

export default connect(mapStateToProps)(HabitGif)
