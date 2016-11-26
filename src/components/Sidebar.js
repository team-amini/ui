import React from 'react'
import { style as css } from 'glamor'
import { Row, Col } from '../uikit/Flex'
import InputRange from 'react-input-range'

export default ({
  timeRange,
  handleRangeChange,
  amountRange,
  handleAmountChange,
}) => {
  return (
    <Col className={white}>
      <Col style={{ padding: `20px`, marginTop: `20px` }}>
        <div style={{ color: `white`, paddingBottom: `30px` }}>Transaction Amount</div>
        <InputRange
          maxValue={1000}
          minValue={0}
          value={amountRange}
          onChange={handleAmountChange}
        />
      </Col>
      <Col style={{ padding: `20px`, marginTop: `20px` }}>
        <div style={{ color: `white`, paddingBottom: `30px` }}>Date Range</div>
        <InputRange
          maxValue={20}
          minValue={0}
          value={timeRange}
          onChange={handleRangeChange}
        />
      </Col>
      <Col style={{ padding: `20px` }}>
        <Row>Regions:</Row>
        <Col style={{ padding: `20px 0`}}>
          <Row className={items}>Ottawa</Row>
          <Row className={items}>Toronto</Row>
        </Col>
      </Col>
    </Col>
  )
}

let white = css({ color: `white` })
let items = css({ padding: `7px 0`, fontSize: `12px` })
