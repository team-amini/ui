import _ from 'lodash'
import React from 'react'

let transformData = data => {
  // Eh...too tired to optimize this crap
  let agg = _.groupBy(data, d => d.from)
  let keys = Object.keys(agg)

  let senders = keys.map(key => ({
    id: key,
    numTX: agg[key].length,
    totalValue: _.sum(agg[key].map(d => d.v)),
  }))

  agg = _.groupBy(data, d => d.to)
  keys = Object.keys(agg)

  let receivers = keys.map(key => ({
    id: key,
    numTX: agg[key].length,
    totalValue: _.sum(agg[key].map(d => d.v)),
  }))

  let num = 10

  let topSendersByTX = _.take(senders.sort(d => { -d.numTX }), num)
  let topSendersByValue = _.take(senders.sort(d => { -d.totalValue}), num)

  let topReceiversByTX = _.take(receivers.sort(d => { -d.numTX }), num)
  let topReceiversByValue = _.take(receivers.sort(d => { -d.totalValue}), num)

  return {
    topSendersByTX,
    topSendersByValue,
    topReceiversByTX,
    topReceiversByValue,
  }
}

export default ({ data, selectTransaction }) => {
  let {
    topSendersByTX: a,
    topSendersByValue: b,
    topReceiversByTX: c,
    topReceiversByValue: d,
  } = transformData(data)

  let topSendersByTX = a.map(d =>
    <tr key={d.id + '-s1'} onClick={() => selectTransaction(d)}>
      <td>{d.id}</td>
      <td style={{textAlign:'right'}}>{d.numTX}</td>
    </tr>
  )

  let topSendersByValue = b.map(d =>
    <tr key={d.id + '-s2'} onClick={() => selectTransaction(d)}>
      <td>{d.id}</td>
      <td style={{textAlign:'right'}}>{d.totalValue}</td>
    </tr>
  )

  let topReceiversByTX = c.map(d =>
    <tr key={d.id + '-r1'} onClick={() => selectTransaction(d)}>
      <td>{d.id}</td>
      <td style={{textAlign:'right'}}>{d.numTX}</td>
    </tr>
  )

  let topReceiversByValue = d.map(d =>
    <tr key={d.id + '-r2'} onClick={() => selectTransaction(d)}>
      <td>{d.id}</td>
      <td style={{ textAlign: `right` }}>{d.totalValue}</td>
    </tr>
  )

  return (
    <div style={{ padding: `10px` }}>
      <div style={{ color: `silver`, padding: `12px`, fontWeight: 100 }}>
        Most Active Clients
      </div>
      <div style={{display:'flex', 'justifyContent':'center', margin: '5px'}}>
        <table>
          <thead>
            <tr><th>Top Senders</th><th># TX</th></tr>
          </thead>
          <tbody>{topSendersByTX}</tbody>
        </table>

        <table>
          <thead>
            <tr><th>Top Senders</th><th>Amt</th></tr>
          </thead>
          <tbody>{topSendersByValue}</tbody>
        </table>

        <table>
          <thead>
            <tr><th>Top Receivers</th><th># TX</th></tr>
          </thead>
          <tbody>{topReceiversByTX}</tbody>
        </table>

        <table>
          <thead>
            <tr><th>Top Receivers</th><th>Amt</th></tr>
          </thead>
          <tbody>{topReceiversByValue}</tbody>
        </table>
      </div>
    </div>
  )
}
