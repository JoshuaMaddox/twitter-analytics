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

var string = 'javascript',
    antiString = 'shitty song, wack, sucks, suck, bad, music, terrible',
    counter = 0,
    countLimit = 100,
    tweetStrs = [],
    tweetObjs = [];

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
      data = data.join('').replace(/[\W]/g, " ")
      console.log('data: ', data)
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
          console.log(JSON.stringify(response, null, 2));
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

exports.twitterMap = (cb) => {
  client.stream('statuses/filter', {track: 'luke christopher', filter_level:'low', locations: '-118.9448, 32.8007, -117.6462, 34.8233', language: 'en'},  function(stream) {       
        fs.readFile(searchData, (err, buffer) => {
        if(err) return cb(err);
          try {
            var data = JSON.parse(buffer);
            stream.on('data', function(tweet) {
              counter++;
              console.log('counter: ', counter)
              if(counter >= countLimit){
                let json = JSON.stringify(data)
                stream.destroy('data');
                fs.writeFile(searchData, json, (err) => {
                if(err) return cb(err);
                return cb(null, data);
                })  
              }
              data.push(tweet.text)  
            });
              
          } catch (e) {
          var data = [];
          }
        })
    stream.on('error', function(error) {
      console.log(error);
    });
  });   
}








