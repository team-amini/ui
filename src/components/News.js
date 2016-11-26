import React from 'react'

export default ({ data }) => {
  return (
    <div style={{ width: `100%`, padding: `20px` }}>
      <div style={{ color: `silver`, padding: `12px`, fontWeight: 100 }}>
        Latest Transacions
      </div>
      <table style={{ width: `100%` }}>
        <thead>
          <tr>
            <th>Transaction Time</th>
            <th>Action</th>
            <th>Sender</th>
            <th>Receiver</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {data.map((n, i) => {
            let x = new Date(n.transactiontime)
            return (
              <tr key={i}>
                <td>{x.toLocaleString()}</td>
                <td>{n.action}</td>
                <td>{n.from}</td>
                <td>{n.to}</td>
                <td style={{ textAlign: `right` }}>{n.amount}</td>
              </tr>
            )}
          )}
        </tbody>
      </table>
    </div>
  )
}
