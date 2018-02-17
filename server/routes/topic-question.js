import { Topics } from '/imports/api/topics'
import { Articles } from '/imports/api/articles'
import { Questions } from '/imports/api/questions'

// insert metadata before routing to /topic/:topicId
if (!Package.appcache)
    WebApp.connectHandlers.use(function (req, res, next) {

        var params = req.url.split('/');
        var route = params[1];
        var itemId = params[2];

        if (!route || !itemId) {

            return next();

        } else if (route == 'topic') {

            var topic = Topics.findOne({ _id: itemId });
            if (!topic) {
                return next();
            }
            var articles = getAllArticlesFromTopic(topic);
            if (!articles) {
                return next();
            }

            if (Inject.appUrl(req.url)) {
                Inject.rawHead('openGraphTags', getTopicMetaTags(topic, articles[0]), res);
            }
            next();

        } else if (route == 'vraag') {

            var question = Questions.findOne({ _id: itemId });
            if (!question) {
                return next();
            }

            var topic = Topics.findOne({ _id: question.topicId });
            if (!topic) {
                return next();
            }

            if (Inject.appUrl(req.url)) {
                Inject.rawHead('openGraphTags', getQuestionMetaTags(topic, question), res);
            }
            next();

        } else {
            return next();
        }


    });


function getQuestionMetaTags(topic, question) {
    return `
    <meta property="og:title" content="`+ question.question + `">
    <meta property="og:description" content="Help ons! Beantwoord deze vraag op Jouwpers.">
    <meta property="og:image" content="`+ Meteor.absoluteUrl() + `i/` + topic._id + `.jpg">
    <meta property="og:image:type" content="image/jpeg" />
    <meta property="og:image:width" content="900">
    <meta property="og:image:height" content="600">
    <meta property="og:type" content="article">
    <meta property="og:url" content="`+ Meteor.absoluteUrl() + `topic/` + topic._id + `/">
    `
}


function getTopicMetaTags(topic, article) {
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
