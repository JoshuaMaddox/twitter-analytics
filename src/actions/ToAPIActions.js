import API from '../API'

const ToAPIActions = {
  sendTerm(term){
    API.sendTerm(term) 
  },
  turnOn(term){
    API.turnOn(term)
  }
}
export default ToAPIActions