const fs = require('fs'),
      uuid = require('uuid'),
      path = require('path'),
      axios = require('axios'),
      Twitter = require('twitter'),
      watson = require('watson-developer-cloud'),
      searchData = path.join(__dirname, '../data/searchData.json'),
      twitterdata = path.join(__dirname, '../data/twitterdata.json');

require('dotenv').config({ silent: true })

const client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

var tone_analyzer = watson.tone_analyzer({
  username: process.env.WATSON_TONE_USER,
  password: process.env.WATSON_TONE_PASS,
  version: 'v3',
  version_date: '2016-05-19'
});



//locations: '-122.75,36.8,-121.75,37.8,-74,40,-73,41'
exports.gather = (term, cb) => {
  client.get('search/tweets' , {q: term, count: "100", lang:'en', result_type:'recent'}, (err,tweet,res) => {
    fs.writeFile(searchData, JSON.stringify(tweet) , (err) => { 
      if(err) return cb(err);
      cb(null, tweet)
    })
  })
}

var alchemy_language = watson.alchemy_language({
  api_key: process.env.WATSON_ANALYZER_API
})

exports.tweetGather = (cb) => {
  fs.readFile(searchData, (err, buffer) => {
    if(err) return cb(err);
    try {
      var data = JSON.parse(buffer);
      cb(null,data)
    } catch (e) {
      var data = [];
    }
  })
}

exports.watson = function(cb) {
  fs.readFile(searchData, (err, buffer) => {
    if(err) return cb(err)
    try {
      var data = JSON.parse(buffer)
      // console.log('data: ', data)
      data = data.statuses.map((cur) => {
        return cur.text
      })
      data = data.join('').replace(/[\W#]/g, " ")
      var parameters = {
        extract: 'entities,keywords,doc-emotion,feeds,relations,concepts',
        sentiment: 1,
        maxRetrieve: 20,
        text: data,
        targets: 'trump|president'
      };
      alchemy_language.combined(parameters, function (err, response) {
        if (err)
          console.log('error:', err);
        else
          cb(null, response)
      });
      }catch(e) {
        console.log(e)
      }
  })
}

// tone_analyzer.tone({ text: data },
//   function(err, tone) {
//     if(err) {
//       console.log(err);
//     } else {
//       console.log(JSON.stringify(tone, null, 2))
//       let responseArr = [tone]
//       let json = JSON.stringify(responseArr)
//       fs.writeFile(twitterdata, json, (err) => {
//         if(err) return cb(err);
//         return cb(null, json);
//       })  
//     }
//   }
// )


var string = 'javascript',
    antiString = 'shitty song, wack, sucks, suck, bad, music, terrible',
    counter = 0,
    countLimit = 200,
    tweetStrs = [],
    tweetObjs = [];

exports.twitterMap = (req,res,cb) => {
  let term = decodeURIComponent(req.query.term)
  console.log('term: ', term)
  client.stream('statuses/filter', {track: term, filter_level:'low', locations: '-122.75,36.8,-121.75,37.8', language: 'en'},  function(stream) {       
        console.log('hit route')
        // if(err) return cb(err);
    
    stream.on('data', function(tweet) {
      counter++
      console.log('counter: ', counter)
      res.socketEmitter('twitter', tweet.text)
        if(counter > countLimit){
          counter = 0
          stream.destroy('data')
        }
    });
    
        
    stream.on('error', function(error) {
      console.log(error)
      stream.destroy('data')
    });
  });
  // cb(null, "Streaming Success")   
}








