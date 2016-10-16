import React, { Component } from 'react'
let LineChart = require("react-chartjs").Line;
import DataStore from '../stores/DataStore'
 

export default class Graph extends Component {
  constructor() {
    super();

    this.state = {
      mostWords: DataStore.getWordFreq(),
      frequency: DataStore.getFrequency()
    }

    this._onChange = this._onChange.bind(this) 
  }


  componentWillMount() {
    DataStore.startListening(this._onChange);
  }

  componentWillUnmount() {
    DataStore.stopListening(this._onChange);
  }

  _onChange() {
    this.setState({ 
      mostWords: DataStore.getWordFreq(),
      frequency: DataStore.getFrequency() 
    })
  }
  render() {
    // let testArr = ['3', '5', '5', '7', '6']
    // let color = '#561289'
    // let testNums = [10, 14, 34, 34, 56, 67, 89, 34]
    let {mostWords, frequency} = this.state
    let data = mostWords.map((cur,i) => {if(i < 20) return frequency[cur] })
    let list = mostWords.filter((cur,i) => {if(i < 20) return true })
    console.log(list)
    // console.log('I am data: ', data)
    // let chartData = {
    //    labels: testArr,
    //    backgroundColor: color,
    //     datasets: [{
    //         data: testNums,
    //         backgroundColor: color,
    //         borderColor: [
    //             'rgba(255,99,132,1)',
    //             'rgba(54, 162, 235, 1)',
    //             'rgba(255, 206, 86, 1)',
    //             'rgba(75, 192, 192, 1)',
    //             'rgba(153, 102, 255, 1)',
    //             'rgba(255, 159, 64, 1)'
    //         ],
    //         borderWidth: 5
    //     }]

    let barChartData = {
            labels: list,
            datasets: [{
                label: 'Dataset 1',
                backgroundColor: "rgba(220,220,220,0.5)",
                data: data
            }]

      }
    return (
      <LineChart data={barChartData} width="400" height="400"/>
    )
  
  }
}


