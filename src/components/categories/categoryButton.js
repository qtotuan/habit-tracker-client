import React from 'react'
import { Dropdown } from 'semantic-ui-react'


const options = [
  { key: 'health', text: 'Health', value: 'health' },
  { key: 'finance', text: 'Finance', value: 'finance' },
  { key: 'relationship', text: 'Relationship', value: 'relationship' }
]

class categoryButton extends React.Component {

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

  handleDropdownChange = (e, result) => {
    let key = result.name
    let value = result.value
    this.setState({
      [key]: value
    })
  }

  <Dropdown placeholder="Select Category" name='category' compact selection options={options} onChange={this.handleDropdownChange} />

}

export default categoryButton
