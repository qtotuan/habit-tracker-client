import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import completionRates from './completionRates'

const data = [ { name: '07-31', completionRate: 66 },
  { name: '08-07', completionRate: 33 },
  { name: '08-14', completionRate: 83 },
  { name: '08-21', completionRate: 16 },
  { name: '08-28', completionRate: 0 },
  { name: '09-04', completionRate: 0 },
  { name: '09-11', completionRate: 16 },
  { name: '09-18', completionRate: 16 },
  { name: '09-25', completionRate: 0 },
  { name: '10-02', completionRate: 0 },
  { name: '10-09', completionRate: 0 },
  { name: '10-16', completionRate: 0 },
  { name: '10-23', completionRate: 0 },
  { name: '10-30', completionRate: 16 } ]


class SimpleLineChart extends React.Component {
	render () {
  	return (
    	<LineChart width={600} height={300} data={data}
            margin={{top: 5, right: 30, left: 20, bottom: 5}}>
       <XAxis dataKey="name"/>
       <YAxis/>
       <CartesianGrid strokeDasharray="3 3"/>
       <Tooltip/>
       <Legend />
       <Line type="monotone" dataKey="completionRate" stroke="#8884d8" activeDot={{r: 8}}/>
      </LineChart>
    )
  }
}

export default SimpleLineChart
