import _ from 'lodash'
import React, { Component } from 'react'
import { style as css } from 'glamor'
import * as d3 from 'd3'

export default class ActivityView extends Component {

  constructor() {
    super();
    this.state = {
      topSendersByTX:[],
      topSendersByValue:[],
      topReceiversByTX: [],
      topReceiversByValue: []
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
    let agg = _.groupBy(data, (d)=>{return d.from});
    let keys = Object.keys(agg);
    let senders = [];
    let receivers = [];

    keys.forEach((key) => {
      senders.push({
        id: key,
        numTX: agg[key].length,
        totalValue: _.sum(agg[key].map(d=>d.v))
      });
    });

    agg = _.groupBy(data, (d)=>{return d.to});
    keys = Object.keys(agg);
    keys.forEach((key) => {
      receivers.push({
        id: key,
        numTX: agg[key].length,
        totalValue: _.sum(agg[key].map(d=>d.v))
      });
    });


    let topSendersByTX = _.take(senders.sort((d)=> { -d.numTX }), 5);
    let topSendersByValue = _.take(senders.sort((d)=> { -d.totalValue}), 5);

    let topReceiversByTX = _.take(receivers.sort((d)=> { -d.numTX }), 5);
    let topReceiversByValue = _.take(receivers.sort((d)=> { -d.totalValue}), 5);

    this.setState({
      topSendersByTX: topSendersByTX,
      topSendersByValue: topSendersByValue,
      topReceiversByTX: topReceiversByTX,
      topReceiversByValue: topReceiversByValue
    });
  }

  render() {

    let activityTable = css({
      border: '1px solid #999',
      background: '#EEE'
    });

    let topSendersByTX = this.state.topSendersByTX.map((d)=> {
      return <tr key={d.id + '-s1'}><td>{d.id}</td><td>({d.numTX})</td></tr>
    });

    let topSendersByValue = this.state.topSendersByValue.map((d)=> {
      return <tr key={d.id + '-s2'}><td>{d.id}</td><td>({d.totalValue})</td></tr>
    });

    let topReceiversByTX = this.state.topReceiversByTX.map((d)=> {
      return <tr key={d.id + '-r1'}><td>{d.id}</td><td>({d.numTX})</td></tr>
    });

    let topReceiversByValue = this.state.topReceiversByValue.map((d)=> {
      return <tr key={d.id + '-r2'}><td>{d.id}</td><td>({d.totalValue})</td></tr>
    });


    return (
      <div style={{display:'flex', 'justifyContent':'center'}}>
        <div>
          <div>Top senders by # TX</div>
          <table className={activityTable}>
            <thead>
              <tr><th>Sender</th><th># TX</th></tr>
            </thead>
            <tbody>{topSendersByTX}</tbody>
          </table>
        </div>

        <div>
          <div>Top senders by value</div>
          <table className={activityTable}>
            <thead>
              <tr><th>Sender</th><th>Amt</th></tr>
            </thead>
            <tbody>{topSendersByValue}</tbody>
          </table>
        </div>

        <div>
          <div>Top receivers by # TX</div>
          <table className={activityTable}>
            <thead>
              <tr><th>Receiver</th><th># TX</th></tr>
            </thead>
            <tbody>{topReceiversByTX}</tbody>
          </table>
        </div>

        <div>
          <div>Top receivers by value</div>
          <table className={activityTable}>
            <thead>
              <tr><th>Receiver</th><th>Amt</th></tr>
            </thead>
            <tbody>{topReceiversByValue}</tbody>
          </table>
        </div>

      </div>
    )
  }
}
