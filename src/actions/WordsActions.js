import AppDispatcher from '../AppDispatcher'

const WordActions = {
  trainWords(addObj,removeObj){
    console.log('dataObj: ', addObj)
    AppDispatcher.dispatch({
      type: 'ADD_TO_TRAIN',
      payload: [addObj, removeObj]
    }) 
  }
}
export default WordActions