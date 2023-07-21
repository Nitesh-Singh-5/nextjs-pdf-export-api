import React from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
} from 'recharts'

const CustomBarChart = ({ data }) => {
  console.log("data bar", data);


  return (
    <BarChart width={500} height={200} data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
      <XAxis dataKey="name" />
      <YAxis />
      <Bar isAnimationActive={false} dataKey="pv" fill="#8884d8" />
      <Bar isAnimationActive={false} dataKey="uv" fill="#82ca9d" />
    </BarChart>
  )
}

export default CustomBarChart
