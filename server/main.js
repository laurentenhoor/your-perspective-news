import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http'

import { Topics } from '/imports/api/topics'
import { Articles } from '/imports/api/articles'
import { Votes } from '/imports/api/votes'
import { Comments } from '/imports/api/comments'
import { Feedback } from '/imports/api/feedback'
import { Opinions } from '/imports/api/opinions'

_ = lodash;

Meteor.startup(() => {

	Meteor.publish('allUsernames', function () {
		return Meteor.users.find({}, {
			fields: {
				'profile.firstName': 1,
				'profile.lastName': 1
			}
		});
	});

	ServiceConfiguration.configurations.upsert(
		{ "service": "linkedin" },
		{
			$set: {
				"clientId": "78akbyufxh1mh8",
				"secret": "OREAQ0srwvcxTZ6W",
				'requestPermissions': ['r_basicprofile', 'r_emailaddress'],
				'loginStyle': 'redirect',
			}
		},
		{ upsert: true }
	);

});