import React, { Component } from 'react'
import Layout from './components/Layout'
import { Row, Col } from './uikit/Flex'
import GTooltip from './uikit/GTooltip'
import BarChart from './components/BarChart'
import MapView from './components/MapView'
import ActivityView from './components/ActivityView'
import News from './components/News'
import SimuData from './SimuData'
import Alerts from './components/Alerts'
import AlertsTable from './components/AlertsTable'
import Login from './Login'
import Nodelink from './components/Nodelink'

let api = `http://amini.canadaeast.cloudapp.azure.com:8080`
let sourceUrl = `${api}/stream`
let source = new EventSource(sourceUrl)

class App extends Component {
  state = {
    currentPage: `Dashboard`,
    selectedTransaction: null,
    loggedIn: false,
    timeRange: {
      min: 2,
      max: 10,
    },
    amountRange: {
      min: 250,
      max: 500,
    },
    currentAlert: ``,
    currentAlertTitle: ``,
    actualAlerts: [],
    createdAlerts: [
      {
        id: `fake`,
        name: `Balance Depletion`,
        created: new Date(),
        disabled: false,
        string:
          `SELECT userId,count(*) as totalViews
              FROM Request.win:time(30 sec) GROUP BY userId`
        ,
      },
    ],
    createdAlerts: [
      {
        id: `fake`,
        name: `Large Account Activity`,
        created: new Date(),
        disabled: false,
        string:
        `SELECT senderAccount, AVG(amount) as avgAmount
            AS avergeAmount
            FROM Event.win:time(30 seconds)
            WHERE avgAmount > 35000
            GROUP BY senderAccount`,
      },
    ],
    tooltip: null,
  }

  constructor(props) {
    super(props)
    this.submitAlert = this.submitAlert.bind(this)
  }

  async componentDidMount() {
    source.onmessage = e => {
      this.setState({
        actualAlerts: [
          JSON.parse(e.data),
          ...this.state.actualAlerts,
        ],
      })
    }

    let response = await fetch(`${api}/alerts`)
    let data = await response.json()

    this.setState({
      createdAlerts: [
        ...this.state.createdAlerts,
        ...data,
      ],
    })
  }

  async submitAlert() {
    let response = await fetch(`${api}/alerts`, {
      method: `POST`,
      headers: { 'Content-Type': `application/json` },
      body: JSON.stringify({
        name: this.state.currentAlertTitle,
        description: `Super Dumb`,
        epl: this.state.currentAlert,
      }),
    })

    let data = await response.json()

    this.setState({
      createdAlerts: [
        ...this.state.createdAlerts,
        data,
      ],
    })
  }

  async toggleEnabled(alert) {
    let disabled = !alert.disabled
    let i = this.state.createdAlerts.findIndex(x => x.id === alert.id)

    fetch(`${api}/alerts/${alert.id}/${disabled ? `disable` : `enable`}`, { method: `PUT` })

    this.setState({
      createdAlerts: [
        ...(this.state.createdAlerts.slice(0, i)),
        {
          ...alert,
          disabled,
        },
        ...(this.state.createdAlerts.slice(i + 1, Infinity)),
      ],
    })
  }

  render() {
    if (!this.state.loggedIn) return <Login logIn={() => this.setState({ loggedIn: true })} />

    return (
      <Layout
        handleAmountChange={(component, amountRange) => this.setState({ amountRange })}
        handleRangeChange={(component, timeRange) => this.setState({ timeRange })}
        setPage={currentPage => this.setState({ currentPage })}
        {...this.state}
      >
        <Col>
          {this.state.currentPage === `Dashboard` &&
            <span>
              <Row>
                <Col flex="1">
                  <MapView data={SimuData.fakeGeo({ amountRange: this.state.amountRange })} />
                </Col>
                <Col flex="1" style={{ justifyContent: `center`, alignItems: `center` }}>
                  <News data={SimuData.fakeNews({ amountRange: this.state.amountRange })} />
                </Col>
              </Row>
              <Row>
                <Col flex="1" style={{ padding: `10px` }}>
                  <BarChart
                    data={SimuData.fakeChartValues({ amountRange: this.state.amountRange })}
                    setTooltip={tooltip => this.setState({ tooltip })}
                  />
                </Col>
                <Col flex="1">
                  <ActivityView
                    selectedTransaction={this.state.selectedTransaction}
                    selectTransaction={selectedTransaction => this.setState({ selectedTransaction })}
                    data={SimuData.fakeValues({ amountRange: this.state.amountRange })}
                  />
                </Col>
              </Row>
              <Nodelink
                setTooltip={tooltip => this.setState({ tooltip })}
              />
            </span>
          }
          {this.state.currentPage === `Manage Alerts` &&
            <Alerts
              handleAlertChange={currentAlert => this.setState({ currentAlert })}
              currentAlert={this.state.currentAlert}
              clear={() => this.setState({ currentAlert: ``, currentAlertTitle: `` })}
              createdAlerts={this.state.createdAlerts}
              currentAlertTitle={this.state.currentAlertTitle}
              updateAlertTitle={e => this.setState({ currentAlertTitle: e.target.value })}
              submitAlert={this.submitAlert}
              toggleEnabled={alert => this.toggleEnabled(alert)}
            />
          }

          {this.state.currentPage === `View Alerts` &&
            <AlertsTable
              actualAlerts={this.state.actualAlerts}
              createdAlerts={this.state.createdAlerts}
            />
          }
        </Col>
        <GTooltip tooltip={this.state.tooltip} />
      </Layout>
    )
  }
}

export default App
