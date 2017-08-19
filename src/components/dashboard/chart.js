import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import getData from './completionRates'
import { Container } from 'semantic-ui-react'



class Chart extends React.Component {
	render () {
    const data = getData(this.props.datesCompleted, this.props.target)
  	return (
      <Container className="chart">
        <h3>Completion Rates</h3>
        <LineChart width={600} height={300} data={data}
          margin={{top: 5, right: 30, left: 20, bottom: 5}}>
          <XAxis dataKey="name"/>
          <YAxis/>
          <CartesianGrid strokeDasharray="3 3"/>
          <Tooltip/>
          <Legend />
          <Line type="monotone" dataKey="completionRate" stroke="#8884d8" activeDot={{r: 8}}/>
        </LineChart>
      </Container>
    )
  }
}

export default Chart
