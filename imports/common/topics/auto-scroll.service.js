export default class SmoothScrollServices {

    constructor() {
        'ngInject';

        this.scrollToTop = function() {
            
            var scrollElement = document.getElementById('yourpers');
            scrollElement.scrollTop = 0;

        }

        this.horizontalScroll = function(targetId, scrollScopeId) {

            console.log(targetId, scrollScopeId)
            
            var scrollElement = document.getElementById(scrollScopeId);
            var targetElement = document.getElementById(targetId);
            
            var scrollPadding = 20;
            var startX = scrollElement.scrollLeft;
            var stopX = targetElement.offsetLeft - scrollPadding;
            var distance = stopX > startX ? stopX - startX : startX - stopX;
            
            // if (distance < 100) {
            //     scrollElement.scrollLeft = stopX;  
            //     return;
            // }
            
            var speed = Math.round(distance / 75);
            console.log('speed', speed)
            if (speed >= 20) speed = 20;
            var step = Math.round(distance / 25);
            console.log('step',  step)
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

}