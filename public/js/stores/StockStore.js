import { EventEmitter } from 'events'
import _ from 'lodash'

import dispatcher from '../dispatcher'

class StockStore extends EventEmitter {
  constructor() {
    super()
    this.stocks = []
    this.data = []
    this.deleteSymbol = ''
  }

  getData() {
    return this.data
  }

  getCards() {
    return this.stocks
  }

  getDeleteSymbol() {
    return this.deleteSymbol
  }

  addData(asset, data) {
    console.log(asset, data)
    this.data.unshift({
      asset,
      data,
    })
    this.emit('data_add')
    if (this.data.length === 3) {
      // const bitcoin = this.data.filter(array => { // better to just get index of
      //   if (array.asset === 'BITCOIN')
      //     return true
      //   return false
      // })
      // const gold = this.data.filter(array => {
      //   if (array.asset === 'GOLD')
      //     return true
      //   return false
      // })
      // const ratio = bitcoin[0].data.map(btc => {// TODO
      //   gold[0].data.forEach(gld => {
      //     if (gld[0] >= btc[0])
      //       return [btc[0], 500 + btc[1]]
      //   })
      // })
      // console.log(ratio)
      // this.data.unshift({
      //   asset: 'RATIO',
      //   data: ratio,
      // })
      this.emit('data_add')
    }
  }


  deleteCard(asset) {
    console.log('hiding on chart', asset)
    this.deleteSymbol = asset
    _.pullAllBy(this.stocks, [{ asset }], 'asset')
    _.pullAllBy(this.data, [{ asset }], 'asset')
  }

  handleActions(action) {
    const { asset, json } = action
    switch (action.type) {
      case 'ADD_CARD': {
        this.addData(asset, json.data)
        this.emit('change')
        break
      }
      case 'GOT_DATA': {
        break
      }
      case 'DELETE_CARD': {
        this.deleteCard(asset)
        this.emit('change')
        this.emit('data_remove')
        break
      }
      default:
    }
  }
}
const stockStore = new StockStore
dispatcher.register(stockStore.handleActions.bind(stockStore))
// window.StockStore = StockStore//TODO for testing
// window.dispatcher = dispatcher//TODO for testing
export default stockStore
