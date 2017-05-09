var request = require('request');
var GITHUB_USER = "pachopa ";
var GITHUB_TOKEN = "17b8efe95e1ce5655e88ad082f45b1efe116eabb";
var fs = require('fs');
var repoOwner = process.argv[2];
var repoName = process.argv[3];

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  var requestUrl = 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';

  var requestOptions = {
      url: requestUrl,
      headers: {"User-Agent": "pachopa"}
    };
    request(requestOptions, function(err, response, body) {
    if (err) { throw err; }
    cb(err, (JSON.parse(body)));
  });
  }
function downloadImageByURL(url, filePath) {
  request.get(url)
       .on('error', function (err) {
         throw err;
       })
       .on('end', function() {
         console.log('Download complete.');
       })
       .pipe(fs.createWriteStream(filePath));
}
getRepoContributors(repoOwner, repoName, function(err, result) {
  if (!repoOwner && !repoName) {
    console.log('Please specify Repo Owner and Repo Name');
    return;
  }
  !err ? errmsg = "none" : errmsg = err;

  console.log("Result:", result);
  result.forEach(function (results) {
    downloadImageByURL(results.avatar_url, 'avatars/' + results.login + '.jpg');
  });
});