import { Topics } from '/imports/api/topics'
import { Articles } from '/imports/api/articles'

if (!Package.appcache)
    WebApp.connectHandlers.use(function (req, res, next) {
        var params = req.url.split('/');
        var route = params[1];
        var itemId = params[2];
        
        if (route != 'topic' || !itemId) {
            return next();
        }
        var topic = Topics.findOne({ _id: itemId });
        if (!topic) {
            return next();
        }
        var articles = getAllArticlesFromTopic(topic);

        if (Inject.appUrl(req.url)) {
            Inject.rawHead('openGraphTags', getMetaTags(topic, articles[0]), res);
        }
        next();

    });
    

function getMetaTags(topic, article) {
    var tags = `
		<meta property="og:title" content="`+ article.title + `">
		<meta property="og:description" content="Zoek mee naar het volledige verhaal achter dit nieuws op Jouwpers.">
		<meta property="og:image" content="`+ Meteor.absoluteUrl() + `i/` + topic._id + `.jpg">
		<meta property="og:image:type" content="image/jpeg" />
		<meta property="og:image:width" content="900">
		<meta property="og:image:height" content="600">
		<meta property="og:type" content="article">
		<meta property="og:url" content="`+ Meteor.absoluteUrl() + `topic/` + topic._id + `/">
		`
    return tags;
}

function getAllArticlesFromTopic(topic) {

    var articles = [];
    _.each(topic.articleIds, (articleId) => {
        articles.push(Articles.findOne({ _id: articleId }))
    })
    return articles;
}
