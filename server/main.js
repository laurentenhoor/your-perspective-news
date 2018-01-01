import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http'

import '/imports/api/votes.js';
import '/imports/api/feedback.js';
import '/imports/api/comments.js';
import '/imports/api/opinions.js';

Meteor.startup(() => {

	// code to run on server at startup

	ServiceConfiguration.configurations.upsert(
			{ "service": "linkedin" },
			{
				$set: {
					"clientId": "78akbyufxh1mh8",
					"secret": "OREAQ0srwvcxTZ6W",
					'requestPermissions': ['r_basicprofile', 'r_emailaddress'],
					'loginStyle' :'redirect',
				}
			},
			{ upsert: true }
	);

});