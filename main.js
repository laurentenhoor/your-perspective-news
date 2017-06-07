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

	
	function checkForFinish() {

		if ($('.voted').length > 8) {
			$('.popup').show();
			$('#opinion-field').focus();
			$('#opinion-field').select();
			
		}
	}
	
	$('.popup-btn').on('click', function() {
		$('.popup').hide();
		location.reload();
	});
	
	// Click on vote buttons
	$('.btn-vote').on('click', function() {

		if ($(this).hasClass('btn-agree')) {
			//#19b162
			$(this).closest('.square').animate({
				backgroundColor : '#109e54'
			}, 1000, function() {
				$(this).addClass('voted');
				checkForFinish();
			});

		} else {

			$(this).closest('.square').animate({
				backgroundColor : '#d85c4a'
			}, 1000, function() {
				$(this).addClass('voted');
				checkForFinish();
			});
		}
		

	});
	
	// first load all content - then hide it here (so, preloading content)
	$('.content-back').hide(); 

	 setTimeout(function() {
		 window.scrollTo(($(document).width() - $(window).width()) / 2, 0);
		 console.log('scrollTo()')
	    }, 100);
	 
	 
	 $(".read-btn").modalVideo();
	
	
});



