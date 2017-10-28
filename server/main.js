import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http'

import '../imports/api/posts.js';
import '../imports/api/votes.js';
import '../imports/api/feedback.js';
import '../imports/api/comments.js';

Meteor.startup(() => {
	// code to run on server at startup
});