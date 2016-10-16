import React, { Component } from 'react'
import DataStore from '../stores/DataStore'
import WordsActions from '../actions/WordsActions'
import uuid from 'uuid'


export default class MostWords extends Component {
  constructor() {
    super();
    this.state = {
      mostWords: DataStore.getWordFreq(),
      frequency: DataStore.getFrequency(),
      addWords: {},
      removeWords: {}
    }
    this._onChange = this._onChange.bind(this)
    this.addWord = this.addWord.bind(this)
    this.submit = this.submit.bind(this)
    this.removeWord = this.removeWord.bind(this)
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

  removeWord(word){
    let target = word;
    let {removeWords} = this.state
    removeWords[target] = true
    this.setState({
      removeWords : removeWords
    })
  }

  addWord(word,freq,e){
    let target = word;
    let {addWords} = this.state
    addWords[target] = freq
    this.setState({
      addWords : addWords
    })
  }

  submit(){
    let {addWords,removeWords} = this.state
    console.log(addWords)
    console.log(removeWords)
    WordsActions.trainWords(addWords,removeWords);
    //<div className='chart'>
      //          <div onClick={this.removeWord.bind(null,word)}>
      //            <div className='percent' id={percent.toString()} style={myWidth}>
       //             {word} || Freq:{frequency[word]}
                    
       //           </div>
       //         </div>
       //         <p onClick={this.addWord.bind(null,word,frequency[word])} className='deleteBtn'>x</p>
       //       </div>
  }


  render() {
              
     
    const { mostWords, frequency } = this.state
    let mostUsedWords;
    let firstNum
    if(mostWords) {
      mostUsedWords = mostWords.map((word, i, a) => {
          firstNum = (i === 0) ? frequency[word] : firstNum
          let percent = Math.floor((parseInt(frequency[word]) / parseInt(firstNum)) * 100)
          let myWidth = {
            width: `${percent}%`,
            color: '#fff'
          }  
          if(i < 26){
            return (
            <div className="progressHolder" key={uuid()}>
              <div className="ui progress">
                <div className="bar" style={myWidth}>
                  <div className="progress">{percent+"%"}</div>
                </div>
                <div className="label">
                {word} {frequency[word]} 
                <div className="ui vertical animated button addBtn" tabIndex="1">
                  <div className="hidden content" onClick={this.addWord.bind(null,word,frequency[word])}>Add</div>
                  <div className="visible content">
                    <i className="lab icon"></i>
                  </div>
                </div>
                <div className="ui vertical animated red tiny button addBtn" tabIndex="1">
                  <div className="hidden content" onClick={this.removeWord.bind(null,word)}>Word</div>
                  <div className="visible content">
                    Remove
                  </div>
                </div>
              </div>
            </div>
          </div>
          )  
          }
        })
    } else {
      mostUsedWords = <div></div>
    }
    

    return (
      <div className="row">
        <button className="ui right labeled icon button" onClick={this.submit}>
          <i className="right lab icon"></i>
          Analyze
        </button>
        {mostUsedWords}
        
      </div>
    )
  }
}
