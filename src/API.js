import { get } from 'axios'
import ServerActions from './actions/ServerActions'

const API = {
  sendTerm(term){
    console.log('term: ', term)
    get(`/search?term=${encodeURIComponent(term)}`)
      .then(res => {
        let { data } = res
        ServerActions.receiveSearch(data)
      })
      .catch(console.error)
  }
}

export default API