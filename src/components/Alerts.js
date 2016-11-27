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
  submitAlert,
}) => {
  return (
    <Col>
      <Row>
        <Col className={white} flex="1" style={{ padding: `20px` }} spacing="20px">
          {createdAlerts.map((x, i) =>
            <Row key={i} spacing="5px">
              <Col style={{ marginLeft: `8px` }}>
                <span style={{ fontSize: `15px`, color: `#00d3b1` }}>{x.name}</span>
                <Row style={{ marginTop: `2px` }}>
                  <span style={{ fontSize: `12px` }}>
                    Created {moment(x.created).format(`MMM Do YY`)}
                  </span>
                </Row>
              </Col>
              <Row style={{ marginLeft: `auto` }}>
                <Row
                  className={viewBtn()}
                  style={{ width: `50px` }}
                  onClick={() => {
                    handleAlertChange(x.string || x.epl)
                    updateAlertTitle({ target: { value: x.name }})
                  }}
                >
                  <span>View</span>
                </Row>
                <Row
                  className={viewBtn(`rgb(235, 195, 106)`)}
                  style={{ width: `50px` }}
                >
                  <span>Disable</span>
                </Row>
                <Row
                  className={viewBtn(`rgb(237, 96, 96)`)}
                  style={{ width: `50px` }}
                >
                  <span>Delete</span>
                </Row>
              </Row>
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
            enableBasicAutocompletion
          />
          <Row spacing="20px">
            <Row className={button} onClick={submitAlert} flex="1">
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

let viewBtn = color => css({
  justifyContent: `center`,
  cursor: `pointer`,
  color: `${color || `#00d3b1`}`,
  marginLeft: `8px`,
  border: `2px solid ${color || `#00d3b1`}`,
  borderRadius: `4px`,
  padding: `8px 12px`,
  fontSize: `12px`,
  transition: `all 0.18s ease`,
  ':hover': {
    backgroundColor: `${color || `#00d3b1`}`,
    color: `#1e1e1e`,
    borderColor: `${color || `#00d3b1`}`,
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
