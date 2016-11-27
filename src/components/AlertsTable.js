import React from 'react'
import _ from 'lodash'
import moment from 'moment'

export default ({ actualAlerts, createdAlerts }) => {
  return (
    <div style={{ padding: `20px` }}>
      <table style={{ width: `100%` }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Time</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          {actualAlerts.slice(0, 20).map((x, i) =>
            <tr key={i}>
              <td>{x.id}</td>
              <td style={{ color: `#ff006f` }}>
                {(createdAlerts.find(y => y.id === x.id) || {}).name}
              </td>
              <td>{moment(x.timestamp).format(`MMMM Do YYYY, h:mm:ss a`)}</td>
              <td>
                {x.data && Object.entries(x.data).map(([key, val], i) =>
                  <div key={i}>{_.startCase(key)}: {val}</div>
                )}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
