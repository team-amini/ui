import _ from 'lodash'
import React, { Component } from 'react'
import * as d3 from 'd3'

export default class ActivityView extends Component {

  constructor() {
    super();
    this.state = {
      topSendersByTX:[],
      topSendersByValue:[]
    }
  }

  componentDidMount() {
    let data = this.props.data;
    // let element = d3.select(this.node);

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
    /*
    topSendersByTX.forEach((sender)=> {
      element.append('div').text('sender: ' + sender.sender + ' transactions:' + sender.numTX);
    });
    */


    let topSendersByValue = _.take(senders.sort((d)=> { -d.totalValue}), 5);
    /*
    topSendersByValue.forEach((sender)=> {
      element.append('div').text('sender: ' + sender.sender + ' total value:' + sender.totalValue);
    });
    */

    this.setState({
      topSendersByTX: topSendersByTX,
      topSendersByValue: topSendersByValue
    });
  }

  render() {

    let topSendersByTX = this.state.topSendersByTX.map((d)=> {
      return <li key={d.sender}>{d.sender}  <em>({d.numTX})</em></li>
    });

    let topSendersByValue = this.state.topSendersByValue.map((d)=> {
      return <li key={d.sender}>{d.sender} <em>({d.totalValue})</em></li>
    });

    return (
      <div>
        <span>
          <span>Top senders by # TX</span>
          <ul> {topSendersByTX} </ul>
        </span>

        <span>
          <span>Top senders by value</span>
          <ul> {topSendersByValue} </ul>
        </span>
      </div>
    )
  }
}
