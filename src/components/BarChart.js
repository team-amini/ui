import React, { Component } from 'react'
import Tooltip from '../uikit/Tooltip'
import * as d3 from 'd3'

export default class BarChart extends Component {
  state = {
    node: null,
    set: false,
  }

  componentWillReceiveProps(next) {
    this.drawChart(next.data)
  }

  drawChart(data) {
    this.chartNode.innerHTML = ``
    let element = d3.select(this.chartNode)

    let w = parseFloat(element.style('width'))
    let h = parseFloat(element.style('height'))

    let xFn = d => d.k
    let yFn = d => d.v

    let yoffset = 20
    let xExtent = d3.extent(data.map(xFn))
    let yExtent = d3.extent(data.map(yFn))
    let x = d3.scaleTime().domain(xExtent).range([1, w-1])
    let y = d3.scaleLinear().domain(yExtent).range([h-yoffset, 1])

    let path = d3.line()
      .x(d => x(xFn(d)))
      .y(d => y(yFn(d)))

    let svg = element.append('svg')
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('viewbox', '0 0 ' + w + ' ' + h)
      .attr('preserveAspectRatio', 'xMinYMin')

    let g = svg.append('g')
    //
    g.append('path')
      .datum(data)
      .attr('d', path)
      .style('stroke', '#4BB')
      .style('stroke-width', 2)
      .style('fill', 'none')

    let yFn2 = d => d.numTrans
    let yExtent2 = d3.extent(data.map(yFn2))
    let y2 = d3.scaleLinear().domain(yExtent2).range([h - yoffset, h * 0.7])

    g.selectAll('.bars')
      .data(data)
      .enter()
      .append('rect')
      .classed('bars', true)
      .attr('x', d => x(xFn(d)))
      .attr('y', d => y2(yFn2(d)))
      .attr('height', (d, i) => h - y2(yFn2(d)) - yoffset)
      .attr('width', 2)
      .style('fill', '#888')
      .style('fill-opacity', 0.6)

      // Add the x Axis
      svg.append("g")
        .attr("transform", "translate(0," + (h - yoffset) + ")")
        .call(d3.axisBottom(x))

      // Add the y Axis
      svg.append("g")
          .call(d3.axisRight(y))
  }

  componentDidUpdate() {
    if (this.state.node && !this.state.set) {
      this.setState({ set: true })
      this.drawChart(this.props.data)
    }
  }

  render() {
    return (
      <div
        style={{ padding: `10px` }}
        ref={
          node => {
            !this.state.node && this.setState({ node })
          }
        }
      >
        <div style={{ color: `silver`, padding: `12px`, fontWeight: 100 }}>
          Transaction Volume
        </div>
        {this.state.node &&
          <div
            ref={node => this.chartNode = node}
            style={{ width: `${this.state.node.clientWidth - 35}px`, height: `250px` }}
          />
        }
      </div>
    )
  }

}
