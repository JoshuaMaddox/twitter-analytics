const express = require('express')
const Twitter = require('../models/Twitter')
const IDM = require('../models/InternalDataManagement')
const router = express.Router()


//Get initial twitter search results
router.get('/', (req, res) => {
  let term = decodeURIComponent(req.query.term)
  let dataObj = {};
  console.log('term!!!!!: ', term)
  Twitter.gather(term, (err, termResults) => {
    dataObj.twitter = termResults;
    IDM.makeTextObj((err, wordList, textObj) =>{
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