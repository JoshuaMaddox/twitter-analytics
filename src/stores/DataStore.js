import { EventEmitter } from 'events'
import AppDispatcher from '../AppDispatcher'

let _twitterData = {}
let _wordFreq = [""];
let _frequency = {}
let _watson = {}
let training = {
  
}
let perm = {
  "":true
}



class DataStore extends EventEmitter {
  constructor(){
    super()
    AppDispatcher.register(action => {
      switch(action.type) {
        case 'DATA_OBJ_RECEIVED':
        let { twitter, wordFreq, watson, wordObj } = action.payload.dataObj
        _frequency = wordObj
        _twitterData = twitter
        _wordFreq = this.permWordFreq(wordFreq);
        _watson = watson
        this.emit('CHANGE')
        break
        case 'ADD_TO_TRAIN':
          training = action.payload[0]
          perm = action.payload[1]
          _wordFreq = this.trainWordFreq(_wordFreq)
          console.log(_wordFreq)
        this.emit('CHANGE')
        break
      }
    })
  }

  startListening(cb){
    this.on('CHANGE', cb)
  }

  stopListening(cb){
    this.removeListener('CHANGE', cb)
  }
  permWordFreq(wordFreq){
    return wordFreq.filter((cur) => {
      if(!perm[cur]){
        return true
      }
    })
  }
  trainWordFreq(wordFreq){
    return wordFreq.filter((cur) => {
      if(training[cur]){
        return true
      }
    })
  }

  getFrequency() {
    return _frequency
  }

  getTwitterData(){
    return _twitterData
  }

  getWordFreq(){
    return _wordFreq
  }

  getWatson(){
    return _watson
  }

}

export default new DataStore