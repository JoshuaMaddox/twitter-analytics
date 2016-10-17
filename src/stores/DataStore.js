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

let _stream = []



class DataStore extends EventEmitter {
  constructor(){
    super()
    AppDispatcher.register(action => {
      switch(action.type) {
        case 'DATA_OBJ_RECEIVED':
        let { twitter, wordFreq, watson, wordObj } = action.payload.dataObj
        console.log('cur.document_tone.cur.document_tone.cur.document_tone. ', wordFreq)
        _frequency = wordObj
        _twitterData = twitter
        // _wordFreq = this.permWordFreq(wordFreq);
        _wordFreq = wordFreq.filter(cur => cur[0] == "#") 
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
        case 'TWEET_STREAM':
          _stream.unshift(action.payload)
          // _stream.forEach((cur) => {
            
            action.payload.split(' ').forEach((cur2) => {
              if(cur2[0] == "#" && cur2[1] !== " "){
                console.log('CUR 2: ', cur2)
                console.log('FREQUENCY: ', _frequency[cur2])
                if(_frequency[cur2]) {
                      _frequency[cur2] += 1
                    }else {
                      _frequency[cur2] = 1
                    }
                if(_wordFreq.indexOf(cur2) == -1){
                  _wordFreq.push(cur2)  
                }
              }
            // })
          })
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

  getStream(){
    return _stream
  }

}

export default new DataStore