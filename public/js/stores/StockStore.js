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
      data
    })
  }


  deleteCard(symbol) {
    this.deleteSymbol = symbol
    _.pullAllBy(this.stocks, [{ symbol }], 'symbol')
    _.pullAllBy(this.data, [{ symbol }], 'symbol')
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
        this.emit('data_add')
        break
      }
      case 'DELETE_CARD': {
        this.deleteCard(symbol)
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
