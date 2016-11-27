import React from 'react'

export default ({ actualAlerts }) => {
  return (
    <div style={{ padding: `20px` }}>
      <table style={{ width: `100%` }}>
        <thead>
          <tr>
            <th>something</th>
          </tr>
        </thead>
        <tbody>
          {actualAlerts.map(x =>
            <tr>
              <td></td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
