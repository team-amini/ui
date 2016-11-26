import React, { Component } from 'react'
import * as d3 from 'd3'

export default class BarChart extends Component {

  componentDidMount() {
    let data = this.props.data;
    let element = d3.select(this.node);

    let w = parseFloat(element.style('width'));
    let h = parseFloat(element.style('height'));

    let xFn = (d)=>{ return d.k; };
    let yFn = (d)=>{ return d.v; };

    let xExtent = d3.extent( data.map(xFn) );
    let yExtent = d3.extent( data.map(yFn) );
    let x = d3.scaleTime().domain(xExtent).range([1, w-1]);
    let y = d3.scaleLinear().domain(yExtent).range([h-1, 1]);

    let path = d3.line()
      .x((d)=>x(xFn(d)))
      .y((d)=>y(yFn(d)));

    let svg = element.append('svg')
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('viewbox', '0 0 ' + w + ' ' + h)
      .attr('preserveAspectRatio', 'xMinYMin');

    let g = svg.append('g');

    g.append('path')
      .datum(data)
      .attr('d', path)
      .style('stroke', '#BBB')
      .style('fill', 'none');

    let barWidth = w / data.length;

    g.selectAll('.bars')
      .data(data)
      .enter()
      .append('rect')
      .classed('bars', true)
      .attr('x', (d)=>x(xFn(d)))
      .attr('y', (d)=>y(yFn(d) * 0.5))
      .attr('height', (d, i)=> { return h - y(yFn(d));})
      .attr('width', barWidth)
      .style('fill', '#333')
      .style('fill-opacity', 0.3);
  }

  render() {
    // return (<div>hi</div>)
    return (
      <div>
        <div ref={node => this.node = node} style={{'width':'800px', 'height':'120px'}}></div>
        <div>{this.props.label}</div>
      </div>
    )
  }

}
