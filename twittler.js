var visitor;

$(document).ready(function(){

  var $main = $('.main');
  var $header = $('.header');
  var tweets;  
  var lastTweetIndex; 
  var currentPage;

  var getPage = function (page) {
    if (page !== currentPage) {
      currentPage = page;

      // Clear current page
      $main.html('');
      lastTweetIndex = 0; 

      // Build new page of tweets
      tweets = page === 'home' ? streams.home : streams.users[page];
      addNewTweets();

      // Show username in the header  
      $header.html(currentPage === 'home' ? '' : '<span class="page">' + currentPage + "'s tweets</span> " );
    }
  };

  var addNewTweets = function() {
    // Grab new tweets and add them to the page
    // Start off from last tweet if 
    for (var i = lastTweetIndex; i < tweets.length; i++) {
      var tweet = tweets[i];

      var $tweet = $('<div class="tweet">' +
        '<span class="user" data-user="' + tweet.user + '">@' + tweet.user + '</span>' + 
        '<span class="time">' + moment(tweet.created_at).fromNow() + '</span>' +
        '<span class="message">' + tweet.message + '</span>' +
        '</div>');

      $main.prepend($tweet.hide());
      $tweet.slideDown();

      // Keep track of the last tweet added
      lastTweetIndex++;
    }

    // Event handler for username timelines
    // (TODO: This updates everytime for every username element 
    //       It only needs to apply to the new tweets.)
    $('.user').off("click").click(function() {
      getPage( ($(this).data('user')) ) ;
    });

  };

  // Show all tweets on first load
  getPage('home');

  // Refresh tweets
  setInterval(addNewTweets, 3000);

  // Make header link to homepage
  $('h1').click(function(){
    getPage('home');
  });

  ///////////////////////////////////////////////////////////

  // New user tweets

  $("form").submit(function( event ){
    event.preventDefault();
    visitor = $("#username").val();
    streams.users[visitor] = [];
    writeTweet( $("#usertweet").val() );
  });

});
