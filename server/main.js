import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http'

import { Topics } from '/imports/api/topics'
import { Articles } from '/imports/api/articles'
import { Votes } from '/imports/api/votes'
import { Comments } from '/imports/api/comments'
import { Feedback } from '/imports/api/feedback'
import { Opinions } from '/imports/api/opinions'
import { Users } from '/imports/api/users'
import { Questions } from '/imports/api/questions'
import { Emails } from '/imports/api/emails'

import SlackAPI from 'node-slack';

_ = lodash;

Meteor.startup(() => {

	if (Meteor.isProduction) {
		Slack = new SlackAPI('https://hooks.slack.com/services/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');
		Slack.send({
			text: 'De server is succesvol herstart.'
		});
	}

	ServiceConfiguration.configurations.upsert(
		{ "service": "linkedin" },
		{
			$set: {
				"clientId": "78akbyufxh1mh8",
				"secret": "OREAQ0srwvcxTZ6W",
				'requestPermissions': ['r_basicprofile', 'r_emailaddress'],
				'loginStyle': 'popup',//redirect or popup
			}
		},
		{ upsert: true }
	);

});