$(document).ready(function() {
	
	

	$(window).on('resize', function() {

		var height = $(window).height() - (20 + 34);
		//	var width = $(window).width();

		$('.container').css('width', height);
		$('.container').css('height', height);

	});

	$(window).resize();

	$('.square').on('click', function() {

		$(this).find('.content-front').toggle();
		$(this).find('.content-back').toggle();

	})

	// Click on vote buttons
	$('.btn-vote').on('click', function() {

		if ($(this).hasClass('btn-agree')) {
			//#19b162
			$(this).closest('.square').animate({
				backgroundColor : '#109e54'
			}, 1000, function() {
				// Do nothing after animation
			});

		} else {

			$(this).closest('.square').animate({
				backgroundColor : '#d85c4a'
			}, 1000, function() {
				// Do nothing after animation
			});
		}

	});

	 setTimeout(function() {
		 window.scrollTo(($(document).width() - $(window).width()) / 2, 0);
		 console.log('scrollTo()')
	    }, 100);
	
});