// import React from 'react'
// import { Dropdown } from 'semantic-ui-react'
//
//
// const options = [
//   { key: 'health', text: 'Health', value: 'health' },
//   { key: 'finance', text: 'Finance', value: 'finance' },
//   { key: 'relationship', text: 'Relationship', value: 'relationship' }
// ]
//
// class CategoryButton extends React.Component {
//
//   constructor(props) {
//     super(props)
//
//     this.state = {
//       category: ''
//     }
//   }
//
//   handleDropdownChange = (e, result) => {
//     let key = result.name
//     let value = result.value
//     this.setState({
//       [key]: value
//     })
//   }
//
//   render() {
//     return(
//       <Dropdown
//         label='Category'
//         placeholder='Select Category'
//         name='category'
//         fluid search selection options={options}
//         onChange={this.handleDropdownChange}
//       />
//     )
//   }
//
// }
//
// export default CategoryButton
