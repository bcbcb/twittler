($(document).ready(function(){

  var $main = $('.main');
  $main.html('');

  var startAt = 0;
  var endAt;

  var addNewTweets = function() {

    endAt = streams.home.length;

    for (var i = startAt; i < endAt; i++) {
      var tweet = streams.home[i];

      var $tweet = $('<div class="tweet">' + 
        '<span class="user">@' + tweet.user +'  </span>' + 
        '<span class="time">' + tweet.created_at + '</span>' +
        '<span class="message">' + tweet.message + i +'</span>' +
        '</div>');

      $main.prepend($tweet);
      startAt++;

    }
  };

  addNewTweets();
  //setInterval(addNewTweets, 1000);

}))();