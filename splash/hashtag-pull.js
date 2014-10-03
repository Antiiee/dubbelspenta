/*
hashtag-pull - v - 2013-09-01
Pulls twitter, vine, and instagram posts with a certain hashtag.
Lovingly coded by Jess Frazelle  - http://frazelledazzell.com/ 
*/
function get_feed(){
	$.ajax({
		url: "ajax-feed.php"
	}).done(function(feed_data) {
		// $post = feed_data;
		// $(feed_data).appendTo('#instagram-roof');
		// $('#instagram-roof').appendTo($(feed_data));
		$('#instagram-feed').prepend($(feed_data))
		$('.instapost').hide();
		$('.instapost').fadeIn('slow');
	});
}


$(document).ready(function(){
	get_feed();

	var refreshFeed = setInterval(function(){
		console.log('refreshed man!');
		get_feed();
	}, 3000);
});
