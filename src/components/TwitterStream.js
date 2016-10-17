import React, { Component } from 'react'
import DataStore from '../stores/DataStore'
import ToAPIActions from '../actions/ToAPIActions'
 

export default class TwitterStream extends Component {
  constructor() {
    super();

    this.state = {
      stream: DataStore.getStream()
    }

    this._onChange = this._onChange.bind(this) 
    this.startStream = this.startStream.bind(this) 
  }


  componentWillMount() {
    DataStore.startListening(this._onChange);
  }

  componentWillUnmount() {
    DataStore.stopListening(this._onChange);
  }

  startStream(){
    ToAPIActions.turnOn();
  }
  _onChange() {
    this.setState({ 
      stream: DataStore.getStream()
    })
  }
  render() {
    let {stream} = this.state
    return (
      <div>
        <table>
          <tbody>
            {stream.map((cur, i) => {
          return (
            <tr>
              <td>
                {i}: {cur}
              </td>
            </tr>
            )
        })}    
          </tbody>  
        </table>
        
      </div>
    )
  
  }
}


