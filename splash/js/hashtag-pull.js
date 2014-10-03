/*
hashtag-pull - v - 2013-09-01
Pulls twitter, vine, and instagram posts with a certain hashtag.
Lovingly coded by Jess Frazelle  - http://frazelledazzell.com/ 
*/

last_id = "1";
showing = 0;
max_showing = 4;

function get_feed(){
	$.ajax({
		url: "ajax-feed.php"
	}).done(function(feed_data) {
		n = feed_data.indexOf('img id="');
		m = feed_data.indexOf('" class="instagram"');
		id = feed_data.substring(n, m);

		if(id != last_id)
		{
			showing = showing +1;
			if(showing > max_showing)
				$('.instagrampost:last').remove();
			$('#instagram-feed').prepend($(feed_data))
			$('.instapost:first').hide();
			$('.instapost:first').show('slow');
			last_id = id;
		}
	});
}

function get_started()
{
	$.ajax({
		url: "start.php"
	}).done(function(feed_data) {
		n = feed_data.indexOf('img id="');
		m = feed_data.indexOf('" class="instagram"');
		id = feed_data.substring(n, m);

		$('#instagram-feed').prepend($(feed_data))
		$('.instapost:first').hide();
		$('.instapost:first').show('slow');
		last_id = id;
	});
}


$(document).ready(function(){
	// get_feed();
	get_started();

	var refreshFeed = setInterval(function(){
		console.log('refreshed man!');
		get_feed();
	}, 3000);
});
