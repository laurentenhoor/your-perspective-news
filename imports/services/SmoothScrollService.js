import angular from 'angular';
import angularMeteor from 'angular-meteor';

class SmoothScrollService {

	constructor() {

	}

	horizontalScroll(targetId, scrollScopeId) {
		
		var scrollElement = document.getElementById(scrollScopeId);
		var targetElement = document.getElementById(targetId);
		
		var startX = scrollElement.scrollLeft;
		var stopX = targetElement.offsetLeft;
		var distance = stopX > startX ? stopX - startX : startX - stopX;
		
		if (distance < 100) {
			scrollElement.scrollLeft = stopX;  
			return;
		}
		
		var speed = Math.round(distance / 75);
		if (speed >= 20) speed = 20;
		var step = Math.round(distance / 25);
		var leapX = stopX > startX ? startX + step : startX - step;
		var timer = 0;
		
		if (stopX > startX) {
			for ( var i=startX; i<stopX; i+=step ) {
				setTimeout("document.getElementById('"+scrollScopeId+"').scrollLeft = "+leapX, timer * speed);
				leapX += step; if (leapX > stopX) leapX = stopX; timer++;
			} return;
		}
		
		for ( var i=startX; i>stopX; i-=step ) {
			setTimeout("document.getElementById("+scrollScopeId+").scrollLeft = "+leapX, timer * speed);
			leapX -= step; if (leapX < stopX) leapX = stopX; timer++;
		}	

	}
}

var name = "SmoothScrollService";

export default angular.module(name, [
	angularMeteor
	]).service(name, SmoothScrollService);