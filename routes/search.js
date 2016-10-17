const express = require('express')
const Twitter = require('../models/Twitter')
const IDM = require('../models/InternalDataManagement')
const router = express.Router()


//Get initial twitter search results
router.get('/', (req, res) => {
  let term = decodeURIComponent(req.query.term)
  let dataObj = {};
  
  Twitter.gather(term, (err, termResults) => {
    dataObj.twitter = termResults;
    // console.log('termResults: ', termResults)
    IDM.makeTextObj((err, wordList, textObj) =>{
      console.log('wordList: ', wordList)
      dataObj.wordFreq = wordList;
      dataObj.wordObj = textObj;
      Twitter.watson((err, watsonRes) => {
        dataObj.watson = watsonRes;
        res.send(dataObj);
      })
    })
  })  
})

module.exports = router