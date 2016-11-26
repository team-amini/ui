import React, { Component } from 'react'
import Layout from './components/Layout'
import { style as css } from 'glamor'
import { withState } from 'recompose'
import { Row, Col, Center } from './uikit/Flex'
import hands from '../public/hands.svg'
import logoWhite from '../public/logo.png'
import chartSvg from '../public/chart.svg'
import BarChart from './components/BarChart'
import MapView from './components/MapView'
import ActivityView from './components/ActivityView'
import News from './components/News'
import FakeData from './FakeData'
import Login from './Login'

let sourceUrl = `http://amini.canadaeast.cloudapp.azure.com:8080/stream`

let source = new EventSource(sourceUrl)

class App extends Component {
  state = {
    loggedIn: false,
  }

  componentDidMount() {
    source.onmessage = e => {
      console.log(JSON.parse(e.data))
    }
  }

  render() {
  //if (!state.loggedIn) return <Login setState={setState} />
    if (this.mapContainer) {
      console.log(this.mapContainer.clientHeight)
      console.log(this.mapContainer.clientWidth)
    }

    return (
      <Layout>
        <Col className={heroContainer}>
          <Row>
            <Col flex="1" ref={node => this.mapContainer = node}>
              {this.state.mapContainer &&
                <MapView data={FakeData.fakeGeo()} />
              }
            </Col>
            <Col flex="1">
              <News />
            </Col>
          </Row>
          <Row>
            <BarChart data={FakeData.fakeChartValues()} label="Chart 1" />
            <ActivityView data={FakeData.fakeValues()} label="chart 2"/>
          </Row>
        </Col>
      </Layout>
    )
  }
}

let heroContainer = css({
  marginBottom: `200px`,
})

let heroHands = css({
  width: `150px`,
})

let heroLogo = css({
  width: `400px`,
})

let slogan = css({
  fontSize: `20px`,
  color: `white`,
})

let card = css({
  backgroundColor: `white`,
})

let chart = css({
  width: `350px`,
})

let cardPadding = css({
  padding: `100px`,
})

export default App
