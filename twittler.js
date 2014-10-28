($(document).ready(function(){

  var $body = $('body');
  $body.html('');

  var startAt = 0;
  var endAt = 1;

  var addNewTweets = function() {

    endAt = streams.home.length;

    for (var i = startAt; i < endAt; i++) {
      var tweet = streams.home[i];
      var $tweet = $('<div></div>');
      $tweet.text('[' + i + '][' + tweet.created_at + ']  @' + tweet.user + ': ' + tweet.message);
      $body.prepend($tweet);
      startAt++;

    }
  };

  addNewTweets();
  setInterval(addNewTweets, 1000);

}))();