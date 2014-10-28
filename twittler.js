$(document).ready(function(){

  var $main = $('.main');
  var tweets;  
  var lastTweetIndex; 
  var totalTweets;
  var currentPage;

  var addNewTweets = function() {

    totalTweets = tweets.length;

    for (var i = lastTweetIndex; i < totalTweets; i++) {
      var tweet = tweets[i];

      var $tweet = $('<div class="tweet">' +
        '<span class="user" data-user="' + tweet.user + '">@' + tweet.user + '</span>' + 
        '<span class="time">' + tweet.created_at + '</span>' +
        '<span class="message">' + tweet.message + i +'</span>' +
        '</div>');

      $main.prepend($tweet.hide());
      $tweet.slideDown();      
      lastTweetIndex++;
    }

    // TODO: this updates everytime for every username element 
    $('.user').off("click").click(function() {
      getPage( ($(this).data('user')) ) ;
    });

  };

  var getPage = function (page) {
    if (page !== currentPage) {
      
      // Clear current page
      currentPage = page;
      $main.html('');
      lastTweetIndex = 0; 

      // Build new page of tweets
      tweets = page === 'home' ? streams.home : streams.users[page];
      addNewTweets();
    }
  };

  getPage('home');
  setInterval(addNewTweets, 2000);

  $('h1').click(function(){
    getPage('home');
  });


});