import React, { Component } from 'react'
import DataStore from '../stores/DataStore'
import ToAPIActions from '../actions/ToAPIActions'
import Form from './Form'
import MostWords from './MostWords'
import Graph from './Graph'
import {Link} from 'react-router'

export default class Layout extends Component {
  constructor() {
    super();
    // this.state = {
    //   testData: DataStore.getAllFlashCards()
    // }

    // this.testFunc = this.testFunc.bind(this)
    // this._onChange = this._onChange.bind(this)
  }

  // componentWillMount() {
  //   DataStore.startListening(this._onChange);
  // }

  // componentWillUnmount() {
  //   DataStore.stopListening(this._onChange);
  // }

  // _onChange() {
  //   this.setState({ 
  //     testData: DataStore.getAllFlashCards() 
  //   })
  // }

  // testFunc(e){
  //   e.preventDefault()
  //   ToAPIActions.getFlashCards()
  // }

  render() {
    return (
      <div>
        <Form />
        {this.props.children}
      </div>

    )
  }
}
  