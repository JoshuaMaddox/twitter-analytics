import AppDispatcher from '../AppDispatcher'

const ServerActions = {
  receiveSearch(dataObj){
    AppDispatcher.dispatch({
      type: 'DATA_OBJ_RECEIVED',
      payload: { dataObj }
    }) 
  },
  incomingTweets(data){
    AppDispatcher.dispatch({
      type:'TWEET_STREAM',
      payload: data
    })
  }
}

export default ServerActions


