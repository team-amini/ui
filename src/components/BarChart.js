import React, { Component } from 'react'
import * as d3 from 'd3'

export default class BarChart extends Component {
  state = {
    node: null,
    set: false,
  }

  componentDidUpdate() {
    if (this.state.node && !this.state.set) {
      this.setState({ set: true })
      let data = this.props.data;
      let element = d3.select(this.chartNode);

      console.log(data.length, '!!!!!!!!!!!');

      let w = parseFloat(element.style('width'));
      let h = parseFloat(element.style('height'));

      let xFn = (d)=>{ return d.k; };
      let yFn = (d)=>{ return d.v; };

      let yoffset = 20;
      let xExtent = d3.extent( data.map(xFn) );
      let yExtent = d3.extent( data.map(yFn) );
      let x = d3.scaleTime().domain(xExtent).range([1, w-1]);
      let y = d3.scaleLinear().domain(yExtent).range([h-yoffset, 1]);

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
        .style('stroke', '#4BB')
        .style('stroke-width', 2)
        .style('fill', 'none');


      let barWidth = w / data.length;
      let yFn2 = (d)=>{ return d.numTrans; };
      let yExtent2 = d3.extent( data.map(yFn2) );
      let y2 = d3.scaleLinear().domain(yExtent2).range([h-yoffset, h*0.7]);

      g.selectAll('.bars')
        .data(data)
        .enter()
        .append('rect')
        .classed('bars', true)
        .attr('x', (d)=>x(xFn(d)))
        .attr('y', (d)=>y2(yFn2(d)))
        .attr('height', (d, i)=> { return h - y2(yFn2(d)) - yoffset;})
        .attr('width', 2)
        .style('fill', '#888')
        .style('fill-opacity', 0.6);

        // Add the x Axis
        svg.append("g")
          .attr("transform", "translate(0," + (h - yoffset) + ")")
          .call(d3.axisBottom(x));

        // Add the y Axis
        svg.append("g")
            .call(d3.axisRight(y));
    }
  }

  render() {
    return (
      <div
        ref={
          node => {
            !this.state.node && this.setState({ node })
          }
        }
      >
        {this.state.node &&
          <div
            ref={node => this.chartNode = node}
            style={{ width: `${this.state.node.clientWidth}px`, height: `300px` }}
          />
        }
      </div>
    )
  }

}
