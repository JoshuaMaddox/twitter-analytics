import AppDispatcher from '../AppDispatcher'

const ServerActions = {
  receiveSearch(dataObj){
    AppDispatcher.dispatch({
      type: 'DATA_OBJ_RECEIVED',
      payload: { dataObj }
    }) 
  }
}

export default ServerActions


