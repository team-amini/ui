import React from 'react'
import { style as css, insertRule } from 'glamor'
import { Row, Col, Center } from './uikit/Flex'
import logo from '../public/logo.png'
import hands from '../public/hands-BLANK.svg'

let bg = {
  height: `100vh`,
  backgroundColor: `#1fb69e`,
  transform: `scale(1.2)`,
}

export default ({ logIn }) => (
  <Center style={bg} className="login">
    <Col spacing="15px" style={{ justifyContent: `center`, alignItems: `center` }}>
      <Row><img src={hands} style={{ width: `85px`, height: `75px` }} /></Row>
      <Row><img src={logo} style={{ width: `150px`, height: `60px` }} /></Row>
      <Row>
        <input className={input} type="text" placeholder="Email.." />
      </Row>
      <Row>
        <input className={input} type="password" placeholder="Password.." />
      </Row>
      <Row>
        <button className={b} onClick={logIn}>LOGIN</button>
      </Row>
    </Col>
  </Center>
)

let b = css({
  backgroundColor: `#1fb69e`,
  width: `160px`,
  height: `40px`,
  color: `rgb(37, 37, 37)`,
  border: `none`,
  marginTop: `30px`,
  border: `2px solid rgb(37, 37, 37)`,
  borderRadius: `4px`,
  transition: `all 0.2s ease`,
  cursor: `pointer`,
  ':hover': {
    backgroundColor: `#24a28e`,
  },
})

let input = css({
  background: `transparent`,
  border: `2px solid rgb(37, 37, 37)`,
  borderRadius: `4px`,
  padding: `10px 15px`,
})
