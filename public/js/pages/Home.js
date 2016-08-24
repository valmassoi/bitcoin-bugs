import React, { Component } from 'react'
import Chart from '../components/Chart'
import StockStore from '../stores/StockStore'
import * as StockAction from '../actions/StockAction'

export default class Home extends Component {

  constructor(props) {
    super(props)
    this.state = {
      GOLD: true,
      SILVER: true,
      BITCOIN: true,
    }
  }

  componentWillMount() {
    StockAction.addCard('GOLD')
    StockAction.addCard('SILVER')
    StockAction.addCard('BITCOIN')
  }

  componentWillUnmount() {
    StockStore.removeAllListeners('change')
  }

  toggleAsset(asset) {
    console.log('toggle', asset)
    if (!this.state[asset])
      StockAction.addCard(asset)// todo dont load from api, get from storage
    else
      StockAction.deleteCard(asset)
    this.setState({ [asset]: !this.state[asset] })
  }

  render() {
    return (
      <div class="centered">
        <Chart />
        <ul class="nav nav-pills">
          <li class={this.state.GOLD ? 'active' : ''}><a onClick={() => this.toggleAsset('GOLD')}>Gold</a></li>
          <li class={this.state.SILVER ? 'active' : ''}><a onClick={() => this.toggleAsset('SILVER')}>Silver</a></li>
          <li class={this.state.BITCOIN ? 'active' : ''}><a onClick={() => this.toggleAsset('BITCOIN')}>Bitcoin</a></li>
        </ul>
      </div>
    )
  }
}
