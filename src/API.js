import { get } from 'axios'
import ServerActions from './actions/ServerActions'
const io = require('socket.io-client')
var socket = io.connect('http://localhost:8000');
// console.log('socket: ', socket);


const API = {
  sendTerm(term){
    console.log('term: ', term)
    get(`/search?term=${encodeURIComponent(term)}`)
      .then(res => {
        let { data } = res
        //console.log('data: ', data)
        ServerActions.receiveSearch(data)
      })
      .catch(console.error)
  },
  turnOn(term){
    console.log('got here: ')
    socket.on('twitter', (data) => {
      //console.log('data: ', data)
      ServerActions.incomingTweets(data)
    }) 
    console.log(term)
    get(`/search?term=${encodeURIComponent(term)}`)
      .then(res => {
             
      })
      .catch(console.error)
  }
}

export default API