const fs = require('fs'),
      uuid = require('uuid'),
      path = require('path'),
      axios = require('axios'),
      searchData = path.join(__dirname, '../data/searchData.json'),
      twitterdata = path.join(__dirname, '../data/twitterdata.json');

// exports.makeTextObj = function(){
//   fs.readFile(searchData, (err, buffer) => {
//     if(err) return cb(err)
//       try {
//         var data = JSON.parse(buffer)
//         // console.log(data)
//         console.log(data.statuses[0])
//       }
//   })
// }

//Make a no use list to train our most used words

exports.makeTextObj = function(cb) {
  let wordsObj = {}
  let tweetsArray = []
  fs.readFile(searchData, (err, buffer) => {
    if(err) return cb(err)
      try{
        var data = JSON.parse(buffer)
        data.statuses.forEach((tweet) => {
          tweetsArray = [...tweetsArray,...tweet.text.split(' ')]
        })
        tweetsArray.forEach((word, i, a) => {
          word = word.toLowerCase()
          if(!wordsObj[word]){
            wordsObj[word] = 1
          } else {
            wordsObj[word]++
          }
        })
        // console.log("I am wordsObj: ", wordsObj)
        let objSorted = Object.keys(wordsObj).sort(function(a,b){return wordsObj[b]- wordsObj[a]})
        
        cb(null, objSorted, wordsObj)
      } catch(e) {
        console.log(e)
      }
  })
}

exports.formatData = (cb) => {
  fs.readFile(twitterdata, (err,buffer) => {
    if(err) return cb(err)
      try {
        var data = JSON.parse(buffer)
        data = data.map((cur) => {
          cur = {
            tone1: cur.document_tone.tone_categories[0].category_name,
            anger:cur.document_tone.tone_categories[0].tones[0].score,
            disgust:cur.document_tone.tone_categories[0].tones[1].score,
            fear:cur.document_tone.tone_categories[0].tones[2].score,
            joy:cur.document_tone.tone_categories[0].tones[3].score,
            sadness:cur.document_tone.tone_categories[0].tones[4].score,
            tone2: cur.document_tone.tone_categories[1].category_name,
            analytical: cur.document_tone.tone_categories[1].tones[0].score,
            confident: cur.document_tone.tone_categories[1].tones[1].score,
            tentative: cur.document_tone.tone_categories[1].tones[2].score,
            tone3: cur.document_tone.tone_categories[2].category_name,
            openness: cur.document_tone.tone_categories[2].tones[0].score,
            conscientiousness: cur.document_tone.tone_categories[2].tones[1].score,
            extraversion: cur.document_tone.tone_categories[2].tones[2].score,
            agreeableness: cur.document_tone.tone_categories[2].tones[3].score,
            emotionalRange: cur.document_tone.tone_categories[2].tones[4].score
          }
          console.log(cur)
        })
      } catch(e) {
        console.log(e)
      }
  })
}
