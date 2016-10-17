import React, { Component } from 'react'
import ToAPIActions from '../actions/ToAPIActions'
import {Link} from 'react-router'

export default class Form extends Component {
  constructor() {
    super();

    this.submitSearchTerm = this.submitSearchTerm.bind(this)
  }

  submitSearchTerm(e){
    e.preventDefault()
    const { input } = this.refs
    let term = input.value
    ToAPIActions.turnOn(term)
  }

  render() {
    let marginL = {
            marginLeft: '5px',
          }
    return (
      <div>
        <h2 className="ui header">
        
          <i className="hashtag icon"></i>
          <div className="content">
            Search by Hashtag
          <div className="sub header">Frequency Analytics</div>
          </div>
        </h2>
        <div className="ui action input" style={marginL}>
          <form onSubmit={this.submitSearchTerm}>
            <input ref="input" type="text" placeholder="Search..." required/>
            <button className="ui button">Search</button>
          </form>
        </div>
        <div className="ui buttons">
          <Link to="/streamingTweet" className="ui button">Stream</Link>
          <div className="or"></div>
          <Link to="/graph" className="ui positive button">Graph</Link>
        </div>

      </div>

    )
  }
}













