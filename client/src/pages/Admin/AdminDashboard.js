import React from 'react'
import BusReports from '../../components/BusReports'
// import * as d3 from 'd3';
import { useRef, useEffect } from 'react';

// const BusRevenueChart = () => {
//   const chartRef = useRef(null);
//   const revenueData = [1000, 1500, 1200, 1800, 2000];
//   const expectedRevenueData = [800, 1200, 1000, 1500, 1800];
//   const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May'];

//   useEffect(() => {
//     const margin = { top: 20, right: 20, bottom: 30, left: 50 };
//     const width = chartRef.current.clientWidth - margin.left - margin.right;
//     const height = chartRef.current.clientHeight - margin.top - margin.bottom;

//     const svg = d3
//       .select(chartRef.current)
//       .append('svg')
//       .attr('width', width + margin.left + margin.right)
//       .attr('height', height + margin.top + margin.bottom)
//       .append('g')
//       .attr('transform', `translate(${margin.left}, ${margin.top})`);

//     const xScale = d3.scaleBand().domain(labels).range([0, width]).padding(0.1);
//     const yScale = d3.scaleLinear().domain([0, d3.max(revenueData)]).range([height, 0]);

//     svg
//       .append('g')
//       .attr('transform', `translate(0, ${height})`)
//       .call(d3.axisBottom(xScale));

//     svg.append('g').call(d3.axisLeft(yScale));

//     const line = d3
//       .line()
//       .x((d, i) => xScale(labels[i]) + xScale.bandwidth() / 2)
//       .y((d) => yScale(d));

//     svg
//       .append('path')
//       .datum(revenueData)
//       .attr('fill', 'none')
//       .attr('stroke', 'steelblue')
//       .attr('stroke-width', 1.5)
//       .attr('d', line);

//     svg
//       .selectAll('.bar')
//       .data(expectedRevenueData)
//       .enter()
//       .append('rect')
//       .attr('class', 'bar')
//       .attr('x', (d, i) => xScale(labels[i]))
//       .attr('y', (d) => yScale(d))
//       .attr('width', xScale.bandwidth())
//       .attr('height', (d) => height - yScale(d))
//       .attr('fill', 'rgba(255, 99, 132, 0.6)');
//   }, []);

//   return <div ref={chartRef} style={{ width: '100%', height: '300px' }} />;
// };


function AdminDashboard() {
  return (
    <div>
         <BusReports />
        {/* <BusRevenueChart /> */}


    </div>
   
  )
}

export default AdminDashboard