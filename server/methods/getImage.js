var Canvas = require('canvas');

Meteor.methods({

    getImage(text) {
        console.log('getImage on server side')
        var canvas = new Canvas(500, 200);
        var ctx = canvas.getContext('2d');
    
        ctx.font = '26px "Comic Sans"';
        ctx.fillText(text, 50, 80);
    
        return canvas.toBuffer();
      }

})

