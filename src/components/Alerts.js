import React from 'react'
import AceEditor from 'react-ace'
import moment from 'moment'
import { style as css } from 'glamor'
import { Row, Col, Center } from '../uikit/Flex'
import 'brace/mode/sql'
import 'brace/theme/monokai'

export default ({
  handleAlertChange,
  currentAlert,
  clear,
  createdAlerts,
  currentAlertTitle,
  updateAlertTitle,
}) => {
  return (
    <Col>
      <Row>
        <Col className={white} flex="1" style={{ padding: `20px` }}>
          <span style={{ fontWeight: 100, marginBottom: `10px` }}>Existing Alerts</span>
          {createdAlerts.map(x =>
            <Row key={x.name}>
              <Row
                className={viewBtn}
                style={{ width: `80px`, margin: 0 }}
                onClick={() => {
                  handleAlertChange(x.string)
                  updateAlertTitle(x.name)
                }}
              >
                <span>View</span>
              </Row>
              <Col style={{ marginLeft: `8px` }}>
                <span style={{ fontSize: `15px`, color: `#00d3b1` }}>{x.name}</span>
                <Row style={{ marginTop: `2px` }}>
                  <span style={{ fontSize: `12px` }}>
                    Created {moment(x.created).format(`MMM Do YY`)}
                  </span>
                </Row>
              </Col>
            </Row>
          )}
        </Col>
        <Col flex="1" style={{ padding: `20px` }}>
          <input
            className={input}
            type="text"
            value={currentAlertTitle}
            onChange={updateAlertTitle}
            placeholder="Name of alert.."
          />
          <AceEditor
            mode="sql"
            theme="monokai"
            onChange={handleAlertChange}
            value={currentAlert}
          />

          <Row spacing="20px">
            <Row className={button} flex="1">
              <span>Submit</span>
            </Row>
            <Row className={button} onClick={clear} flex="1">
              <span>Clear</span>
            </Row>
          </Row>
        </Col>
      </Row>
    </Col>
  )
}

let input = css({
  backgroundColor: `transparent`,
  border: `none`,
  borderBottom: `1px solid #00d3b1`,
  fontSize: `20px`,
  padding: `4px`,
  color: `#00d3b1`,
  marginBottom: `25px`,
})

let white = css({ color: `white` })

let viewBtn = css({
  marginTop: `30px`,
  justifyContent: `center`,
  cursor: `pointer`,
  color: `#00d3b1`,
  border: `2px solid #00d3b1`,
  borderRadius: `4px`,
  padding: `8px 12px`,
  transition: `all 0.18s ease`,
  ':hover': {
    backgroundColor: `#00d3b1`,
    color: `#1e1e1e`,
    borderColor: `#00d3b1`,
  },
})

let button = css({
  marginTop: `30px`,
  justifyContent: `center`,
  cursor: `pointer`,
  color: `#00d3b1`,
  border: `2px solid #00d3b1`,
  borderRadius: `4px`,
  padding: `8px 12px`,
  transition: `all 0.18s ease`,
  ':hover': {
    backgroundColor: `#00d3b1`,
    color: `#1e1e1e`,
    borderColor: `#00d3b1`,
  },
})
