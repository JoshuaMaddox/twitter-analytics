import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory } from 'react-router';
import Layout from './components/Layout';
import Form from './components/Form'
import Graph from './components/Graph'
import MostWords from './components/MostWords'
import TwitterStream from './components/TwitterStream'





render(
  <div className="container">
    <Router history = {browserHistory}>
      <Route path = '/' component= {Layout}>
        <Route path= '/graph' component= {Graph}></Route>
        <Route path= '/mostwords' component= {MostWords}></Route>
        <Route path= '/streamingTweet' component= {TwitterStream}></Route>
      </Route>
    </Router>
  </div>,
  document.getElementById('root')  
)