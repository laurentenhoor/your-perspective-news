import { Topics } from '/imports/api/topics'
import { Articles } from '/imports/api/articles'

var Jimp = require('jimp');
var path = require('path');

Router.route('/i/:topicId.jpg', function () {

    var request = this;
    var urls = [];

    var topic = Topics.findOne({ _id: request.params.topicId });
    var articles = getAllArticlesFromTopic(topic);
    articles = _.sortBy(articles, 'score', 'asc').reverse();

    _.each(articles, (article) => {
        if (article.imageUrl) {
            urls.push(article.imageUrl);
        }
    })
    urls = urls.slice(0, 4);

    loadImages(urls, (images) => {
        render(images, (canvas) => {
            sendBackImage(request, canvas);
        })
    })

}, { where: 'server' });


function getAllArticlesFromTopic(topic) {

    var articles = [];
    _.each(topic.articleIds, (articleId) => {
        articles.push(Articles.findOne({ _id: articleId }))
    })
    return articles;
}

function loadImages(urls, callback) {

    var images = [];
    var imageCounter = 0;

    _.each(urls, (url, i) => {

        Jimp.read(url, (error, image) => {
            imageCounter++;
            if (error) {
                console.error(error);
            }
            if (image) {
                // image.opacity(1)	
                images.push(image)
            }
            if (imageCounter == urls.length) {
                callback(images);
            }
        })
    })
}


function render(images, callback) {

    var pxWidth = 900;
    var pxHeight = 600;
    var pxLogo = 200;

    new Jimp(pxWidth, pxHeight, (err, canvas) => {
        canvas.background(0xFFFFFFFF);
        canvas.opacity(1);

        if (images.length > 3) {
            var row = 1, column = 1;
            _.each(images, (image, i) => {
                image.cover(pxWidth / 2, pxHeight / 2, Jimp.HORIZONTAL_ALIGN_CENTER | Jimp.VERTICAL_ALIGN_MIDDLE);
                canvas.composite(image, column * (pxWidth / 2), row * (pxHeight / 2));
                row++;
                if (row == 2) {
                    column++ , row = 0
                }
                if (column == 2) {
                    column = 0;
                }
            })
        } else if (images.length > 1) {

            images[0].cover(pxWidth / 2, pxHeight, Jimp.HORIZONTAL_ALIGN_CENTER | Jimp.VERTICAL_ALIGN_MIDDLE);
            canvas.composite(images[0], 0, 0);

            images[1].cover(pxWidth / 2, pxHeight, Jimp.HORIZONTAL_ALIGN_CENTER | Jimp.VERTICAL_ALIGN_MIDDLE);
            canvas.composite(images[1], pxWidth / 2, 0);

        } else if (images.length == 1) {

            images[0].cover(pxWidth, pxHeight, Jimp.HORIZONTAL_ALIGN_CENTER | Jimp.VERTICAL_ALIGN_MIDDLE);
            canvas.composite(images[0], 0, 0);

        }

        var logoPath = path.join(__meteor_bootstrap__.serverDir, "../web.browser/app", '/logos/jouwpers-logo-circle-gradient-bg.png');

        Jimp.read(logoPath, (error, logo) => {
            if (logo) {
                logo.cover(pxLogo, pxLogo)
                canvas.composite(logo, pxWidth / 2 - pxLogo / 2, pxHeight / 2 - pxLogo / 2);
            }

            canvas.quality(50);
            callback(canvas);
        })

    })
}

function sendBackImage(request, canvas) {

    canvas.getBuffer(Jimp.MIME_JPEG, (error, imageBuffer) => {

        request.response.writeHeader('200', {
            'Content-Type': 'image/jpg',
            'Content-Length': imageBuffer.length
        });

        request.response.write(imageBuffer);
        request.response.end();

    });
}