import { Votes } from '/imports/api/votes.js';

export default class VoteService {

    constructor($auth, $votableItemsApi) {
        'ngInject';
		this.$auth = $auth;
		this.$votableItemsApi = $votableItemsApi;
    }

    voteById(id, voteValue) {
		
		if (!this.$auth.isLoggedIn()) {
            throw new Meteor.Error('not-logged-in', "Please login first");
            return;
		}
		// robustness for adjusting the javascript value
		voteValue > 0 ? voteValue = 1 : voteValue = -1

		// check if a vote already exists for this user and article
		var vote = Votes.findOne({articleId : id, ownerId: Meteor.userId()});
		
		if (!vote) {
			
			Votes.insert({
				ownerId: Meteor.userId(),
				value: voteValue,
				articleId : id
			});
			this.$votableItemsApi.voteItem(id, voteValue)
			
		} else {
			
			if (vote.value != voteValue) {
				Votes.update(vote._id, {$set: {value: voteValue}});
				this.$votableItemsApi.voteItem(id, 2*voteValue)
			}
			
		}
		
	}

}