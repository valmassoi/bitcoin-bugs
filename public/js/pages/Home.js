import React, { Component } from 'react'
import Chart from '../components/Chart'
import StockStore from '../stores/StockStore'
import * as StockAction from '../actions/StockAction'

export default class Home extends Component {

  constructor(props) {
    super(props)
    this.state = {

    }
  }

  componentWillMount() {
    StockAction.addCard('SILVER')
    StockAction.addCard('GOLD')
  }

  componentWillUnmount() {
    StockStore.removeAllListeners('change')
  }


  render() {
    return (
      <div class="centered">
        <Chart />
        <ul class="nav nav-pills">
          <li class="active"><a href="#">Gold</a></li>
          <li class="active"><a href="#">Silver</a></li>
        </ul>
      </div>
    )
  }
}
