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
import API from './API'

let sourceUrl = `http://amini.canadaeast.cloudapp.azure.com:8080/stream`

let source = new EventSource(sourceUrl)

class App extends Component {
  state = {
    loggedIn: false,
    selectedTransaction: null,
    timeRange: {
      min: 2,
      max: 10,
    },
  }

  componentDidMount() {
    this.api = new API();
    source.onmessage = e => {
      console.log(JSON.parse(e.data))
    }

    this.api.getHistory(1, 2).then((d)=> {
      console.log('API history', d);
    });
  }

  render() {
    //if (!state.loggedIn) return <Login setState={setState} />
    return (
      <Layout
        handleRangeChange={(component, timeRange) => {
          console.log(123, timeRange)
          this.setState({ timeRange })
        }}
        {...this.state}
      >
        <Col>
          <Row>
            <Col flex="1">
              <MapView data={FakeData.fakeGeo()} />
            </Col>
            <Col flex="1">
              <News data={FakeData.fakeNews()} />
            </Col>
          </Row>
          <Row>
            <Col flex="1" style={{ padding: `10px` }}>
              <BarChart data={FakeData.fakeChartValues()}/>
            </Col>
            <Col flex="1">
              <ActivityView
                selectedTransaction={this.state.selectedTransaction}
                selectTransaction={selectedTransaction => this.setState({ selectedTransaction })}
                data={FakeData.fakeValues()}
              />
            </Col>
          </Row>
        </Col>
      </Layout>
    )
  }
}

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
