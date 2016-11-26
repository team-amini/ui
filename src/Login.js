import React from 'react'
import { Row, Col, Center } from './uikit/Flex'
import logo from '../public/logo.png'
import hands from '../public/hands.png'

let s = {
  padding: `10px 15px`,
  borderTop: `none`,
  borderLeft: `none`,
  borderRight: `none`,
  borderBottom: `1px solid rgb(93, 93, 93)`,
}

let bg = {
  height: `100vh`,
  backgroundColor: `white`,
}

let b = {
  backgroundColor: `rgb(28, 111, 94)`,
  width: `160px`,
  height: `40px`,
  color: `white`,
  border: `none`,
  marginTop: `30px`,
}

export default () => (
  <Center style={bg}>
    <Col spacing="15px" style={{ justifyContent: `center`, alignItems: `center` }}>
      <Row><img src={hands} style={{ width: `85px`, height: `75px` }} /></Row>
      <Row><img src={logo} style={{ width: `150px`, height: `60px` }} /></Row>
      <Row>
        <input style={s} type="text" placeholder="Email.." />
      </Row>
      <Row>
        <input style={s} type="password" placeholder="Password.." />
      </Row>
      <Row>
        <button style={b}>LOGIN</button>
      </Row>
    </Col>
  </Center>
)
