import _ from 'lodash'
import React, { Component } from 'react'
import { style as css } from 'glamor'
import * as d3 from 'd3'

export default class News extends Component {

  constructor() {
    super();
    this.state = {
      news: []
    };
  }


  componentDidMount() {
    //let data = this.props.data;

    this.setState({
      news: this.props.data
    });
  }

  render() {

    let news = [];
    this.state.news.forEach((n, i)=> {
      let x = new Date(n.transactiontime);
      news.push(<tr key={i}><td>{x.toLocaleString()}</td><td>{n.action}</td><td>{n.from}</td><td>{n.to}</td><td style={{textAlign:'right'}}>{n.amount}</td></tr>)
    });

    return (
      <div>
         <table>
         <thead>
            <tr><th>Transaction Time</th><th>Action</th><th>Sender</th><th>Receiver</th><th>Amount</th></tr>
         </thead>
         <tbody>{news}</tbody>
         </table>
      </div>
    )
  }
}
