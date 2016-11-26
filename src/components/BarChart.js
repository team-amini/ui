import React, { Component } from 'react'
import * as d3 from 'd3';

export default class BarChart extends Component {

  componentDidMount() {
    let element = d3.select(this.node);
    let svg = element.append('svg')
      .attr('width', '400px')
      .attr('height', '200px');

    let g = svg.append('g');
    g.selectAll('.bars')
      .data([10, 20, 30, 40])
      .enter()
      .append('rect')
      .classed('bars', true)
      .attr('x', (d, i)=> { return 10 + 10*i; })
      .attr('y', (d, i)=> { return 0; })
      .attr('height', (d, i)=> { return d;})
      .attr('width', 9)
      .style('fill', '#F00');
  }

  render() {
    // return (<div>hi</div>)
    return <div ref={node => this.node = node}></div>
  }

}
