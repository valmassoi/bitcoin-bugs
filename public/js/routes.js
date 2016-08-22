import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute } from 'react-router'
import createHashHistory from 'history/lib/createHashHistory'

import Home from './pages/Home'
import Layout from './pages/Layout'

const app = document.getElementById('app')

const history = createHashHistory({ queryKey: false })

ReactDOM.render(
  <Router history={history}>
    <Route path="/" component={Layout}>
      <IndexRoute component={Home} />
    </Route>
  </Router>,
app)
