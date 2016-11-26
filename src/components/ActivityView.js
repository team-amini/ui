import _ from 'lodash'
import React, { Component } from 'react'
import * as d3 from 'd3'

export default class ActivityView extends Component {

  componentDidMount() {
    let data = this.props.data;
    let element = d3.select(this.node);

    /*
    let w = parseFloat(element.style('width'));
    let h = parseFloat(element.style('height'));

    let svg = element.append('svg')
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('viewbox', '0 0 ' + w + ' ' + h)
      .attr('preserveAspectRatio', 'xMinYMin');

    let g = svg.append('g');
    */

    // Eh...too tired to optimize this crap
    let agg =  _.groupBy(data, (d)=>{return d.from});
    let keys = Object.keys(agg);

    let senders = [];
    keys.forEach((key) => {
      senders.push({
        sender: key,
        numTX: agg[key].length,
        totalValue: _.sum(agg[key].map(d=>d.v))
      });
    });

    let topSendersByTX = _.take(senders.sort((d)=> { -d.numTX }), 5);
    topSendersByTX.forEach((sender)=> {
      element.append('div').text('sender: ' + sender.sender + ' transactions:' + sender.numTX);
    });

    let topSendersByValue = _.take(senders.sort((d)=> { -d.totalValue}), 5);
    topSendersByValue.forEach((sender)=> {
      element.append('div').text('sender: ' + sender.sender + ' total value:' + sender.totalValue);
    });
  }

  render() {
    return (
      <div>
        <div>Activity</div>
        <div ref={node => this.node = node}></div>
      </div>
    )
  }
}
