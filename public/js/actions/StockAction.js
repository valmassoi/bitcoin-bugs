import dispatcher from '../dispatcher'
import $ from 'jquery'
const local = ''// TODO CHANGE URL http://192.168.1.128:8081

export function addCard(asset) {
  console.log(asset)
  dispatcher.dispatch({ type: 'FETCH_STOCK' })
  const url = `${local}/api/${asset}`
  $.getJSON(url, (json) => {
    dispatcher.dispatch({ type: 'ADD_CARD', asset, json })
  }).done(() => {
    dispatcher.dispatch({ type: 'GOT_DATA' })
  }).fail((jqXHR, textStatus) => {
    alert('Stock Data Fetch Failed: ' + textStatus)
  })
}

export function deleteCard(asset) {
  dispatcher.dispatch({ type: 'DELETE_CARD', asset })
}
