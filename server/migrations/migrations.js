import { Topics } from '../../imports/api/topics.js';
import { Articles } from '../../imports/api/articles.js';
import { Opinions } from '../../imports/api/opinions.js';

import { Random } from 'meteor/random';

if (Meteor.isServer) {
	Migrations.add({
		version: 1,
		name: 'Initial database',
		up: function () { console.log('Inside migrations'); }
	});


	Migrations.add({
		version: 2,
		name: 'add articleIds array to topics',
		up: function () {

			_.forEach(Topics.find({}).fetch(), function (topic) {

				_.forEach(topic.articlesByCategory, function (category, i) {

					if ('articleIds' in category) {
						console.log('this is a modern schema')
						return;
					}

					var articleIds = [];
					_.forEach(category.articles, function (article) {
						articleIds.push(article._id);
					})
					topic.articlesByCategory[i].articleIds = articleIds;

				});
				//update full scheme
				Topics.update({ _id: topic._id }, topic);

			});

		}
	});


	Migrations.add({
		version: 3,
		name: 'Add 0 score to existing articles',
		up: function () {

			_.forEach(Articles.find({}).fetch(), function (article) {
				if (!('score' in article)) {
					article.score = 0;
					Articles.update({ _id: article._id }, article);
					console.log('score updated')
				} else {
					console.log('score detected')

				}

			})

		}
	});


	Migrations.add({
		version: 4,
		name: 'Add _id to all existing categories',
		up: function () {

			_.forEach(Topics.find({}).fetch(), function (topic) {

				_.forEach(topic.articlesByCategory, function (category, i) {

					if (!('_id' in category)) {
						category._id = Random.id();
					}

				})

				Topics.update({ _id: topic._id }, topic);

			})

		}
	});

	Migrations.add({
		version: 5,
		name: 'Add score to all existing opinions',
		up: function () {

			_.forEach(Opinions.find({}).fetch(), function (opinion) {

				if (!('score' in opinion)) {
					opinion.score = 0;
				}
				Opinions.update({ _id: opinion._id }, opinion);

			})

		}
	});

	Migrations.add({
		version: 6,
		name: 'Make category an attribute of the article',
		up: function () {
			version6();
		}
	});

	Meteor.startup(function () {
		// code to run on server at startup
		// Migrations.unlock();
		Migrations.migrateTo('latest');
	});
}


function version6() {
	_.forEach(Topics.find({}).fetch(), (topic) => {
		
		var articleIds = []

		if (('articlesByCategory' in topic)) {

			_.each(topic.articlesByCategory, (categoryBlock) => {

				var categoryName = categoryBlock.category;

				_.each(categoryBlock.articleIds, (articleId) => {

					articleIds.push(articleId);
					
					var article = Articles.findOne({ _id: articleId });
					article.category = categoryName;
					Articles.update({_id:articleId}, article);

				})
			})

		}

		topic.articleIds = articleIds;
		Topics.update({_id:topic._id}, topic);

	})
}

